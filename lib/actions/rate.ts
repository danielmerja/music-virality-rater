"use server";

import { db } from "@/lib/db";
import { ratings, tracks, profiles, creditTransactions } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";

export async function submitRating(data: {
  trackId: string;
  dimension1: number;
  dimension2: number;
  dimension3: number;
  dimension4: number;
  feedback?: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const raterId = session.user.id;

  // Create rating
  await db.insert(ratings).values({
    trackId: data.trackId,
    raterId,
    dimension1: data.dimension1,
    dimension2: data.dimension2,
    dimension3: data.dimension3,
    dimension4: data.dimension4,
    feedback: data.feedback || null,
  });

  // Increment votes_received on track
  const [updatedTrack] = await db
    .update(tracks)
    .set({ votesReceived: sql`${tracks.votesReceived} + 1` })
    .where(eq(tracks.id, data.trackId))
    .returning();

  // Update rater profile
  const [updatedProfile] = await db
    .update(profiles)
    .set({
      tracksRated: sql`${profiles.tracksRated} + 1`,
      ratingProgress: sql`${profiles.ratingProgress} + 1`,
    })
    .where(eq(profiles.id, raterId))
    .returning();

  // Check if rating progress reached 5
  if (updatedProfile.ratingProgress >= 5) {
    // Reset progress and add credit
    await db
      .update(profiles)
      .set({
        ratingProgress: 0,
        credits: sql`${profiles.credits} + 1`,
      })
      .where(eq(profiles.id, raterId));

    await db.insert(creditTransactions).values({
      userId: raterId,
      amount: 1,
      type: "rating_bonus",
    });
  }

  // If track reached vote goal, compute scores
  if (
    updatedTrack &&
    updatedTrack.votesReceived >= updatedTrack.votesRequested
  ) {
    await computeTrackScores(data.trackId);
  }

  return {
    creditEarned: updatedProfile.ratingProgress >= 5,
    newProgress: updatedProfile.ratingProgress >= 5 ? 0 : updatedProfile.ratingProgress,
  };
}

async function computeTrackScores(trackId: string) {
  const trackRatings = await db.query.ratings.findMany({
    where: eq(ratings.trackId, trackId),
  });

  if (trackRatings.length === 0) return;

  const avg = (values: number[]) =>
    values.reduce((a, b) => a + b, 0) / values.length;

  const d1 = avg(trackRatings.map((r) => r.dimension1));
  const d2 = avg(trackRatings.map((r) => r.dimension2));
  const d3 = avg(trackRatings.map((r) => r.dimension3));
  const d4 = avg(trackRatings.map((r) => r.dimension4));

  const overall = (d1 + d2 + d3 + d4) / 4;

  // Get track to find context for percentile
  const track = await db.query.tracks.findFirst({
    where: eq(tracks.id, trackId),
  });

  let percentile = 50;
  if (track?.contextId) {
    // Count all completed tracks in same context with lower score
    const allCompleted = await db.query.tracks.findMany({
      where: eq(tracks.status, "complete"),
      columns: { overallScore: true },
    });

    const scores = allCompleted
      .map((t) => t.overallScore)
      .filter((s): s is number => s !== null);

    if (scores.length > 0) {
      const below = scores.filter((s) => s < overall).length;
      percentile = Math.round((below / scores.length) * 100);
    }
  }

  await db
    .update(tracks)
    .set({
      status: "complete",
      overallScore: Math.round(overall * 10) / 10,
      percentile,
    })
    .where(eq(tracks.id, trackId));
}
