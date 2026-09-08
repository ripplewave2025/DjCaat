import { NextResponse } from "next/server";
import { insertAnalyticsClick } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, targetLabel, targetUrl, pagePath, referrer } = body;

    if (!eventName) {
      return NextResponse.json({ success: false, error: "Missing eventName" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || "";

    const res = await insertAnalyticsClick({
      event_name: eventName,
      target_label: targetLabel,
      target_url: targetUrl,
      page_path: pagePath || "/",
      referrer: referrer || "",
      user_agent: userAgent,
    });

    return NextResponse.json({ success: res.success });
  } catch (error) {
    console.error("Track API error:", error);
    return NextResponse.json({ success: false, error: "Failed to record event" }, { status: 500 });
  }
}
