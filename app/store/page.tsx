"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Play, Pause, Download, Check, Sparkles, Shield, Disc, ArrowRight, X, Lock } from "lucide-react";

interface SoundPack {
  id: string;
  title: string;
  subtitle: string;
  priceUsd: number;
  priceInr: number;
  coverImage: string;
  tags: string[];
  specs: {
    format: string;
    sampleCount: string;
    size: string;
    daw: string;
  };
  features: string[];
  audioPreview: string;
}

const SOUND_PACKS: SoundPack[] = [
  {
    id: "808-vault-vol1",
    title: "808 DISTORTION VAULT VOL. 1",
    subtitle: "Heavy Saturated Bass Slides & Sub Transients",
    priceUsd: 19,
    priceInr: 1599,
    coverImage: "/images/nepamorphosis.jpg",
    tags: ["808 Slides", "Brazilian Phonk", "Sub-Bass"],
    specs: {
      format: "24-Bit / 44.1kHz WAV",
      sampleCount: "120+ 808 Bass One-Shots & Tuned Loops",
      size: "450 MB",
      daw: "All DAWs (FL Studio, Ableton, Logic)",
    },
    features: [
      "Custom analog distortion curve tuned by DJ Caat",
      "Key-labeled from C1 to B1 for instant drag-and-drop",
      "Raw analog tape warmth for maximum club pressure",
      "Bonus 20 tuned drift glide patterns (MIDI)"
    ],
    audioPreview: "/audio/yoi-yoi.wav"
  },
  {
    id: "nepali-phonk-essentials",
    title: "HIMALAYAN DRIFT // NEPALI PHONK SUITE",
    subtitle: "Authentic Darjeeling Strings, Chants & 808s",
    priceUsd: 22,
    priceInr: 1799,
    coverImage: "/images/timro-yaad-ma.png",
    tags: ["Nepali Phonk", "Himalayan Strings", "Vocal Chops"],
    specs: {
      format: "24-Bit Lossless WAV + MIDI",
      sampleCount: "160+ Melody Chops, Sarangi Textures & Stems",
      size: "680 MB",
      daw: "Universal Audio & MIDI Compatible",
    },
    features: [
      "Signature melodies straight from NEPAMORPHOSIS & TIMRO YAAD MA",
      "Himalayan folk instruments resampled through vintage Roland SP-404",
      "Aggressive drift percussion loops & stutter fills",
      "Pre-cleared 100% royalty-free for commercial release"
    ],
    audioPreview: "/audio/timro-yaad-ma.wav"
  },
  {
    id: "memphis-cowbell-kit",
    title: "MEMPHIS ACAPELLA & COWBELL KIT",
    subtitle: "Tuned Phonk Cowbells & Vintage Chops",
    priceUsd: 15,
    priceInr: 1249,
    coverImage: "/images/gen-z-funk.jpg",
    tags: ["Cowbells", "Acapellas", "Memphis Chops"],
    specs: {
      format: "24-Bit WAV + Soundfont (.sf2)",
      sampleCount: "95+ Multi-velocity Tuned Cowbells & Cuts",
      size: "320 MB",
      daw: "Compatible with any Sampler",
    },
    features: [
      "12 custom cowbell soundfonts tuned for fast arpeggios",
      "Rare underground Memphis rap vocal cuts (chopped & pitched)",
      "Dirty cassette tape saturation textures",
      "Attack & decay envelopes pre-tailored for Phonk mixes"
    ],
    audioPreview: "/audio/yoi-yoi.wav"
  },
  {
    id: "fl-studio-mixer-presets",
    title: "FL STUDIO MASTER PHONK PRESETS",
    subtitle: "Caat's Secret Mixer Racks & Mastering Chains",
    priceUsd: 25,
    priceInr: 2099,
    coverImage: "/images/nepamorphosis.jpg",
    tags: ["FL Studio", "Mixer Presets", "Mastering"],
    specs: {
      format: ".fst Mixer Presets + Template .flp",
      sampleCount: "18 Master Racks & Sub-Bass Chains",
      size: "85 MB",
      daw: "FL Studio 20 / 21 / 24+",
    },
    features: [
      "DJ Caat's main bus clipping & distortion routing",
      "Parallel sidechain punch for kicks cutting through dense 808s",
      "Vocal spatial widening chain (reverb & slap delay)",
      "Complete master bus mastering rack ready for streaming"
    ],
    audioPreview: "/audio/timro-yaad-ma.wav"
  }
];

export default function StorePage() {
  const [playingPackId, setPlayingPackId] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [activeCheckoutPack, setActiveCheckoutPack] = useState<SoundPack | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "success">("details");
  const [buyerEmail, setBuyerEmail] = useState("");

  const togglePreview = (packId: string) => {
    if (playingPackId === packId) {
      setPlayingPackId(null);
    } else {
      setPlayingPackId(packId);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail.trim()) return;
    setCheckoutStep("success");
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
                onClick={() => {
                  setActiveCheckoutPack(pack);
                  setCheckoutStep("details");
                }}
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
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-void/60 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">Total Payable:</span>
                  <span className="text-base font-bold text-cyanAccent">
                    {currency === "USD" ? `$${activeCheckoutPack.priceUsd}` : `₹${activeCheckoutPack.priceInr}`}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300 block">
                    Your Email (For Instant Download Link) <span className="text-crimsonAccent">*</span>
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    required
                    placeholder="producer@example.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-void border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black shadow-cyan-glow hover:opacity-95 transition-transform active:scale-95 min-h-[48px] flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Instant Download</span>
                  </button>
                  <p className="text-[10px] font-mono text-gray-500 text-center">
                    Simulated fast checkout. In production, this connects to Stripe, LemonSqueezy, or Razorpay.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/30">
                  <Check className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-white uppercase">Vault Access Granted!</h4>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">
                    A direct download link for <strong>{activeCheckoutPack.title}</strong> has been sent to <strong className="text-cyanAccent">{buyerEmail}</strong>.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href={activeCheckoutPack.audioPreview}
                    download
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyanAccent text-black shadow-cyan-glow flex items-center justify-center space-x-2 min-h-[48px]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Sample Pack Now</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
