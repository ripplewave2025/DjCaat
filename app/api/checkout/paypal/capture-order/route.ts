import { NextResponse } from "next/server";
import { getProductById } from "@/lib/store-products";

async function getPayPalAccessToken(clientId: string, clientSecret: string, baseUrl: string) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal OAuth failed: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const { orderId, packId, buyerEmail, buyerPhone } = await req.json();

    if (!orderId || !packId) {
      return NextResponse.json({ error: "orderId and packId are required" }, { status: 400 });
    }

    const product = getProductById(packId);
    if (!product) {
      return NextResponse.json({ error: "Sound pack not found" }, { status: 404 });
    }

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const rawMode = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
    const isLive = rawMode === "live" || (rawMode.includes("live") && !rawMode.includes("sandbox"));
    const baseUrl = isLive ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
    const invoiceNumber = `INV-CAAT-${Date.now().toString().slice(-6)}`;
    const invoiceDate = new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "medium", timeStyle: "short" });

    // Handle simulated order
    if (orderId.startsWith("PAYPAL_MOCK_") || !clientId || !clientSecret || clientId === "your_paypal_client_id") {
      return NextResponse.json({
        success: true,
        verified: true,
        isSimulated: true,
        downloadUrl: product.downloadUrl,
        packTitle: product.title,
        invoice: {
          invoiceNumber,
          date: invoiceDate,
          orderId,
          paymentId: `PAYPAL_SIM_${Date.now()}`,
          gateway: "PayPal (Simulated Sandbox)",
          currency: "USD",
          amount: product.priceUsd,
          buyerEmail: buyerEmail || "producer@example.com",
          buyerPhone: buyerPhone || "N/A",
          packTitle: product.title,
          specs: product.specs,
          seller: "DJ CAAT Official // Gorkhay AI",
        },
        message: "Payment captured successfully (simulated/sandbox mode).",
      });
    }

    const accessToken = await getPayPalAccessToken(clientId, clientSecret, baseUrl);

    const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!captureRes.ok) {
      const errText = await captureRes.text();
      console.error("[PayPal API Error] Order capture failed:", errText);
      return NextResponse.json({ error: "Failed to capture PayPal payment", details: errText }, { status: 502 });
    }

    const captureData = await captureRes.json();
    if (captureData.status !== "COMPLETED") {
      return NextResponse.json({ error: `Payment not completed (Status: ${captureData.status})` }, { status: 400 });
    }

    // Optionally log purchase to Supabase store_orders
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        await fetch(`${supabaseUrl}/rest/v1/store_orders`, {
          method: "POST",
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({
            order_id: orderId,
            payment_id: captureData.id,
            gateway: "paypal",
            currency: "USD",
            amount: product.priceUsd,
            pack_id: product.id,
            pack_title: product.title,
            buyer_email: buyerEmail,
            buyer_phone: buyerPhone || null,
            invoice_number: invoiceNumber,
            created_at: new Date().toISOString(),
          }),
        });
      }
    } catch (dbErr) {
      console.warn("[Supabase store_orders warning]:", dbErr);
    }

    return NextResponse.json({
      success: true,
      verified: true,
      downloadUrl: product.downloadUrl,
      packTitle: product.title,
      captureId: captureData.id,
      invoice: {
        invoiceNumber,
        date: invoiceDate,
        orderId,
        paymentId: captureData.id,
        gateway: "PayPal Global Checkout",
        currency: "USD",
        amount: product.priceUsd,
        buyerEmail,
        buyerPhone: buyerPhone || "N/A",
        packTitle: product.title,
        specs: product.specs,
        seller: "DJ CAAT Official // Gorkhay AI",
      },
    });
  } catch (error) {
    console.error("[PayPal Capture Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
