import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { submitRating } from "@/lib/actions/rate";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const result = await submitRating({
      trackId: body.trackId,
      dimension1: body.dimension1,
      dimension2: body.dimension2,
      dimension3: body.dimension3,
      dimension4: body.dimension4,
      feedback: body.feedback,
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to submit" },
      { status: 500 }
    );
  }
}
