"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Play, Pause, Download, Check, Sparkles, Shield, Disc, ArrowRight } from "lucide-react";

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
      "Himalayan acoustic folk instruments resampled through vintage Roland SP-404",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
              currency === "USD" ? "bg-cyanAccent text-black shadow-cyan-glow" : "text-gray-400 hover:text-white"
            }`}
          >
            USD ($)
          </button>
          <button
            onClick={() => setCurrency("INR")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
              currency === "INR" ? "bg-cyanAccent text-black shadow-cyan-glow" : "text-gray-400 hover:text-white"
            }`}
          >
            INR (₹)
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SOUND_PACKS.map((pack) => (
          <div
            key={pack.id}
            className="glass-panel glass-panel-hover rounded-2xl border border-white/10 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-5">
              {/* Product Header & Art */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-36 h-36 rounded-xl relative overflow-hidden shrink-0 border border-white/10 shadow-lg">
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
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyanAccent text-black flex items-center justify-center shadow-cyan-glow hover:scale-110 transition-transform"
                    title="Audio Preview"
                  >
                    {playingPackId === pack.id ? (
                      <Pause className="w-5 h-5 fill-black" />
                    ) : (
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="space-y-2 flex-1">
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

                  <h3 className="text-xl font-black text-white tracking-wide">{pack.title}</h3>
                  <p className="text-xs text-gray-400">{pack.subtitle}</p>

                  <div className="text-xl font-mono font-black text-cyanAccent pt-1">
                    {currency === "USD" ? `$${pack.priceUsd}` : `₹${pack.priceInr}`}
                    <span className="text-[10px] text-gray-400 font-normal ml-2">Instant Digital Download</span>
                  </div>
                </div>
              </div>

              {/* Specs Box */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-void/60 border border-white/5 text-[11px] font-mono">
                <div>
                  <span className="text-gray-500 block">FORMAT</span>
                  <span className="text-gray-200">{pack.specs.format}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">FILE SIZE</span>
                  <span className="text-gray-200">{pack.specs.size}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">COUNT</span>
                  <span className="text-gray-200">{pack.specs.sampleCount}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">DAW</span>
                  <span className="text-gray-200">{pack.specs.daw}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                  Included in this kit:
                </span>
                <ul className="space-y-1 text-xs text-gray-300">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-cyanAccent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
              <button
                onClick={() => togglePreview(pack.id)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center space-x-2 transition-colors"
              >
                {playingPackId === pack.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{playingPackId === pack.id ? "Pause Preview" : "Audio Preview"}</span>
              </button>

              <button
                onClick={() => {
                  setActiveCheckoutPack(pack);
                  setCheckoutStep("details");
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent to-purpleAccent text-black hover:opacity-95 shadow-cyan-glow flex items-center space-x-2 transition-transform active:scale-95"
              >
                <Download className="w-4 h-4 text-black" />
                <span>Get Pack</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <Shield className="w-6 h-6 text-cyanAccent mx-auto" />
          <h4 className="text-sm font-bold text-white uppercase">100% Royalty Free</h4>
          <p className="text-xs text-gray-400">Use in your beats, Spotify releases, YouTube videos, and games with zero extra fees.</p>
        </div>
        <div className="space-y-2">
          <Sparkles className="w-6 h-6 text-purpleAccent mx-auto" />
          <h4 className="text-sm font-bold text-white uppercase">Instant Cloud Delivery</h4>
          <p className="text-xs text-gray-400">High-speed download link delivered immediately to your email and on-screen upon purchase.</p>
        </div>
        <div className="space-y-2">
          <Disc className="w-6 h-6 text-crimsonAccent mx-auto" />
          <h4 className="text-sm font-bold text-white uppercase">Engineered by DJ Caat</h4>
          <p className="text-xs text-gray-400">Authentic sound fonts, 808s, and Himalayan harmonics crafted in Darjeeling studio sessions.</p>
        </div>
      </div>

      {/* CHECKOUT SIMULATOR MODAL */}
      {activeCheckoutPack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border border-cyanAccent/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveCheckoutPack(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-mono"
            >
              ✕
            </button>

            {checkoutStep === "details" ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyanAccent uppercase tracking-widest">
                    SECURE DIGITAL CHECKOUT
                  </span>
                  <h3 className="text-2xl font-black text-white">{activeCheckoutPack.title}</h3>
                  <p className="text-xs text-gray-400">{activeCheckoutPack.specs.sampleCount}</p>
                </div>

                <div className="p-4 rounded-xl bg-void/80 border border-white/5 flex items-center justify-between font-mono">
                  <span className="text-xs text-gray-400">TOTAL DUE:</span>
                  <span className="text-xl font-bold text-cyanAccent">
                    {currency === "USD" ? `$${activeCheckoutPack.priceUsd}.00 USD` : `₹${activeCheckoutPack.priceInr} INR`}
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300">
                    Your Delivery Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="producer@studio.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-void border border-white/10 text-white text-sm focus:border-cyanAccent focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Instant lossless ZIP download link will be dispatched to this email.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black hover:opacity-95 shadow-cyan-glow transition-transform active:scale-98"
                  >
                    Confirm Order & Unlock Download
                  </button>
                </div>

                <div className="text-center text-[10px] font-mono text-gray-500 flex items-center justify-center space-x-2">
                  <span>Secured via Stripe / Lemon Squeezy / Razorpay Architecture</span>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center mx-auto border border-cyanAccent/40">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white uppercase">Download Ready!</h3>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">
                    Your download link has been prepared and dispatched to <strong className="text-cyanAccent">{buyerEmail}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-void/80 border border-white/5 space-y-2 text-left text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Item:</span>
                    <span className="text-white">{activeCheckoutPack.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Format:</span>
                    <span className="text-cyanAccent">{activeCheckoutPack.specs.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">License:</span>
                    <span className="text-green-400">Commercial Royalty-Free</span>
                  </div>
                </div>

                <a
                  href="/audio/yoi-yoi.wav"
                  download="dj-caat-sample-pack-demo.wav"
                  className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyanAccent text-black shadow-cyan-glow hover:opacity-95"
                >
                  <Download className="w-4 h-4 fill-black" />
                  <span>Download Master Pack (.ZIP)</span>
                </a>

                <div>
                  <button
                    onClick={() => setActiveCheckoutPack(null)}
                    className="text-xs font-mono text-gray-400 hover:text-white"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
