-- Migration: 20260909150000_create_store_orders.sql
-- Purpose: Track digital sound store orders from Razorpay & PayPal

CREATE TABLE IF NOT EXISTS public.store_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT NOT NULL,
    payment_id TEXT NOT NULL,
    gateway TEXT NOT NULL, -- 'razorpay' or 'paypal'
    currency TEXT NOT NULL DEFAULT 'INR', -- 'INR' or 'USD'
    amount NUMERIC NOT NULL,
    pack_id TEXT NOT NULL,
    pack_title TEXT NOT NULL,
    buyer_email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.store_orders ENABLE ROW LEVEL SECURITY;

-- Allow service_role to insert and read orders
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'store_orders' AND policyname = 'Allow service_role full access'
    ) THEN
        CREATE POLICY "Allow service_role full access" ON public.store_orders
            FOR ALL TO service_role USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Allow anon to insert completed checkout records
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'store_orders' AND policyname = 'Allow anon order insert'
    ) THEN
        CREATE POLICY "Allow anon order insert" ON public.store_orders
            FOR INSERT TO anon WITH CHECK (true);
    END IF;
END $$;
