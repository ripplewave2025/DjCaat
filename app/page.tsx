import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Sparkles, Radio, ShoppingBag, ArrowRight, Instagram, Music, Youtube, Download, ExternalLink, ShieldCheck, Flame, Compass } from "lucide-react";
import AudioVisualizer from "@/components/AudioVisualizer";
import { TRACKS, ARTIST_INFO } from "@/lib/tracks";

export default function HomePage() {
  const featuredTrack = TRACKS[0]; // NEPAMORPHOSIS

  return (
    <div className="space-y-24 pb-20">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow backdrop blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyanAccent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-crimsonAccent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-6 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse" />
            <span className="text-gray-300">DARJEELING ➔ GLOBAL PHONK</span>
            <span className="text-gray-600">|</span>
            <span className="text-cyanAccent font-bold">33.3K+ COMMUNITY</span>
            <span className="text-gray-600">|</span>
            <span className="text-purpleAccent">IN THE VAULT</span>
          </div>

          {/* Glitched Main Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
            DJ CAAT
          </h1>

          {/* Subtitle with Nepali & Brazilian Phonk positioning */}
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-gray-300 font-mono tracking-wide">
            NEPALI & BRAZILIAN PHONK <span className="text-cyanAccent">//</span> HIMALAYAN SOUND ARCHITECT
          </p>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 leading-relaxed">
            Hailing from Darjeeling, India — infusing raw Brazilian favela rhythm with atmospheric Himalayan folk harmonics and distorted 808 drift power.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/visualizer"
              className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black hover:opacity-95 shadow-cyan-glow flex items-center space-x-2 transition-transform active:scale-95"
            >
              <Radio className="w-4 h-4 text-black" />
              <span>Launch 808 Visualizer</span>
            </Link>

            <Link
              href="/collab"
              className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyanAccent/40 flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyanAccent" />
              <span>Submit Collaboration</span>
            </Link>

            <a
              href={ARTIST_INFO.spotify}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-xl font-medium text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 flex items-center space-x-2 transition-all"
            >
              <Music className="w-4 h-4 text-green-400" />
              <span>Spotify Profile</span>
            </a>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1 text-center">
            <span className="text-2xl sm:text-3xl font-black font-mono text-cyanAccent">33.3K+</span>
            <p className="text-[11px] font-mono uppercase text-gray-400">Instagram Followers</p>
          </div>
          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1 text-center">
            <span className="text-2xl sm:text-3xl font-black font-mono text-purpleAccent">100K+</span>
            <p className="text-[11px] font-mono uppercase text-gray-400">Monthly Streams</p>
          </div>
          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1 text-center">
            <span className="text-2xl sm:text-3xl font-black font-mono text-crimsonAccent">50+</span>
            <p className="text-[11px] font-mono uppercase text-gray-400">Stems & Masters Vaulted</p>
          </div>
          <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1 text-center">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">DARJEELING</span>
            <p className="text-[11px] font-mono uppercase text-gray-400">Himalayan Base</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURED RELEASE & SPOTLIGHT */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
              <Flame className="w-4 h-4 text-crimsonAccent" />
              <span>Signature Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
              Latest Master Catalog
            </h2>
          </div>
          <Link
            href="/visualizer"
            className="text-xs font-mono text-cyanAccent hover:underline flex items-center space-x-1"
          >
            <span>Play in Visualizer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Featured Big Card */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purpleAccent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Cover Art */}
          <div className="md:col-span-5 relative group">
            <div className="aspect-square rounded-xl overflow-hidden border border-white/10 relative shadow-2xl">
              <Image
                src={featuredTrack.coverImage}
                alt={featuredTrack.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-cyanAccent text-black rounded uppercase">
                  {featuredTrack.subgenre}
                </span>
                <span className="text-xs font-mono text-gray-300">
                  {featuredTrack.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Track Details & Streaming Action */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-purpleAccent tracking-wider uppercase">
                  {featuredTrack.origin} • {featuredTrack.releaseYear}
                </span>
                <span className="text-xs font-mono text-gray-500">•</span>
                <span className="text-xs font-mono text-gray-400">
                  {featuredTrack.bpm} BPM // {featuredTrack.key}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-wide">
                {featuredTrack.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {featuredTrack.description}
              </p>
            </div>

            {/* Streaming Links Grid */}
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
                Stream on Official Channels:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href={ARTIST_INFO.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-green-500/15 border border-white/5 hover:border-green-500/30 flex items-center space-x-2.5 transition-all text-xs text-gray-200 hover:text-green-400"
                >
                  <Music className="w-4 h-4 text-green-400" />
                  <span className="font-medium">Spotify</span>
                </a>
                <a
                  href={ARTIST_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-pink-500/15 border border-white/5 hover:border-pink-500/30 flex items-center space-x-2.5 transition-all text-xs text-gray-200 hover:text-pink-400"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span className="font-medium">Instagram</span>
                </a>
                <a
                  href={ARTIST_INFO.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/5 hover:border-red-500/30 flex items-center space-x-2.5 transition-all text-xs text-gray-200 hover:text-red-400"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span className="font-medium">YouTube</span>
                </a>
                <a
                  href={ARTIST_INFO.soundcloud}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-orange-500/15 border border-white/5 hover:border-orange-500/30 flex items-center space-x-2.5 transition-all text-xs text-gray-200 hover:text-orange-400"
                >
                  <span className="font-bold text-orange-400 text-xs">SC</span>
                  <span className="font-medium">SoundCloud</span>
                </a>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-2 flex items-center space-x-4">
              <Link
                href="/visualizer"
                className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyanAccent text-black hover:opacity-90 shadow-cyan-glow flex items-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Test in 808 Visualizer</span>
              </Link>
              <Link
                href="/collab"
                className="text-xs font-mono text-gray-400 hover:text-white flex items-center space-x-1"
              >
                <span>Request Remix License</span>
                <ArrowRight className="w-3 h-3 text-cyanAccent" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE WEB AUDIO VISUALIZER PREVIEW */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
            <Radio className="w-4 h-4" />
            <span>Interactive Web Audio Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
            Real-Time 808 Phonk Visualizer
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Powered by the HTML5 Web Audio API and 2048-band FFT frequency analysis. Select any DJ Caat track or upload your own stems to test sub-bass reactions, radial rings, and chromatic glitch.
          </p>
        </div>

        {/* Embedded Interactive Visualizer */}
        <AudioVisualizer initialTrackIndex={0} />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PRODUCER VAULT & BEAT TAPE GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-purpleAccent">
              Underground Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
              The Himalayan Phonk Vault
            </h2>
          </div>
          <Link
            href="/store"
            className="text-xs font-mono text-purpleAccent hover:underline flex items-center space-x-1"
          >
            <span>Get Sample Packs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRACKS.slice(1, 4).map((track) => (
            <div
              key={track.id}
              className="glass-panel glass-panel-hover rounded-2xl border border-white/10 p-5 space-y-4 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-white/5">
                  <Image
                    src={track.coverImage}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-black/80 text-cyanAccent border border-cyanAccent/40">
                    {track.subgenre}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span>{track.origin}</span>
                    <span>{track.bpm} BPM • {track.key}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{track.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {track.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <Link
                  href="/visualizer"
                  className="text-xs font-mono font-bold text-cyanAccent hover:underline flex items-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-cyanAccent" />
                  <span>Preview Stem</span>
                </Link>
                <a
                  href={track.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-400 hover:text-white flex items-center space-x-1"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* COLLAB MACHINE INTAKE BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl border border-cyanAccent/20 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyanAccent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyanAccent">
                <Sparkles className="w-4 h-4" />
                <span>Producer Intake Machine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
                Got Vocal Stems or Capelas?
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                Tired of chaotic Instagram DMs? DJ Caat reviews artist collaborations through our standardized intake pipeline. Submit your vocals, cloud drive links, and split proposals for fast review.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 pt-2">
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
                className="w-full py-4 text-center rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black shadow-cyan-glow hover:opacity-95 transition-transform active:scale-95"
              >
                Open Collab Form
              </Link>
              <Link
                href="/links"
                className="w-full py-3 text-center rounded-xl font-mono text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
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
