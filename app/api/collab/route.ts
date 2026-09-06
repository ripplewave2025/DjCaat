import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { artistName, instagramHandle, stemLink, subgenre, collabType, splitProposal, notes } = body;

    if (!artistName || !instagramHandle || !stemLink) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Generate unique production ticket
    const ticketId = `CAAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const submission = {
      ticketId,
      timestamp,
      artistName,
      instagramHandle,
      stemLink,
      subgenre,
      collabType,
      splitProposal,
      notes: notes || "",
      status: "queued_for_sunday_review",
      originHub: "Darjeeling Production Vault"
    };

    // Log to console/server log
    console.log("[COLLAB SUBMISSION RECEIVED]:", submission);

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Stem collaboration intake logged successfully.",
      submission,
    });
  } catch (error) {
    console.error("Collab API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
