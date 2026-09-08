import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Sparkles, Radio, ShoppingBag, ArrowRight, Instagram, Music, Youtube, Download, ExternalLink, ShieldCheck, Flame, Compass, Disc3 } from "lucide-react";
import AudioVisualizer from "@/components/AudioVisualizer";
import DiscographyBrowser from "@/components/DiscographyBrowser";
import { TRACKS, ARTIST_INFO, DISTRO_RELEASES } from "@/lib/tracks";

export default function HomePage() {
  const featuredTrack = TRACKS[0]; // NOITE QUITE or NEPAMORPHOSIS (let's use NEPAMORPHOSIS if present)
  const nepamorphosis = TRACKS.find(t => t.id === "nepamorphosis") || featuredTrack;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-8 sm:pt-16 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow backdrop blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-cyanAccent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-crimsonAccent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-4 sm:space-y-6 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono backdrop-blur-md max-w-full">
            <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse shrink-0" />
            <span className="text-gray-300 truncate">DARJEELING ➔ GLOBAL PHONK</span>
            <span className="text-gray-600 hidden xs:inline">|</span>
            <span className="text-cyanAccent font-bold">33.3K+ COMMUNITY</span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="text-purpleAccent hidden sm:inline">{DISTRO_RELEASES.length} OFFICIAL MASTERS</span>
          </div>

          {/* Headline with mobile scale guard */}
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_35px_rgba(0,240,255,0.3)] break-words">
            DJ CAAT
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xs sm:text-base md:text-lg text-gray-300 font-mono tracking-wide px-2">
            NEPALI & BRAZILIAN PHONK <span className="text-cyanAccent">//</span> HIMALAYAN SOUND ARCHITECT
          </p>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 leading-relaxed px-4">
            Hailing from Darjeeling, India — fusing raw Brazilian favela rhythm with atmospheric Himalayan folk harmonics and distorted 808 drift power.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Link
              href="/visualizer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black hover:opacity-95 shadow-cyan-glow flex items-center justify-center space-x-2 transition-transform active:scale-95 min-h-[44px]"
            >
              <Radio className="w-4 h-4 text-black" />
              <span>Launch 808 Visualizer</span>
            </Link>

            <Link
              href="/collab"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyanAccent/40 flex items-center justify-center space-x-2 transition-all min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-cyanAccent" />
              <span>Submit Collaboration</span>
            </Link>

            <a
              href={ARTIST_INFO.spotify}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-medium text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center space-x-2 transition-all min-h-[44px]"
            >
              <Music className="w-4 h-4 text-green-400" />
              <span>Spotify Profile</span>
            </a>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16">
          <div className="glass-panel-premium p-4 sm:p-5 rounded-2xl border border-white/10 space-y-1 text-center">
            <span className="text-xl sm:text-3xl font-black font-mono text-cyanAccent">33.3K+</span>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase text-gray-400">Instagram Followers</p>
          </div>
          <div className="glass-panel-premium p-4 sm:p-5 rounded-2xl border border-white/10 space-y-1 text-center">
            <span className="text-xl sm:text-3xl font-black font-mono text-purpleAccent">100K+</span>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase text-gray-400">Monthly Streams</p>
          </div>
          <div className="glass-panel-premium p-4 sm:p-5 rounded-2xl border border-white/10 space-y-1 text-center">
            <span className="text-xl sm:text-3xl font-black font-mono text-crimsonAccent">{DISTRO_RELEASES.length}</span>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase text-gray-400">Official Master Releases</p>
          </div>
          <div className="glass-panel-premium p-4 sm:p-5 rounded-2xl border border-white/10 space-y-1 text-center">
            <span className="text-xl sm:text-3xl font-black font-mono text-white">DARJEELING</span>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase text-gray-400">Himalayan Base</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE WEB AUDIO VISUALIZER */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
            <Radio className="w-4 h-4" />
            <span>Interactive Web Audio DSP Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
            Real-Time 808 Phonk Visualizer
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Powered by the HTML5 Web Audio API and 2048-band FFT frequency analysis. Select any DJ Caat master or upload your stems to test sub-bass reactions, radial rings, and 3D drift grids.
          </p>
        </div>

        {/* Embedded Interactive Visualizer */}
        <AudioVisualizer initialTrackIndex={8} />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FULL DISTRO CATALOG BROWSER (FROM CSV) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
              <Disc3 className="w-4 h-4 text-cyanAccent" />
              <span>Official Distribution Catalog ({DISTRO_RELEASES.length} Masters)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
              The Himalayan Phonk Discography
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Ingested from official distribution registries. Explore slowed, drift, and instrumental edits with verified ISRC codes.
            </p>
          </div>
          <Link
            href="/epk"
            className="text-xs font-mono text-cyanAccent hover:underline flex items-center space-x-1 shrink-0"
          >
            <span>Verified Press Kit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Interactive Discography Browser Component */}
        <DiscographyBrowser />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* COLLAB MACHINE INTAKE BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-premium rounded-2xl border border-cyanAccent/30 p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyanAccent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyanAccent">
                <Sparkles className="w-4 h-4" />
                <span>Producer Intake Machine</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
                Got Vocal Stems or Capelas?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                Bypass fragmented Instagram DMs. DJ Caat reviews artist collaborations through our standardized intake pipeline. Submit your vocals, cloud drive links, and split proposals for fast review.
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono text-gray-400 pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-cyanAccent" />
                  <span>Direct Producer Review</span>
                </span>
                <span>•</span>
                <span>Nepali & Brazilian Phonk</span>
                <span>•</span>
                <span>50/50 Split or Work-For-Hire</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-3">
              <Link
                href="/collab"
                className="w-full py-3.5 sm:py-4 text-center rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black shadow-cyan-glow hover:opacity-95 transition-transform active:scale-95 min-h-[44px] flex items-center justify-center"
              >
                Open Collab Form
              </Link>
              <Link
                href="/links"
                className="w-full py-3 text-center rounded-xl font-mono text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Mobile Instagram Bio Hub (/links)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
