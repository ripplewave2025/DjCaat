import { NextResponse } from "next/server";
import { insertCollabSubmission } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { artistName, instagramHandle, streamingUrl, stemLink, subgenre, collabType, splitProposal, notes } = body;

    if (!artistName || !instagramHandle || !stemLink) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Generate unique production ticket
    const ticketId = `CAAT-${Math.floor(1000 + Math.random() * 9000)}`;

    // Save directly to Supabase table: collab_submissions
    const dbResult = await insertCollabSubmission({
      ticket_id: ticketId,
      artist_name: artistName,
      instagram_handle: instagramHandle,
      streaming_url: streamingUrl || "",
      collab_type: collabType || "Vocal Feature / Capela Drop",
      subgenre: subgenre || "Nepali Phonk",
      stem_link: stemLink,
      split_proposal: splitProposal || "50/50 Master Split",
      notes: notes || "",
      status: "queued_for_sunday_review",
    });

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Stem collaboration intake logged successfully.",
      dbSaved: dbResult.success,
    });
  } catch (error) {
    console.error("Collab API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
