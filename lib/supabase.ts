// Lightweight direct REST client for Supabase (Zero external bundle weight)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bbkxyxbbegpcvfiarlmg.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJia3h5eGJiZWdwY3ZmaWFybG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjMxODgsImV4cCI6MjEwNDQzOTE4OH0.JaB9kD3ikSAxHUk2Eq7D8x51eHwEUXUpnM6a4GBfmjw";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

export interface CollabSubmissionPayload {
  ticket_id: string;
  artist_name: string;
  instagram_handle: string;
  streaming_url?: string;
  collab_type: string;
  subgenre: string;
  stem_link: string;
  split_proposal: string;
  notes?: string;
  status?: string;
}

export interface AnalyticsClickPayload {
  event_name: string;
  target_label?: string;
  target_url?: string;
  page_path: string;
  referrer?: string;
  user_agent?: string;
}

/**
 * Insert a collaboration submission into Supabase public.collab_submissions table
 */
export async function insertCollabSubmission(payload: CollabSubmissionPayload) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/collab_submissions`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[Supabase Error] insertCollabSubmission failed:", errorText);
      return { success: false, error: errorText };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("[Supabase Error] Network/fetch error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Log click or interaction event into Supabase public.analytics_clicks table
 */
export async function insertAnalyticsClick(payload: AnalyticsClickPayload) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/analytics_clicks`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[Supabase Error] insertAnalyticsClick failed:", errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error("[Supabase Error] Analytics error:", error);
    return { success: false, error: String(error) };
  }
}
