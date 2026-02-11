"use server";

import { db } from "@/lib/db";
import { tracks, profiles, creditTransactions } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";

export async function submitForRating(data: {
  trackId: string;
  contextId: string;
  votesRequested: number;
  creditsCost: number;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const userId = session.user.id;

  // Check credits if cost > 0
  if (data.creditsCost > 0) {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.id, userId),
    });

    if (!profile || profile.credits < data.creditsCost) {
      throw new Error("Insufficient credits");
    }

    // Deduct credits
    await db
      .update(profiles)
      .set({ credits: sql`${profiles.credits} - ${data.creditsCost}` })
      .where(eq(profiles.id, userId));

    // Record transaction
    await db.insert(creditTransactions).values({
      userId,
      amount: -data.creditsCost,
      type: "track_submit",
      referenceId: data.trackId,
    });
  }

  // Update track
  await db
    .update(tracks)
    .set({
      contextId: data.contextId,
      votesRequested: data.votesRequested,
      status: "collecting",
    })
    .where(eq(tracks.id, data.trackId));

  return { success: true };
}
