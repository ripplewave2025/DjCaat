-- Migration: 20260908120000_create_collab_and_clicks.sql
-- Purpose: Collect artist collaboration form submissions and link/button clicks for DJ Caat Platform

-- 1. Create Collaboration Submissions Table
CREATE TABLE IF NOT EXISTS public.collab_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id TEXT NOT NULL,
    artist_name TEXT NOT NULL,
    instagram_handle TEXT NOT NULL,
    streaming_url TEXT,
    collab_type TEXT NOT NULL DEFAULT 'Vocal Feature / Capela Drop',
    subgenre TEXT NOT NULL DEFAULT 'Nepali Phonk',
    stem_link TEXT NOT NULL,
    split_proposal TEXT NOT NULL DEFAULT '50/50 Master Split',
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create Analytics & Clicks Tracking Table
CREATE TABLE IF NOT EXISTS public.analytics_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name TEXT NOT NULL,
    target_label TEXT,
    target_url TEXT,
    page_path TEXT NOT NULL DEFAULT '/',
    referrer TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.collab_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_clicks ENABLE ROW LEVEL SECURITY;

-- 4. Policies: Allow anonymous public inserts from the website
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'collab_submissions' AND policyname = 'Allow public submissions'
    ) THEN
        CREATE POLICY "Allow public submissions" ON public.collab_submissions
            FOR INSERT TO anon WITH CHECK (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'analytics_clicks' AND policyname = 'Allow public click tracking'
    ) THEN
        CREATE POLICY "Allow public click tracking" ON public.analytics_clicks
            FOR INSERT TO anon WITH CHECK (true);
    END IF;
END $$;

-- 5. Policies: Allow authenticated / service_role to read and manage
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'collab_submissions' AND policyname = 'Allow admin read submissions'
    ) THEN
        CREATE POLICY "Allow admin read submissions" ON public.collab_submissions
            FOR SELECT TO authenticated USING (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'analytics_clicks' AND policyname = 'Allow admin read clicks'
    ) THEN
        CREATE POLICY "Allow admin read clicks" ON public.analytics_clicks
            FOR SELECT TO authenticated USING (true);
    END IF;
END $$;
