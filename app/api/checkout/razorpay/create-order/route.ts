import { NextResponse } from "next/server";
import { getProductById } from "@/lib/store-products";

export async function POST(req: Request) {
  try {
    const { packId, buyerEmail, buyerPhone } = await req.json();

    if (!packId) {
      return NextResponse.json({ error: "Product packId is required" }, { status: 400 });
    }

    const product = getProductById(packId);
    if (!product) {
      return NextResponse.json({ error: "Sound pack not found" }, { status: 404 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Amount in Indian paise (1 INR = 100 paise)
    const amountInPaise = Math.round(product.priceInr * 100);

    // If Razorpay credentials are not yet set up, return simulated sandbox order for local dev
    if (!keyId || !keySecret || keyId === "rzp_test_your_key_id") {
      const mockOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      return NextResponse.json({
        success: true,
        isSimulated: true,
        orderId: mockOrderId,
        amount: amountInPaise,
        currency: "INR",
        keyId: "rzp_test_placeholder",
        packTitle: product.title,
        message: "Razorpay credentials not configured in .env.local; running in simulated test mode.",
      });
    }

    // Call Razorpay Orders API
    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_${product.id}_${Date.now().toString().slice(-8)}`,
        notes: {
          packId: product.id,
          packTitle: product.title,
          buyerEmail: buyerEmail || "unspecified",
          buyerPhone: buyerPhone || "unspecified",
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[Razorpay API Error] Order creation failed:", errText);
      return NextResponse.json({ error: "Failed to create Razorpay order", details: errText }, { status: 502 });
    }

    const orderData = await response.json();

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId,
      packTitle: product.title,
    });
  } catch (error) {
    console.error("[Razorpay Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
