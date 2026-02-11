"use server";

import { db } from "@/lib/db";
import { tracks, profiles } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function createTrack(data: {
  title: string;
  audioFilename: string;
  duration: number;
  genreTags: string[];
  snippetStart: number;
  snippetEnd: number;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const userId = session.user.id;

  // Ensure profile exists
  const existing = await db.query.profiles.findFirst({
    where: eq(profiles.id, userId),
  });

  if (!existing) {
    await db.insert(profiles).values({
      id: userId,
      handle: session.user.name?.toLowerCase().replace(/\s+/g, "") || userId.slice(0, 8),
      credits: 20,
    });
  }

  const shareToken = randomBytes(8).toString("hex");

  const [track] = await db
    .insert(tracks)
    .values({
      userId,
      title: data.title,
      audioFilename: data.audioFilename,
      duration: data.duration,
      genreTags: data.genreTags,
      snippetStart: data.snippetStart,
      snippetEnd: data.snippetEnd,
      shareToken,
      status: "draft",
    })
    .returning();

  // Increment tracks_uploaded
  await db
    .update(profiles)
    .set({ tracksUploaded: sql`${profiles.tracksUploaded} + 1` })
    .where(eq(profiles.id, userId));

  return track;
}
