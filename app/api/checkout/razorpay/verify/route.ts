import { NextResponse } from "next/server";
import crypto from "crypto";
import { getProductById } from "@/lib/store-products";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      packId,
      buyerEmail,
      buyerPhone,
    } = await req.json();

    const product = getProductById(packId);
    if (!product) {
      return NextResponse.json({ error: "Sound pack not found" }, { status: 404 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const invoiceNumber = `INV-CAAT-${Date.now().toString().slice(-6)}`;
    const invoiceDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

    // Handle simulated order
    if (razorpay_order_id?.startsWith("order_mock_") || !keySecret || keySecret === "your_razorpay_secret_key") {
      return NextResponse.json({
        success: true,
        verified: true,
        isSimulated: true,
        downloadUrl: product.downloadUrl,
        packTitle: product.title,
        invoice: {
          invoiceNumber,
          date: invoiceDate,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id || `mock_pay_${Date.now()}`,
          gateway: "Razorpay (Simulated Test)",
          currency: "INR",
          amount: product.priceInr,
          buyerEmail: buyerEmail || "producer@example.com",
          buyerPhone: buyerPhone || "+91 9800000000",
          packTitle: product.title,
          specs: product.specs,
          seller: "DJ CAAT Official // Gorkhay AI",
        },
        message: "Payment verified successfully (simulated/sandbox mode).",
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing Razorpay verification parameters" }, { status: 400 });
    }

    // Razorpay HMAC SHA256 signature verification
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isMatch = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Optionally log purchase to Supabase store_orders if SUPABASE credentials exist
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
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            gateway: "razorpay",
            currency: "INR",
            amount: product.priceInr,
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
      // Don't fail the download if logging fails
      console.warn("[Supabase store_orders warning]:", dbErr);
    }

    return NextResponse.json({
      success: true,
      verified: true,
      downloadUrl: product.downloadUrl,
      packTitle: product.title,
      paymentId: razorpay_payment_id,
      invoice: {
        invoiceNumber,
        date: invoiceDate,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        gateway: "Razorpay (UPI / NetBanking / Cards)",
        currency: "INR",
        amount: product.priceInr,
        buyerEmail,
        buyerPhone: buyerPhone || "N/A",
        packTitle: product.title,
        specs: product.specs,
        seller: "DJ CAAT Official // Gorkhay AI (Darjeeling, India)",
      },
    });
  } catch (error) {
    console.error("[Razorpay Verify Error]:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
