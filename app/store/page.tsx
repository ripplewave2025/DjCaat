"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  Play, 
  Pause, 
  Download, 
  Check, 
  Sparkles, 
  Shield, 
  Disc, 
  ArrowRight, 
  X, 
  Lock, 
  Loader2, 
  AlertCircle, 
  CreditCard,
  ExternalLink,
  Printer,
  Phone,
  FileText,
  CheckCircle2,
  ShieldCheck,
  MessageCircle
} from "lucide-react";
import { SOUND_PACKS, SoundPack } from "@/lib/store-products";

export default function StorePage() {
  const [playingPackId, setPlayingPackId] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [activeCheckoutPack, setActiveCheckoutPack] = useState<SoundPack | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "success">("details");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [paymentRef, setPaymentRef] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "paypal">("razorpay");
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const togglePreview = (packId: string) => {
    if (playingPackId === packId) {
      setPlayingPackId(null);
    } else {
      setPlayingPackId(packId);
    }
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayCheckout = async () => {
    if (!buyerEmail || !buyerEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address to receive your order invoice and download link.");
      return;
    }
    if (!buyerPhone || buyerPhone.trim().length < 8) {
      setErrorMessage("Please enter an active mobile / contact number for your payment confirmation & invoice.");
      return;
    }
    if (!activeCheckoutPack) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Create order on backend
      const res = await fetch("/api/checkout/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packId: activeCheckoutPack.id,
          buyerEmail,
          buyerPhone,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize Razorpay checkout");
      }

      // If simulated/test mode without API keys, fast-path verification
      if (orderData.isSimulated) {
        const verifyRes = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: "mock_sig",
            packId: activeCheckoutPack.id,
            buyerEmail,
            buyerPhone,
          }),
        });
        const verifyData = await verifyRes.json();
        setPaymentRef(orderData.orderId);
        setDownloadUrl(verifyData.downloadUrl || activeCheckoutPack.downloadUrl);
        setInvoiceData(verifyData.invoice);
        setCheckoutStep("success");
        setIsProcessing(false);
        return;
      }

      // 2. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay payment SDK. Please check your internet connection.");
      }

      // 3. Open Razorpay Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: "INR",
        name: "DJ CAAT Official",
        description: `${orderData.packTitle} - Instant Digital License`,
        image: "/images/logo.png",
        order_id: orderData.orderId,
        prefill: {
          email: buyerEmail,
          contact: buyerPhone,
        },
        theme: {
          color: "#00F0FF",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/checkout/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                packId: activeCheckoutPack.id,
                buyerEmail,
                buyerPhone,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.verified) {
              setPaymentRef(response.razorpay_payment_id || response.razorpay_order_id);
              setDownloadUrl(verifyData.downloadUrl || activeCheckoutPack.downloadUrl);
              setInvoiceData(verifyData.invoice);
              setCheckoutStep("success");
            } else {
              setErrorMessage("Payment verification failed. Please contact collab@djcaat.com.");
            }
          } catch (err: any) {
            setErrorMessage("Error verifying payment signature: " + (err.message || String(err)));
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.on("payment.failed", (resp: any) => {
        setErrorMessage(resp.error?.description || "Payment failed. Please try a different card or UPI.");
        setIsProcessing(false);
      });
      rzpInstance.open();
    } catch (err: any) {
      setErrorMessage(err.message || "Checkout error occurred");
      setIsProcessing(false);
    }
  };

  const handlePayPalCheckout = async () => {
    if (!buyerEmail || !buyerEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address to receive your order invoice and download link.");
      return;
    }
    if (!buyerPhone || buyerPhone.trim().length < 8) {
      setErrorMessage("Please enter an active mobile / contact number for your invoice.");
      return;
    }
    if (!activeCheckoutPack) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Create order on backend
      const res = await fetch("/api/checkout/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packId: activeCheckoutPack.id,
          buyerEmail,
          buyerPhone,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize PayPal order");
      }

      // If simulated / test mock order without keys:
      if (orderData.isSimulated) {
        setPaymentRef(orderData.orderId);
        setDownloadUrl(activeCheckoutPack.downloadUrl);
        setInvoiceData({
          invoiceNumber: `INV-CAAT-${Date.now().toString().slice(-6)}`,
          date: new Date().toLocaleDateString(),
          orderId: orderData.orderId,
          paymentId: `PAYPAL_SIM_${Date.now()}`,
          gateway: "PayPal (Simulated Test)",
          currency: "USD",
          amount: activeCheckoutPack.priceUsd,
          buyerEmail,
          buyerPhone,
          packTitle: activeCheckoutPack.title,
          specs: activeCheckoutPack.specs,
          seller: "DJ CAAT Official // Gorkhay AI",
        });
        setCheckoutStep("success");
        setIsProcessing(false);
        return;
      }

      // If PayPal returned an approval URL, redirect the buyer to PayPal checkout
      if (orderData.approvalUrl) {
        try {
          sessionStorage.setItem("pending_paypal_pack_id", activeCheckoutPack.id);
          sessionStorage.setItem("pending_paypal_email", buyerEmail);
          sessionStorage.setItem("pending_paypal_phone", buyerPhone);
        } catch (_) {}
        window.location.href = orderData.approvalUrl;
        return;
      }

      throw new Error("No PayPal approval link received from server.");
    } catch (err: any) {
      setErrorMessage(err.message || "PayPal checkout encountered an error.");
      setIsProcessing(false);
    }
  };

  // Check for returning PayPal redirect and capture payment
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const status = params.get("paypal_status");
    const token = params.get("token"); // PayPal order ID
    const packId = params.get("pack_id") || (typeof window !== "undefined" ? sessionStorage.getItem("pending_paypal_pack_id") : null);
    const email = params.get("buyer_email") || (typeof window !== "undefined" ? sessionStorage.getItem("pending_paypal_email") : null);
    const phone = params.get("buyer_phone") || (typeof window !== "undefined" ? sessionStorage.getItem("pending_paypal_phone") : null);

    if (status === "approved" && token && packId) {
      const targetPack = SOUND_PACKS.find((p) => p.id === packId);
      if (targetPack) {
        setActiveCheckoutPack(targetPack);
        setBuyerEmail(email || "");
        if (phone) setBuyerPhone(phone);
        setIsProcessing(true);
        setCheckoutStep("details");

        // Automatically capture the approved order
        fetch("/api/checkout/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: token,
            packId: targetPack.id,
            buyerEmail: email || "customer@paypal.com",
            buyerPhone: phone || "",
          }),
        })
          .then((res) => res.json())
          .then((captureData) => {
            if (captureData.success) {
              setPaymentRef(captureData.captureId || token);
              setDownloadUrl(captureData.downloadUrl || targetPack.downloadUrl);
              setInvoiceData(captureData.invoice);
              setCheckoutStep("success");
            } else {
              setErrorMessage(captureData.error || "Failed to capture approved PayPal payment.");
            }
          })
          .catch((err) => {
            setErrorMessage("Error capturing PayPal payment: " + (err.message || String(err)));
          })
          .finally(() => {
            setIsProcessing(false);
            window.history.replaceState({}, "", window.location.pathname);
            try {
              sessionStorage.removeItem("pending_paypal_pack_id");
              sessionStorage.removeItem("pending_paypal_email");
              sessionStorage.removeItem("pending_paypal_phone");
            } catch (_) {}
          });
      }
    } else if (status === "canceled") {
      setErrorMessage("PayPal checkout was canceled. You can try again whenever you're ready.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const openCheckoutForPack = (pack: SoundPack) => {
    setActiveCheckoutPack(pack);
    setPaymentMethod(currency === "USD" ? "paypal" : "razorpay");
    setCheckoutStep("details");
    setErrorMessage(null);
    setPaymentRef(null);
    setDownloadUrl(null);
    setInvoiceData(null);
  };

  const getWhatsAppBillUrl = () => {
    if (!activeCheckoutPack) return "#";
    const cleanPhone = (buyerPhone || "").replace(/[^0-9]/g, "");
    const invNo = invoiceData?.invoiceNumber || (paymentRef ? `INV-${paymentRef.slice(-6).toUpperCase()}` : "INV-CAAT");
    const amountStr = paymentMethod === "razorpay" ? `₹${activeCheckoutPack.priceInr}` : `$${activeCheckoutPack.priceUsd}`;
    const download = downloadUrl || activeCheckoutPack.downloadUrl;
    const fullDownloadLink = typeof window !== "undefined" ? `${window.location.origin}${download}` : `https://djcaat.com${download}`;

    const message = `🎵 *DJ CAAT OFFICIAL // STORE TAX INVOICE & RECEIPT*
━━━━━━━━━━━━━━━━━━━━
📄 *Invoice No:* ${invNo}
📅 *Date:* ${invoiceData?.date || new Date().toLocaleString()}
🔒 *Payment Status:* PAID & VERIFIED
💳 *Payment Ref:* ${paymentRef || "Verified"}
🏛️ *Gateway:* ${paymentMethod === "razorpay" ? "Razorpay (UPI / NetBanking)" : "PayPal Global"}
━━━━━━━━━━━━━━━━━━━━
📦 *Item:* ${activeCheckoutPack.title}
💰 *Total Amount:* ${amountStr}
👤 *Billed To:* ${buyerEmail} ${buyerPhone ? `(${buyerPhone})` : ""}
━━━━━━━━━━━━━━━━━━━━
⚡ *Direct Cloud Download Link:*
${fullDownloadLink}

_100% Royalty-Free for Commercial Release. Thank you for supporting DJ Caat!_`;

    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 space-y-10 sm:space-y-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-crimsonAccent">
            <ShoppingBag className="w-4 h-4" />
            <span>Official Producer Sound Vault</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
            Sound Kits & Stems
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            Direct access to DJ Caat’s engineered 808s, Nepali Phonk melodic chops, tuned cowbells, and FL Studio mixing presets. 100% royalty-free for commercial music production.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center space-x-2 bg-white/5 p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
          <span className="text-xs font-mono text-gray-400 px-2">Currency:</span>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
              currency === "USD" ? "bg-cyanAccent text-black shadow-cyan-glow" : "text-gray-400 hover:text-white"
            }`}
          >
            USD ($)
          </button>
          <button
            onClick={() => setCurrency("INR")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
              currency === "INR" ? "bg-cyanAccent text-black shadow-cyan-glow" : "text-gray-400 hover:text-white"
            }`}
          >
            INR (₹)
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SOUND_PACKS.map((pack) => (
          <div
            key={pack.id}
            className="glass-panel-premium glass-panel-hover rounded-2xl border border-white/10 p-5 sm:p-6 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl"
          >
            <div className="space-y-5">
              {/* Product Header & Art */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-36 aspect-video sm:aspect-square rounded-xl relative overflow-hidden shrink-0 border border-white/10 shadow-lg">
                  <Image
                    src={pack.coverImage}
                    alt={pack.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  {/* Floating Play Preview Button */}
                  <button
                    onClick={() => togglePreview(pack.id)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyanAccent text-black flex items-center justify-center shadow-cyan-glow hover:scale-110 active:scale-95 transition-transform"
                    title="Audio Preview"
                  >
                    {playingPackId === pack.id ? (
                      <Pause className="w-5 h-5 fill-black" />
                    ) : (
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5">
                    {pack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-white/5 text-cyanAccent border border-cyanAccent/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">{pack.title}</h3>
                  <p className="text-xs text-gray-400">{pack.subtitle}</p>

                  <div className="text-xl font-mono font-black text-cyanAccent pt-1">
                    {currency === "USD" ? `$${pack.priceUsd}` : `₹${pack.priceInr}`}
                    <span className="text-[10px] text-gray-400 font-normal ml-2">Instant Download</span>
                  </div>
                </div>
              </div>

              {/* Specs Box */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-void/60 border border-white/5 text-[11px] font-mono">
                <div>
                  <span className="text-gray-500 block text-[10px]">FORMAT</span>
                  <span className="text-gray-200">{pack.specs.format}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">FILE SIZE</span>
                  <span className="text-gray-200">{pack.specs.size}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">COUNT</span>
                  <span className="text-gray-200">{pack.specs.sampleCount}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">DAW</span>
                  <span className="text-gray-200">{pack.specs.daw}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                  Included in this kit:
                </span>
                <ul className="space-y-1.5 text-xs text-gray-300 font-sans">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-cyanAccent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => togglePreview(pack.id)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center space-x-2 transition-colors min-h-[44px]"
              >
                {playingPackId === pack.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{playingPackId === pack.id ? "Pause Preview" : "Audio Preview"}</span>
              </button>

              <button
                onClick={() => openCheckoutForPack(pack)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black hover:opacity-95 shadow-cyan-glow flex items-center justify-center space-x-2 transition-transform active:scale-95 min-h-[44px]"
              >
                <Download className="w-4 h-4 text-black" />
                <span>Get Pack</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="glass-panel-premium p-6 sm:p-8 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <Shield className="w-6 h-6 text-cyanAccent mx-auto" />
          <h4 className="text-sm font-bold text-white uppercase">100% Royalty Free</h4>
          <p className="text-xs text-gray-400">Use in your beats, Spotify releases, YouTube videos, and games with zero extra fees.</p>
        </div>
        <div className="space-y-2">
          <Sparkles className="w-6 h-6 text-purpleAccent mx-auto" />
          <h4 className="text-sm font-bold text-white uppercase">Studio Master Quality</h4>
          <p className="text-xs text-gray-400">24-Bit / 44.1kHz lossless WAV files engineered through analogue tube saturators.</p>
        </div>
        <div className="space-y-2">
          <Disc className="w-6 h-6 text-crimsonAccent mx-auto" />
          <h4 className="text-sm font-bold text-white uppercase">Instant Download</h4>
          <p className="text-xs text-gray-400">Receive an encrypted direct cloud download link immediately after order confirmation.</p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE BOTTOM SHEET / DESKTOP MODAL CHECKOUT */}
      {/* ------------------------------------------------------------- */}
      {activeCheckoutPack && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop overlay */}
          <div
            onClick={() => setActiveCheckoutPack(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Bottom Sheet Card on Mobile, Centered on Desktop */}
          <div className="relative w-full max-w-lg glass-sheet sm:rounded-2xl rounded-t-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200 max-h-[90vh] overflow-y-auto pb-safe">
            {/* Mobile Sheet Handle */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden mb-2" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyanAccent font-bold tracking-wider">
                  INSTANT DIGITAL CHECKOUT
                </span>
                <h3 className="text-lg font-black text-white uppercase mt-0.5">
                  {activeCheckoutPack.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCheckoutPack(null)}
                className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutStep === "details" ? (
              <div className="space-y-4">
                {/* Select Payment Method Tabs */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300 block">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Razorpay (INR / UPI) Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("razorpay")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        paymentMethod === "razorpay"
                          ? "bg-cyanAccent/10 border-cyanAccent shadow-cyan-glow"
                          : "bg-void/50 border-white/10 hover:border-white/20 text-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white uppercase tracking-wider">Razorpay</span>
                        <span className="text-[10px] font-mono text-cyanAccent font-bold">INR (₹)</span>
                      </div>
                      <div className="text-lg font-black text-white mt-1">
                        ₹{activeCheckoutPack.priceInr}
                      </div>
                      <div className="text-[9px] font-mono text-gray-400 mt-0.5 leading-tight">
                        UPI • GPay • PhonePe • Cards
                      </div>
                    </button>

                    {/* PayPal (USD / Global) Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        paymentMethod === "paypal"
                          ? "bg-[#FFC439]/10 border-[#FFC439] shadow-lg shadow-[#FFC439]/10"
                          : "bg-void/50 border-white/10 hover:border-white/20 text-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white uppercase tracking-wider">PayPal</span>
                        <span className="text-[10px] font-mono text-[#FFC439] font-bold">USD ($)</span>
                      </div>
                      <div className="text-lg font-black text-white mt-1">
                        ${activeCheckoutPack.priceUsd}
                      </div>
                      <div className="text-[9px] font-mono text-gray-400 mt-0.5 leading-tight">
                        Global Cards • PayPal Wallet
                      </div>
                    </button>
                  </div>
                </div>

                {/* Email and Phone Inputs */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">
                      Email Address (For Cloud Download Link & Receipt) <span className="text-crimsonAccent">*</span>
                    </label>
                    <input
                      type="email"
                      inputMode="email"
                      required
                      placeholder="producer@example.com"
                      value={buyerEmail}
                      onChange={(e) => {
                        setBuyerEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-void border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 flex items-center justify-between">
                      <span>Mobile / WhatsApp Number <span className="text-crimsonAccent">*</span></span>
                      <span className="text-[10px] text-green-400 flex items-center gap-1 font-mono">
                        <MessageCircle className="w-3 h-3" />
                        <span>Instant WhatsApp Bill</span>
                      </span>
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={buyerPhone}
                      onChange={(e) => {
                        setBuyerPhone(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-void border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-2 text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Dynamic Gateway Buttons based on selected paymentMethod */}
                <div className="space-y-2.5 pt-1">
                  {paymentMethod === "razorpay" ? (
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleRazorpayCheckout}
                      className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-blue-500 to-indigo-500 text-black shadow-cyan-glow hover:opacity-95 transition-all active:scale-95 min-h-[48px] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Connecting to Razorpay...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Pay ₹{activeCheckoutPack.priceInr} with UPI / Cards (Razorpay)</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handlePayPalCheckout}
                      className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FFC439] hover:bg-[#FFB71B] text-[#003087] shadow-lg transition-all active:scale-95 min-h-[48px] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#003087]" />
                          <span>Connecting to PayPal...</span>
                        </>
                      ) : (
                        <>
                          <span className="font-extrabold italic tracking-tight text-sm">PayPal</span>
                          <span className="text-black font-mono text-[11px] font-semibold">| Pay ${activeCheckoutPack.priceUsd} with PayPal</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Payment security info */}
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span className="flex items-center space-x-1.5">
                      <Lock className="w-3 h-3 text-cyanAccent" />
                      <span>256-Bit SSL Encrypted Checkout</span>
                    </span>
                    <span className="text-gray-500 uppercase">
                      {paymentMethod === "razorpay" ? "UPI • RuPay • NetBanking" : "PayPal • Visa • Mastercard"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5 animate-in fade-in py-1">
                {/* Official Invoice Card */}
                <div className="p-5 rounded-2xl bg-void/80 border border-white/15 space-y-4 shadow-xl">
                  {/* Invoice Header */}
                  <div className="flex items-start justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyanAccent font-bold block">
                        OFFICIAL TAX INVOICE & RECEIPT
                      </span>
                      <h4 className="text-base font-black text-white uppercase mt-0.5">
                        DJ CAAT OFFICIAL // GORKHAY AI
                      </h4>
                      <p className="text-[10px] font-mono text-gray-400">
                        Inv #: <strong className="text-white">{invoiceData?.invoiceNumber || (paymentRef ? `INV-${paymentRef.slice(-6).toUpperCase()}` : "INV-CAAT-2026")}</strong>
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PAID & VERIFIED</span>
                    </div>
                  </div>

                  {/* Customer & Transaction Info */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-500 block uppercase">BILLED TO</span>
                      <p className="text-gray-200 font-semibold truncate">{buyerEmail}</p>
                      {buyerPhone && <p className="text-gray-400 text-[11px]">{buyerPhone}</p>}
                    </div>
                    <div className="space-y-0.5 text-right">
                      <span className="text-[10px] text-gray-500 block uppercase">PAYMENT MODE</span>
                      <p className="text-gray-200 font-semibold">{invoiceData?.gateway || (paymentMethod === "razorpay" ? "Razorpay (UPI)" : "PayPal")}</p>
                      <p className="text-gray-400 text-[10px] truncate">Ref: {paymentRef || "Verified"}</p>
                    </div>
                  </div>

                  {/* Line Item Table */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center text-gray-300">
                      <div>
                        <strong className="text-white block">{activeCheckoutPack.title}</strong>
                        <span className="text-[10px] text-gray-400">{activeCheckoutPack.specs.format} • Studio Master</span>
                      </div>
                      <span className="text-base font-black text-cyanAccent">
                        {paymentMethod === "razorpay" ? `₹${activeCheckoutPack.priceInr}` : `$${activeCheckoutPack.priceUsd}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
                    <span>GST / Sales Tax (Inclusive):</span>
                    <span className="text-gray-200 font-bold">100% Fully Settled</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2.5">
                  {/* Download Sound Pack */}
                  <a
                    href={downloadUrl || activeCheckoutPack.downloadUrl}
                    download
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black shadow-cyan-glow flex items-center justify-center space-x-2 min-h-[48px] hover:opacity-95 transition-opacity active:scale-95"
                  >
                    <Download className="w-4 h-4 text-black" />
                    <span>Download Sound Pack (.WAV + MIDI)</span>
                  </a>

                  {/* WhatsApp Bill Delivery Button */}
                  <a
                    href={getWhatsAppBillUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-md flex items-center justify-center space-x-2 min-h-[44px] transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-black" />
                    <span>Send Bill via WhatsApp</span>
                  </a>

                  {/* Print / Save PDF Invoice */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 rounded-xl text-xs font-mono text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center space-x-2 transition-colors min-h-[40px]"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Save PDF Bill</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCheckoutPack(null)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-mono text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors min-h-[40px]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
