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
    const { packId, buyerEmail, buyerPhone } = await req.json();

    if (!packId) {
      return NextResponse.json({ error: "packId is required" }, { status: 400 });
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

    // If credentials are not configured, provide simulated sandbox response
    if (!clientId || !clientSecret || clientId === "your_paypal_client_id") {
      const mockOrderId = `PAYPAL_MOCK_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      return NextResponse.json({
        success: true,
        isSimulated: true,
        orderId: mockOrderId,
        amount: product.priceUsd,
        currency: "USD",
        packTitle: product.title,
        message: "PayPal credentials not configured in .env.local; running in simulated test mode.",
      });
    }

    const accessToken = await getPayPalAccessToken(clientId, clientSecret, baseUrl);

    // Extract host origin for return_url
    const origin = req.headers.get("origin") || req.headers.get("referer") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const siteUrl = origin.replace(/\/+$/, "");

    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: product.id,
            description: product.title,
            amount: {
              currency_code: "USD",
              value: product.priceUsd.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: "DJ CAAT Official Sound Store",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          return_url: `${siteUrl}/store?paypal_status=approved&pack_id=${product.id}&buyer_email=${encodeURIComponent(buyerEmail || "")}&buyer_phone=${encodeURIComponent(buyerPhone || "")}`,
          cancel_url: `${siteUrl}/store?paypal_status=canceled`,
        },
      }),
    });

    if (!orderRes.ok) {
      const errText = await orderRes.text();
      console.error("[PayPal API Error] Order create failed:", errText);
      return NextResponse.json({ error: "Failed to create PayPal order", details: errText }, { status: 502 });
    }

    const orderData = await orderRes.json();
    const approvalUrl = orderData.links?.find((l: any) => l.rel === "approve")?.href;

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      approvalUrl,
      amount: product.priceUsd,
      currency: "USD",
      packTitle: product.title,
    });
  } catch (error) {
    console.error("[PayPal Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
