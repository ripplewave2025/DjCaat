"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, CheckCircle2, Globe, Server, ShieldCheck, Lock, User, Eye, EyeOff, Printer, ArrowRight, Sparkles, LogOut, ShieldAlert } from "lucide-react";

export default function AdminPlanPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  const VALID_USERNAME = "DJCaat";
  const VALID_PASSWORD = "DJCaat!@#0070";
  const exchangeRate = 83.4; // 1 USD = ~83.4 INR

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("caat_mgmt_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === VALID_USERNAME && passwordInput === VALID_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem("caat_mgmt_auth", "true");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("caat_mgmt_auth");
    setUsernameInput("");
    setPasswordInput("");
  };

  const formatPrice = (usd: number) => {
    if (currency === "USD") {
      return `$${usd.toFixed(2)}`;
    } else {
      const inr = Math.round(usd * exchangeRate);
      return `₹${inr.toLocaleString("en-IN")}`;
    }
  };

  const invoiceItems = [
    {
      no: "01",
      title: "Custom Next.js Frontend Architecture",
      specs: "High-performance responsive design, dark-mode cyberpunk/phonk aesthetic, dynamic /links smart-bio module replacing Linktree, discography player with streaming integrations.",
      hours: 24,
      amountUsd: 450.0,
    },
    {
      no: "02",
      title: "Interactive WebGL / HTML5 Audio Visualizer Engine",
      specs: "Real-time Web Audio API frequency analysis (FFT 2048), 808 sub-bass reactive pulse, chromatic aberration glitch, 3 render modes (Radial, Oscilloscope, 3D Grid Road), audio file upload and microphone input.",
      hours: 20,
      amountUsd: 400.0,
    },
    {
      no: "03",
      title: "Collab Intake Pipeline & Backend Architecture",
      specs: "Dedicated /collab multi-step submission portal, standardized stem & cloud intake (Google Drive/Dropbox), automatic ticket receipt generation, Supabase / database ready schema.",
      hours: 16,
      amountUsd: 300.0,
    },
    {
      no: "04",
      title: "Digital Sound Store & Sound Kit Delivery",
      specs: "Sound pack & sample kit showcase module, instant checkout flow with automated digital download links, support for Stripe, Lemon Squeezy, and Razorpay.",
      hours: 12,
      amountUsd: 250.0,
    },
    {
      no: "05",
      title: "Artist EPK (Electronic Press Kit) & Media Vault",
      specs: "Verified stats counter (33.3K+ IG followers, 100K+ streams), high-resolution asset download hub, sync licensing and booking management contact routing.",
      hours: 8,
      amountUsd: 150.0,
    },
    {
      no: "06",
      title: "DNS Routing, Cloudflare Business Email & Security",
      specs: "Root domain configuration & Cloudflare SSL integration, custom business email routing (e.g. mgmt@djcaat.com, collab@djcaat.com), Meta/TikTok tracking pixel integration for IG traffic.",
      hours: 4,
      amountUsd: 100.0,
    },
    {
      no: "07",
      title: "Domain Name Acquisition & 1-Year Registration",
      specs: "Direct procurement of official artist domain (djcaat.com / .in) at direct registrar price (₹ 1,081.40), WHOIS privacy protection, and DNS setup.",
      hours: 1,
      amountUsd: 1081.40 / 83.4,
    },
  ];

  const subtotalUsd = invoiceItems.reduce((acc, item) => acc + item.amountUsd, 0);
  const discountUsd = 200.0;
  const totalEstimateUsd = subtotalUsd - discountUsd;

  // -------------------------------------------------------------
  // PRIVATE CREDENTIAL GATE (Owner Only: DJCaat / DJCaat!@#0070)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
        <div className="glass-panel-premium w-full max-w-md p-6 sm:p-8 rounded-2xl border border-cyanAccent/30 shadow-cyan-glow space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-cyanAccent/15 text-cyanAccent flex items-center justify-center mx-auto border border-cyanAccent/30">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyanAccent font-bold block">
              RESTRICTED NODE // OWNER ACCESS ONLY
            </span>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              Project & Commercial Plan
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              Enter verified owner credentials to unlock the commercial proposal, itemized deliverables, and cloud architecture.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 block">Owner Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter Username"
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    setAuthError(false);
                  }}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-void/90 border border-white/15 text-white text-base sm:text-sm font-mono focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 block">Owner Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError(false);
                  }}
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-void/90 border border-white/15 text-white text-base sm:text-sm font-mono focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-crimsonAccent/15 border border-crimsonAccent/30 flex items-center gap-2 text-xs font-mono text-crimsonAccent">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Access Denied: Invalid owner username or password.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black hover:opacity-95 shadow-cyan-glow transition-transform active:scale-95 min-h-[48px] flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4 text-black" />
              <span>Authenticate & Unlock Plan</span>
            </button>
          </form>

          <p className="text-[10px] font-mono text-gray-500">
            Protected by multi-tier credential authentication. Unauthorised access is prohibited.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // UNLOCKED VIEW (Owner Only)
  // -------------------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
            <ShieldCheck className="w-4 h-4" />
            <span>CONFIDENTIAL // ARTIST MANAGEMENT PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
            Project Plan & Commercial Invoice
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Private management portal for Upesh Bishwakarma / DJ Caat.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          {/* Currency Toggle */}
          <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                currency === "USD" ? "bg-cyanAccent text-black shadow-cyan-glow" : "text-gray-400 hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                currency === "INR" ? "bg-cyanAccent text-black shadow-cyan-glow" : "text-gray-400 hover:text-white"
              }`}
            >
              INR (₹)
            </button>
          </div>

          <Link
            href="/invoice"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyanAccent text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-cyan-glow transition-all"
            title="Open Full Pro-Forma Invoice"
          >
            <FileText className="w-4 h-4" />
            <span>Official Invoice</span>
          </Link>

          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
            title="Print / Save PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-crimsonAccent/15 hover:bg-crimsonAccent/25 text-crimsonAccent border border-crimsonAccent/30 transition-colors"
            title="Lock Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PRO-FORMA INVOICE CARD */}
      <div className="glass-panel rounded-2xl border border-white/15 p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyanAccent/5 rounded-full blur-3xl pointer-events-none" />

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-black text-2xl tracking-wider text-white">DJ CAAT PLATFORM</span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-cyanAccent/10 text-cyanAccent border border-cyanAccent/30 rounded">
                CONFIDENTIAL PRO-FORMA
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400">
              INVOICE NO: <strong className="text-white">INV-CAAT-2026-01</strong>
            </p>
            <p className="text-xs font-mono text-gray-400">
              DATE OF ISSUE: <strong className="text-white">September 05, 2026</strong>
            </p>
            <p className="text-xs font-mono text-gray-400">
              PAYMENT TERMS: <strong className="text-white">50% Upfront / 50% On Launch</strong>
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1 font-mono text-xs">
            <span className="text-gray-500 uppercase tracking-widest block text-[10px]">CLIENT DETAILS</span>
            <p className="text-white font-bold text-sm">DJ Caat / Artist Management</p>
            <p className="text-gray-400">Attn: Upesh Bishwakarma</p>
            <p className="text-cyanAccent">Darjeeling, West Bengal / Bangalore, India</p>
          </div>
        </div>

        {/* Itemized Table (Desktop & Print) */}
        <div className="hidden sm:block overflow-x-auto print:block">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-2">No.</th>
                <th className="py-3 px-2">Deliverable & Specifications</th>
                <th className="py-3 px-2 text-center">Hours</th>
                <th className="py-3 px-2 text-right">Amount ({currency})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoiceItems.map((item) => (
                <tr key={item.no} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-2 font-bold text-cyanAccent">{item.no}</td>
                  <td className="py-4 px-2 space-y-1">
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{item.specs}</p>
                  </td>
                  <td className="py-4 px-2 text-center text-gray-300">{item.hours}h</td>
                  <td className="py-4 px-2 text-right font-bold text-white text-sm">
                    {formatPrice(item.amountUsd)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Itemized Cards (Mobile View < sm) */}
        <div className="sm:hidden space-y-3 print:hidden">
          {invoiceItems.map((item) => (
            <div key={item.no} className="p-4 rounded-xl bg-void/80 border border-white/10 space-y-2 text-xs font-mono">
              <div className="flex items-start justify-between gap-2">
                <span className="text-cyanAccent font-bold">#{item.no}</span>
                <span className="font-bold text-white text-right">{formatPrice(item.amountUsd)}</span>
              </div>
              <h4 className="font-bold text-white font-sans text-sm">{item.title}</h4>
              <p className="text-gray-400 font-sans text-xs leading-relaxed">{item.specs}</p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                <span>Estimated Hours:</span>
                <span className="text-cyanAccent">{item.hours}h</span>
              </div>
            </div>
          ))}
        </div>

        {/* Calculation Summary */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1 text-xs font-mono text-gray-400">
            <p>✓ All intellectual property & source code transferred upon final settlement.</p>
            <p>✓ Deployment on zero-cost Vercel & Supabase hobby tier included.</p>
          </div>

          <div className="w-full sm:w-72 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-gray-400">
              <span>SUBTOTAL:</span>
              <span>{formatPrice(subtotalUsd)}</span>
            </div>
            <div className="flex justify-between text-crimsonAccent">
              <span>DISCOUNT (PROMO):</span>
              <span>-{formatPrice(discountUsd)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
              <span className="text-cyanAccent">TOTAL ESTIMATE:</span>
              <span className="text-cyanAccent">{formatPrice(totalEstimateUsd)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PART 1: DOMAIN ACQUISITION STRATEGY */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
            <Globe className="w-4 h-4" />
            <span>Identity & Routing</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase">
            Domain Acquisition & Setup Blueprint
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Priority Domains */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono text-cyanAccent">
              Target Domain Priority
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-void border border-cyanAccent/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white font-mono text-sm block">djcaat.com</span>
                  <span className="text-[10px] text-gray-400 font-mono">Top-tier brand authority (Primary target)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyanAccent text-black uppercase">
                  Rank 1
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-void border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white font-mono text-sm block">djcaatofficial.com</span>
                  <span className="text-[10px] text-gray-400 font-mono">Industry standard fallback</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono text-gray-300 bg-white/10 uppercase">
                  Rank 2
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-void border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white font-mono text-sm block">caatphonk.com / caat.audio</span>
                  <span className="text-[10px] text-gray-400 font-mono">Niche electronic / SEO friendly</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono text-gray-300 bg-white/10 uppercase">
                  Rank 3
                </span>
              </div>
            </div>
          </div>

          {/* Registrar & Email Setup */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono text-purpleAccent">
              Registrar & Business Email
            </h3>
            <div className="space-y-3 text-xs text-gray-300 leading-relaxed font-sans">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-bold text-white block font-mono text-xs">Recommended Registrar:</span>
                <p className="text-gray-400">
                  Buy via <strong>Cloudflare Registrar</strong> or <strong>Porkbun</strong>. They offer wholesale domain registration pricing ($10 - $12/yr) with zero hidden renewal fees and free WHOIS privacy protection.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-bold text-white block font-mono text-xs">Professional Email Routing:</span>
                <p className="text-gray-400">
                  Configure <code className="text-cyanAccent font-mono">mgmt@djcaat.com</code> and <code className="text-purpleAccent font-mono">collab@djcaat.com</code> using <strong>Cloudflare Email Routing</strong> (forwarding directly to management email <code className="text-cyanAccent font-mono">ceo@gorkhayai.com</code>). Immediate credibility when pitching to labels and international collaborators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: ESTIMATED ONGOING RUNTIME COSTS */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-green-400">
            <Server className="w-4 h-4" />
            <span>Zero-Upkeep Architecture</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase">
            Estimated Ongoing Operating Costs
          </h2>
          <p className="text-xs text-gray-400">
            By leveraging edge computing, serverless functions, and free-tier databases, recurring upkeep is virtually non-existent:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase">
                <th className="py-2.5 px-2">Service</th>
                <th className="py-2.5 px-2">Provider</th>
                <th className="py-2.5 px-2">Purpose</th>
                <th className="py-2.5 px-2 text-right">Annual Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 px-2 font-bold text-white">Custom Domain</td>
                <td className="py-3 px-2 text-gray-300">Cloudflare / Porkbun</td>
                <td className="py-3 px-2 text-gray-400 font-sans">djcaat.com registration & DNS</td>
                <td className="py-3 px-2 text-right font-bold text-cyanAccent">$10 – $12 / yr (~₹950)</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-white">Edge Hosting & SSL</td>
                <td className="py-3 px-2 text-gray-300">Vercel (Hobby Tier)</td>
                <td className="py-3 px-2 text-gray-400 font-sans">Global CDN deployment, zero downtime</td>
                <td className="py-3 px-2 text-right font-bold text-green-400">$0.00 / yr</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-white">Database & Auth</td>
                <td className="py-3 px-2 text-gray-300">Supabase (Free Tier)</td>
                <td className="py-3 px-2 text-gray-400 font-sans">Storing collab submissions & leads</td>
                <td className="py-3 px-2 text-right font-bold text-green-400">$0.00 / yr</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-white">Business Email Routing</td>
                <td className="py-3 px-2 text-gray-300">Cloudflare Email</td>
                <td className="py-3 px-2 text-gray-400 font-sans">Forwarding to personal Gmail</td>
                <td className="py-3 px-2 text-right font-bold text-green-400">$0.00 / yr</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-white">Digital Storefront</td>
                <td className="py-3 px-2 text-gray-300">Lemon Squeezy / Stripe</td>
                <td className="py-3 px-2 text-gray-400 font-sans">Digital file delivery & checkout</td>
                <td className="py-3 px-2 text-right font-bold text-gray-300">5% per sale (No monthly fee)</td>
              </tr>
              <tr className="border-t border-white/10 font-bold text-sm">
                <td colSpan={3} className="py-3 px-2 text-white">TOTAL RECURRING ANNUAL COST:</td>
                <td className="py-3 px-2 text-right text-cyanAccent">~$10 – $12 / year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PART 3: IMMEDIATE EXECUTION CHECKLIST */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent">
          LAUNCH TIMELINE & EXECUTION
        </span>
        <h3 className="text-xl font-bold text-white">Immediate 4-Step Rollout Checklist</h3>
        <div className="space-y-3 pt-2 text-xs font-mono">
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center font-bold shrink-0">1</span>
            <div>
              <strong className="text-white block font-sans">Acquire djcaat.com on Porkbun or Cloudflare</strong>
              <span className="text-gray-400 font-sans">Locks down brand authority and enables custom DNS configuration.</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center font-bold shrink-0">2</span>
            <div>
              <strong className="text-white block font-sans">Point DNS to Vercel & Activate mgmt@djcaat.com</strong>
              <span className="text-gray-400 font-sans">Enables automatic SSL, sub-100ms global edge delivery, and incoming email forwarding.</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center font-bold shrink-0">3</span>
            <div>
              <strong className="text-white block font-sans">Deploy Phase 1: Bio Hub (/links) & Collab Intake (/collab)</strong>
              <span className="text-gray-400 font-sans">Place djcaat.com/links directly in DJ Caat's Instagram bio to streamline artist DM inquiries immediately.</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center font-bold shrink-0">4</span>
            <div>
              <strong className="text-white block font-sans">Launch 808 Visualizer & Digital Sound Store</strong>
              <span className="text-gray-400 font-sans">Promote sound packs to 33.3K community and run live music streams via the interactive Web Audio visualizer.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
