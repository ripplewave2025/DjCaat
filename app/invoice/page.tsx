"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Printer,
  Download,
  CheckCircle2,
  Globe,
  Sparkles,
  ShieldCheck,
  Building2,
  CreditCard,
  QrCode,
  FileText,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";

export default function InvoicePage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [paymentMilestone, setPaymentMilestone] = useState<"milestone1" | "full">("milestone1");
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const exchangeRate = 83.4; // 1 USD = 83.4 INR
  const domainCostInr = 1081.40;
  const domainCostUsd = domainCostInr / exchangeRate; // ~$12.97

  // Deliverables & billings based on the project architecture & CompanyCert
  const serviceItems = [
    {
      no: "01",
      title: "Custom Next.js Frontend Architecture & Artist Bio Hub",
      specs: "High-performance responsive design, dark phonk aesthetic, dynamic /links smart-bio module replacing Linktree, discography audio player with streaming integrations (YouTube, SoundCloud, Spotify).",
      sac: "998314",
      hours: 24,
      amountInr: 37530.00,
      amountUsd: 450.00,
    },
    {
      no: "02",
      title: "Interactive WebGL / HTML5 Audio Visualizer Engine",
      specs: "Real-time Web Audio API frequency analysis (FFT 2048), 808 sub-bass reactive pulse, chromatic aberration glitch, 3 render modes (Radial, Oscilloscope, 3D Grid Road), audio file stem upload & live mic input.",
      sac: "998314",
      hours: 20,
      amountInr: 33360.00,
      amountUsd: 400.00,
    },
    {
      no: "03",
      title: "Collab Intake Pipeline & Backend Architecture",
      specs: "Dedicated /collab multi-step submission portal, standardized stem & cloud intake (Google Drive/Dropbox), automatic ticket receipt generation (#CAAT-XXXX), Supabase / database ready schema.",
      sac: "998314",
      hours: 16,
      amountInr: 25020.00,
      amountUsd: 300.00,
    },
    {
      no: "04",
      title: "Digital Sound Store & Sample Kit Delivery Engine",
      specs: "Sound pack & sample kit showcase module, instant checkout flow with automated digital download links, support for Stripe, Lemon Squeezy, and Razorpay.",
      sac: "998314",
      hours: 12,
      amountInr: 20850.00,
      amountUsd: 250.00,
    },
    {
      no: "05",
      title: "Artist EPK (Electronic Press Kit) & Media Vault",
      specs: "Verified stats counter (33.3K+ IG followers, 100K+ streams), high-resolution asset download hub, sync licensing and booking management contact routing.",
      sac: "998314",
      hours: 8,
      amountInr: 12510.00,
      amountUsd: 150.00,
    },
    {
      no: "06",
      title: "DNS Routing, Cloudflare Email Routing & Deployment",
      specs: "Root domain configuration & Cloudflare SSL integration, custom business email routing (e.g. mgmt@djcaat.com, collab@djcaat.com), Meta/TikTok tracking pixel integration for IG traffic.",
      sac: "998314",
      hours: 4,
      amountInr: 8340.00,
      amountUsd: 100.00,
    },
  ];

  // Domain item - added as requested (₹ 1,081.40)
  const domainItem = {
    no: "07",
    title: "Domain Name Acquisition & 1-Year Registration",
    specs: "Direct procurement of official artist domain (djcaat.com / .in) at direct registrar wholesale price, including DNS configuration & Cloudflare WHOIS privacy shield.",
    sac: "998315",
    hours: 1,
    amountInr: domainCostInr,
    amountUsd: domainCostUsd,
  };

  const servicesSubtotalInr = serviceItems.reduce((acc, item) => acc + item.amountInr, 0);
  const discountInr = 16680.00; // $200 promo discount
  const netServicesInr = servicesSubtotalInr - discountInr;

  const servicesSubtotalUsd = serviceItems.reduce((acc, item) => acc + item.amountUsd, 0);
  const discountUsd = 200.00;
  const netServicesUsd = servicesSubtotalUsd - discountUsd;

  // Milestone Calculations
  // Milestone 1: 50% of net services + 100% Domain cost
  const m1ServicesInr = netServicesInr * 0.5;
  const m1ServicesUsd = netServicesUsd * 0.5;

  const m1TotalTaxableInr = m1ServicesInr + domainCostInr;
  const m1TotalTaxableUsd = m1ServicesUsd + domainCostUsd;

  const fullTotalTaxableInr = netServicesInr + domainCostInr;
  const fullTotalTaxableUsd = netServicesUsd + domainCostUsd;

  const activeTaxableInr = paymentMilestone === "milestone1" ? m1TotalTaxableInr : fullTotalTaxableInr;
  const activeTaxableUsd = paymentMilestone === "milestone1" ? m1TotalTaxableUsd : fullTotalTaxableUsd;

  // GST calculation (9% CGST + 9% SGST for West Bengal intra-state)
  const cgstRate = 0.09;
  const sgstRate = 0.09;
  const cgstInr = includeGst ? activeTaxableInr * cgstRate : 0;
  const sgstInr = includeGst ? activeTaxableInr * sgstRate : 0;
  const totalGstInr = cgstInr + sgstInr;

  const finalPayableInr = activeTaxableInr + totalGstInr;
  const finalPayableUsd = currency === "USD" ? (finalPayableInr / exchangeRate) : 0;

  const formatMoney = (inr: number, usd: number) => {
    if (currency === "USD") {
      return `$${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `₹${inr.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCopySummary = () => {
    const text = `PRO-FORMA INVOICE: NGL/26-27/PI-001
ISSUED BY: GORKHAY AI (Managed by NextGen Learn AI)
OFFICIAL EMAIL: ceo@gorkhayai.com | PHONE: +91 9773976436
GSTIN: 19BJLPB8509E1Z6 | PAN: BJLPB8509E | Udyam: UDYAM-WB-06-0061257
Darjeeling, West Bengal - 734213

CLIENT (CONFIDENTIAL): DJ CAAT (Deep Gadhaily)
[IDENTITY PROTECTED UNDER NDA - CONFIDENTIAL ARTIST PERSONA]
PROJECT: DJ CAAT Official Artist Platform & 808 Phonk Engine

DELIVERABLES & BILLING:
- Custom Next.js Architecture & Bio Hub: ₹37,530.00
- WebGL / HTML5 Audio Visualizer: ₹33,360.00
- Collab Intake Pipeline: ₹25,020.00
- Digital Sound Store: ₹20,850.00
- Artist EPK & Media Vault: ₹12,510.00
- DNS & Cloudflare Email Setup: ₹8,340.00
- Domain Name Registration (1 Year): ₹1,081.40
------------------------------------------------
Subtotal: ₹1,38,691.40
Artist Promo Discount: -₹16,680.00
Total Project Scope Value: ₹1,22,011.40

FIRST INVOICE (Milestone 1 - 50% Advance + 100% Domain):
- 50% Development Advance: ₹60,465.00
- Domain Name (100% Upfront): ₹1,081.40
Taxable Amount: ₹61,546.40
${includeGst ? `CGST (9%): ₹${cgstInr.toFixed(2)}\nSGST (9%): ₹${sgstInr.toFixed(2)}\nTOTAL PAYABLE: ₹${finalPayableInr.toFixed(2)}` : `TOTAL PAYABLE: ₹61,546.40`}

REMITTANCE:
Beneficiary: Upesh Bishwakarma / NexGen LearnAI
Bank: Central Bank of India (Darjeeling Branch)
UPI ID: 9773976436@upi
Contact: ceo@gorkhayai.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-gray-200 py-8 px-4 sm:px-6 lg:px-8 font-sans print:bg-white print:text-black print:p-0">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* TOP BAR / CONTROLS (Hidden during Print) */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <Link
              href="/admin/plan"
              className="text-xs font-mono text-cyanAccent hover:underline flex items-center gap-1"
            >
              ← Back to Project Plan
            </Link>
            <span className="text-gray-600">|</span>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-cyanAccent/10 text-cyanAccent border border-cyanAccent/30">
              OFFICIAL PRO-FORMA INVOICE
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Currency Toggle */}
            <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  currency === "INR" ? "bg-cyanAccent text-black shadow-cyan-glow" : "text-gray-400 hover:text-white"
                }`}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  currency === "USD" ? "bg-cyanAccent text-black shadow-cyan-glow" : "text-gray-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Milestone Toggle */}
            <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setPaymentMilestone("milestone1")}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  paymentMilestone === "milestone1" ? "bg-purpleAccent text-white shadow-purple-glow" : "text-gray-400 hover:text-white"
                }`}
              >
                1st Invoice (50% + Domain)
              </button>
              <button
                onClick={() => setPaymentMilestone("full")}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  paymentMilestone === "full" ? "bg-purpleAccent text-white shadow-purple-glow" : "text-gray-400 hover:text-white"
                }`}
              >
                Full Scope (100%)
              </button>
            </div>

            {/* GST Toggle */}
            <button
              onClick={() => setIncludeGst(!includeGst)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-colors ${
                includeGst
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
              title="Toggle GST 18% calculation"
            >
              GST: {includeGst ? "18% Included" : "Exempt / Direct"}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopySummary}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
              title="Copy invoice summary to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Download PDF Button */}
            <a
              href="/DJ_CAAT_Proforma_Invoice_NGL.pdf"
              download="DJ_CAAT_Proforma_Invoice_NGL.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purpleAccent text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-purple-glow transition-all"
              title="Download pre-generated PDF"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            {/* Print / Save PDF Button */}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyanAccent text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-cyan-glow transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INVOICE DOCUMENT SHEET (Print Optimized) */}
        {/* ========================================================================= */}
        <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:bg-white print:p-0">
          
          {/* Subtle Cyber Glow in Web View */}
          <div className="print:hidden absolute -top-24 -right-24 w-96 h-96 bg-cyanAccent/5 rounded-full blur-3xl pointer-events-none" />

          {/* INVOICE HEADER */}
          <div className="border-b border-white/10 print:border-gray-300 pb-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              
              {/* Company Identity */}
              <div className="space-y-2.5 max-w-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-cyanAccent/10 border border-cyanAccent/30 flex items-center justify-center text-cyanAccent font-black text-xl print:border-gray-800 print:text-black">
                    GA
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-white tracking-wider uppercase print:text-black">
                      GORKHAY AI
                    </h1>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyanAccent/10 text-cyanAccent border border-cyanAccent/30 print:border-gray-700 print:text-black">
                      Managed by NextGen Learn AI
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-400 print:text-gray-700 space-y-1 font-mono leading-relaxed">
                  <p>
                    <strong className="text-gray-200 print:text-black">Proprietor:</strong> Upesh Bishwakarma
                  </p>
                  <p className="flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyanAccent print:text-black" />
                    <span>
                      House No 24, Seemana Gown, Ration Dhura, Lamahatta Busty, Rangli-Rangliot Block, Darjeeling, West Bengal – 734213, India
                    </span>
                  </p>
                  <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5">
                    <p><strong className="text-gray-300 print:text-black">Email:</strong> ceo@gorkhayai.com</p>
                    <p><strong className="text-gray-300 print:text-black">Phone:</strong> +91 9773976436</p>
                    <p><strong className="text-gray-300 print:text-black">GSTIN:</strong> 19BJLPB8509E1Z6</p>
                    <p><strong className="text-gray-300 print:text-black">PAN:</strong> BJLPB8509E</p>
                    <p><strong className="text-gray-300 print:text-black">Udyam:</strong> UDYAM-WB-06-0061257</p>
                    <p><strong className="text-gray-300 print:text-black">State Code:</strong> 19 (West Bengal)</p>
                  </div>
                </div>
              </div>

              {/* Invoice Meta */}
              <div className="sm:text-right space-y-2 font-mono">
                <div className="inline-block px-3 py-1 rounded-lg bg-cyanAccent/10 border border-cyanAccent/30 text-cyanAccent text-xs font-black uppercase tracking-widest print:border-black print:text-black print:bg-gray-100">
                  PRO-FORMA INVOICE
                </div>
                <div className="text-xs text-gray-400 print:text-gray-700 space-y-1">
                  <p>
                    Invoice No: <strong className="text-white print:text-black text-sm">NGL/26-27/PI-001</strong>
                  </p>
                  <p>
                    Issue Date: <strong className="text-white print:text-black">08 September 2026</strong>
                  </p>
                  <p>
                    Financial Year: <strong className="text-white print:text-black">2026 – 2027</strong>
                  </p>
                  <p>
                    Payment Terms: <strong className="text-cyanAccent print:text-black">50% Advance + Domain (100%)</strong>
                  </p>
                  <p>
                    Due Date: <strong className="text-white print:text-black">Immediate / On Receipt</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* BILL TO / CLIENT DETAILS (Confidential Identity) */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 print:border-gray-300 print:bg-gray-50 flex flex-col sm:flex-row justify-between gap-4 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    BILLED TO (CLIENT)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-crimsonAccent/15 text-crimsonAccent border border-crimsonAccent/30 uppercase print:border-black print:text-black">
                    Strictly Confidential
                  </span>
                </div>
                <p className="text-base font-black text-white print:text-black uppercase flex items-center gap-2">
                  <span>DJ CAAT</span>
                  <span className="text-xs font-normal text-gray-400 print:text-gray-600">(Deep Gadhaily)</span>
                </p>
                <p className="text-[11px] text-gray-400 print:text-gray-600 leading-tight">
                  Music Producer & Sound Designer (33.3K+ Instagram Artist) • <em>Real name & face protected under NDA</em>
                </p>
                <p className="text-gray-400 print:text-gray-600">
                  Darjeeling, West Bengal, India
                </p>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                  ARTIST PLATFORM
                </span>
                <p className="text-gray-300 print:text-gray-800">
                  Email: <strong className="text-white print:text-black">collab@djcaat.com</strong>
                </p>
                <p className="text-gray-400 print:text-gray-600">
                  Instagram: <strong className="text-cyanAccent print:text-black">@d.g_dj_caat_</strong>
                </p>
                <p className="text-gray-400 print:text-gray-600">
                  Target Domain: <strong className="text-white print:text-black">djcaat.com</strong>
                </p>
              </div>
            </div>
          </div>

          {/* PROJECT SUMMARY BANNER */}
          <div className="py-4 border-b border-white/10 print:border-gray-300 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-gray-400 print:text-gray-600">Project: </span>
              <strong className="text-white print:text-black">DJ CAAT // Official Artist Platform, Web Audio 808 Visualizer & Sound Store</strong>
            </div>
            <div className="hidden sm:block text-gray-400 print:text-gray-600">
              Tech Stack: <span className="text-cyanAccent print:text-black">Next.js 14, Web Audio API, Cloudflare, Tailwind</span>
            </div>
          </div>

          {/* LINE ITEMS TABLE */}
          <div className="py-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b-2 border-white/10 print:border-gray-400 text-gray-400 print:text-gray-700 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-2 w-10">No.</th>
                  <th className="py-3 px-2">Deliverable & Scope Description</th>
                  <th className="py-3 px-2 text-center w-20">SAC</th>
                  <th className="py-3 px-2 text-center w-16">Qty/Hrs</th>
                  <th className="py-3 px-2 text-right w-28">Amount ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 print:divide-gray-200">
                {/* Services */}
                {serviceItems.map((item) => (
                  <tr key={item.no} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-2 font-bold text-cyanAccent print:text-black align-top">
                      {item.no}
                    </td>
                    <td className="py-3.5 px-2 space-y-1 align-top">
                      <p className="text-sm font-bold text-white print:text-black">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 print:text-gray-600 leading-relaxed font-sans">
                        {item.specs}
                      </p>
                    </td>
                    <td className="py-3.5 px-2 text-center text-gray-400 print:text-gray-700 align-top">
                      {item.sac}
                    </td>
                    <td className="py-3.5 px-2 text-center text-gray-300 print:text-black align-top">
                      {item.hours}h
                    </td>
                    <td className="py-3.5 px-2 text-right font-bold text-white print:text-black align-top">
                      {formatMoney(item.amountInr, item.amountUsd)}
                    </td>
                  </tr>
                ))}

                {/* Domain Registration Item (Highlighted) */}
                <tr className="bg-cyanAccent/[0.04] print:bg-gray-100 font-semibold border-t-2 border-cyanAccent/30 print:border-gray-400">
                  <td className="py-3.5 px-2 font-black text-cyanAccent print:text-black align-top">
                    {domainItem.no}
                  </td>
                  <td className="py-3.5 px-2 space-y-1 align-top">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-cyanAccent print:text-black">
                        {domainItem.title}
                      </p>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyanAccent text-black uppercase print:border print:border-black">
                        Actuals / 100% Upfront
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 print:text-gray-700 leading-relaxed font-sans">
                      {domainItem.specs}
                    </p>
                  </td>
                  <td className="py-3.5 px-2 text-center text-cyanAccent print:text-black align-top">
                    {domainItem.sac}
                  </td>
                  <td className="py-3.5 px-2 text-center text-cyanAccent print:text-black align-top">
                    1 yr
                  </td>
                  <td className="py-3.5 px-2 text-right font-black text-cyanAccent print:text-black align-top text-sm">
                    {formatMoney(domainItem.amountInr, domainItem.amountUsd)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FINANCIAL SUMMARY & MILESTONES */}
          <div className="border-t border-white/10 print:border-gray-400 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
            
            {/* Left Column: Terms & Milestone Breakdown */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 print:border-gray-300 print:bg-gray-50 space-y-2.5">
                <span className="text-[10px] text-cyanAccent print:text-black font-bold uppercase tracking-widest block">
                  PAYMENT MILESTONES & SCHEDULE
                </span>
                
                <div className="flex justify-between items-center pb-2 border-b border-white/5 print:border-gray-200">
                  <div>
                    <strong className="text-white print:text-black block text-xs">
                      1. Milestone 1 (Payable Now - Advance)
                    </strong>
                    <span className="text-[11px] text-gray-400 print:text-gray-600">
                      50% Dev Advance ({formatMoney(m1ServicesInr, m1ServicesUsd)}) + 100% Domain ({formatMoney(domainCostInr, domainCostUsd)})
                    </span>
                  </div>
                  <span className="font-bold text-cyanAccent print:text-black text-sm">
                    {formatMoney(m1TotalTaxableInr, m1TotalTaxableUsd)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-gray-300 print:text-gray-800 block text-xs">
                      2. Milestone 2 (On Launch & Handover)
                    </strong>
                    <span className="text-[11px] text-gray-400 print:text-gray-600">
                      Remaining 50% upon domain live DNS pointing & code release
                    </span>
                  </div>
                  <span className="font-bold text-gray-300 print:text-gray-800 text-sm">
                    {formatMoney(m1ServicesInr, m1ServicesUsd)}
                  </span>
                </div>
              </div>

              {/* Bank Details Box */}
              <div className="p-4 rounded-xl border border-white/10 print:border-gray-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 print:text-black uppercase tracking-widest flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-cyanAccent print:text-black" />
                    <span>PAYMENT INSTRUCTIONS</span>
                  </span>
                  <span className="text-[10px] text-green-400 print:text-gray-700">NEFT / RTGS / IMPS / UPI</span>
                </div>
                <div className="text-[11px] text-gray-300 print:text-gray-800 space-y-1">
                  <p>Beneficiary Name: <strong className="text-white print:text-black">UPESH BISHWAKARMA / NEXTGEN LEARNAI</strong></p>
                  <p>Bank: <strong className="text-white print:text-black">Central Bank of India</strong> (Darjeeling Branch)</p>
                  <p>Account Type: <strong className="text-white print:text-black">Current / Business Account</strong></p>
                  <p>UPI ID: <strong className="text-cyanAccent print:text-black">9773976436@upi</strong></p>
                  <p>Official Email: <strong className="text-cyanAccent print:text-black">ceo@gorkhayai.com</strong></p>
                </div>
              </div>
            </div>

            {/* Right Column: Calculations */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-gray-400 print:text-gray-700">
                <span>Services Gross Total:</span>
                <span className="font-medium text-white print:text-black">{formatMoney(servicesSubtotalInr, servicesSubtotalUsd)}</span>
              </div>
              <div className="flex justify-between text-crimsonAccent print:text-red-600">
                <span>Artist Promotional Discount:</span>
                <span>-{formatMoney(discountInr, discountUsd)}</span>
              </div>
              <div className="flex justify-between text-gray-400 print:text-gray-700">
                <span>Net Services Scope:</span>
                <span className="font-medium text-white print:text-black">{formatMoney(netServicesInr, netServicesUsd)}</span>
              </div>
              <div className="flex justify-between text-cyanAccent print:text-black font-semibold">
                <span>Domain Registration (Direct Cost):</span>
                <span>+{formatMoney(domainCostInr, domainCostUsd)}</span>
              </div>

              <div className="pt-2 border-t border-white/10 print:border-gray-300 flex justify-between text-gray-300 print:text-black">
                <span>Total Project Scope Value:</span>
                <span className="font-bold text-white print:text-black">{formatMoney(fullTotalTaxableInr, fullTotalTaxableUsd)}</span>
              </div>

              {/* Active Billing Section */}
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-cyanAccent/30 print:border-gray-400 print:bg-gray-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white print:text-black">
                    {paymentMilestone === "milestone1" ? "1st INVOICE TAXABLE VALUE (50% + Domain):" : "TOTAL TAXABLE VALUE (100%):"}
                  </span>
                  <span className="font-bold text-white print:text-black text-sm">
                    {formatMoney(activeTaxableInr, activeTaxableUsd)}
                  </span>
                </div>

                {includeGst && (
                  <div className="pt-2 border-t border-white/10 print:border-gray-300 space-y-1 text-[11px] text-gray-400 print:text-gray-700">
                    <div className="flex justify-between">
                      <span>CGST (9%) [West Bengal]:</span>
                      <span>{formatMoney(cgstInr, cgstInr / exchangeRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SGST (9%) [West Bengal]:</span>
                      <span>{formatMoney(sgstInr, sgstInr / exchangeRate)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300 print:text-black font-medium">
                      <span>Total GST (18%):</span>
                      <span>{formatMoney(totalGstInr, totalGstInr / exchangeRate)}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t-2 border-cyanAccent print:border-black flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-cyanAccent print:text-black uppercase tracking-wider block">
                      TOTAL AMOUNT PAYABLE:
                    </span>
                    <span className="text-[10px] text-gray-400 print:text-gray-600 font-sans">
                      {paymentMilestone === "milestone1" ? "Immediate Advance to Initiate Setup & Procure Domain" : "Full Project Settlement"}
                    </span>
                  </div>
                  <span className="text-xl font-black text-cyanAccent print:text-black">
                    {formatMoney(finalPayableInr, finalPayableUsd)}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 print:text-gray-600 space-y-0.5 pt-1">
                <p>• Amount in words: <strong className="text-gray-200 print:text-black">
                  {paymentMilestone === "milestone1"
                    ? (includeGst ? "Seventy-Two Thousand Six Hundred Twenty-Four Rupees and Seventy-Five Paise Only" : "Sixty-One Thousand Five Hundred Forty-Six Rupees and Forty Paise Only")
                    : (includeGst ? "One Lakh Forty-Three Thousand Nine Hundred Seventy-Three Rupees and Forty-Five Paise Only" : "One Lakh Twenty-Two Thousand Eleven Rupees and Forty Paise Only")
                  }
                </strong></p>
                <p>• Reverse Charge: <strong className="text-gray-200 print:text-black">No</strong></p>
              </div>
            </div>
          </div>

          {/* SIGNATURE & LEGAL FOOTER */}
          <div className="border-t border-white/10 print:border-gray-400 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 font-mono text-xs">
            <div className="space-y-1 text-gray-400 print:text-gray-600 max-w-sm text-[10px]">
              <p className="font-bold text-gray-300 print:text-black">Terms & Declarations:</p>
              <p>1. <strong>Confidentiality:</strong> Client identity (Deep Gadhaily) and persona details are strictly confidential.</p>
              <p>2. <strong>Domain Booking:</strong> Domain djcaat.com will be registered immediately upon Milestone 1 payment.</p>
              <p>3. <strong>Intellectual Property:</strong> 100% source code ownership transferred upon final settlement.</p>
            </div>

            <div className="sm:text-right space-y-1">
              <div className="w-36 h-10 border-b border-dashed border-white/30 print:border-gray-500 ml-auto flex items-end justify-center pb-1">
                <span className="font-mono text-[11px] text-cyanAccent print:text-black font-bold">Upesh Bishwakarma</span>
              </div>
              <p className="text-white print:text-black font-bold text-xs">For GORKHAY AI</p>
              <p className="text-[10px] text-cyanAccent print:text-gray-600">Managed by NextGen Learn AI</p>
              <p className="text-[9px] text-gray-400 print:text-gray-500">Authorised Signatory</p>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION LINKS (Hidden in Print) */}
        <div className="print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-gray-400">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>Ready to send to DJ Caat. Print directly to PDF via your browser.</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/plan"
              className="text-gray-400 hover:text-white transition-colors"
            >
              View Admin Plan & Roadmap →
            </Link>
            <a
              href="mailto:collab@djcaat.com?subject=Pro-Forma%20Invoice%20-%20DJ%20CAAT%20Platform%20%26%20Domain&body=Hi%20DJ%20Caat%2C%0A%0APlease%20find%20attached%20the%20pro-forma%20invoice%20for%20the%20DJ%20Caat%20Official%20Platform%20and%20Domain%20Procurement.%0A%0AInvoice%20No%3A%20NGL%2F26-27%2FPI-001%0ATotal%20Payable%20(Milestone%201%20Advance%20%2B%20Domain)%3A%20%E2%82%B961%2C546.40%0A%0ABest%20regards%2C%0AUpesh%20Bishwakarma%0ANexGen%20LearnAI"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition-all flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email DJ Caat</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
