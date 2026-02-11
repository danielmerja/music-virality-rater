"use server";

import { db } from "@/lib/db";
import { tracks } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";

export async function deleteTrack(trackId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const track = await db.query.tracks.findFirst({
    where: and(eq(tracks.id, trackId), eq(tracks.userId, session.user.id)),
  });

  if (!track) throw new Error("Track not found");

  if (track.status === "collecting") {
    throw new Error(
      "Cannot delete a track that is currently collecting ratings. Wait for collection to complete."
    );
  }

  await db
    .update(tracks)
    .set({ isDeleted: true })
    .where(eq(tracks.id, trackId));

  return { success: true };
}
