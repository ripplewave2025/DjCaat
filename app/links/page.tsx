import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Sparkles, Radio, ShoppingBag, Instagram, Youtube, ExternalLink, ShieldCheck, MapPin, CheckCircle2, FileText } from "lucide-react";
import { ARTIST_INFO, TRACKS } from "@/lib/tracks";

export default function LinksPage() {
  const latestTrack = TRACKS[0]; // NEPAMORPHOSIS

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start py-8 px-4 max-w-md mx-auto space-y-6">
      {/* Profile Header */}
      <div className="text-center space-y-3 relative">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-cyanAccent via-purpleAccent to-crimsonAccent shadow-cyan-glow mx-auto">
            <div className="w-full h-full rounded-full overflow-relative relative bg-void border-2 border-void overflow-hidden">
              <Image
                src="/images/nepamorphosis.jpg"
                alt="DJ Caat"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="absolute bottom-1 right-1 bg-cyanAccent text-black p-1 rounded-full shadow-md" title="Verified Producer">
            <CheckCircle2 className="w-4 h-4 fill-black text-cyanAccent" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center space-x-1.5">
            <h1 className="text-2xl font-black tracking-wide text-white">DJ CAAT</h1>
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-cyanAccent/10 text-cyanAccent border border-cyanAccent/30 rounded">
              DARJEELING
            </span>
          </div>
          <p className="text-xs font-mono text-cyanAccent mt-0.5">
            {ARTIST_INFO.instagramHandle}
          </p>
          <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto">
            Nepali Phonk & Brazilian Phonk Producer • 33.3K+ Underground Community
          </p>
        </div>
      </div>

      {/* Verified Notice Card for Instagram DMs */}
      <div className="w-full p-3.5 rounded-xl bg-crimsonAccent/10 border border-crimsonAccent/30 backdrop-blur-md space-y-1">
        <div className="flex items-center space-x-1.5 text-crimsonAccent text-xs font-bold font-mono uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Producer Notice</span>
        </div>
        <p className="text-[11px] text-gray-300 leading-relaxed">
          Instagram DMs are currently managed by team while Caat is in academic sessions. For all serious collabs, vocal stems, or beat licensing, use the <strong className="text-white">Collab Portal</strong> below.
        </p>
      </div>

      {/* Main Action Links Stack */}
      <div className="w-full space-y-3">
        {/* 1. Latest Release Card */}
        <a
          href={ARTIST_INFO.spotify}
          target="_blank"
          rel="noreferrer"
          className="w-full p-4 rounded-xl glass-panel glass-panel-hover border border-cyanAccent/40 flex items-center justify-between group shadow-cyan-glow"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
              <Music className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-cyanAccent uppercase font-bold tracking-wider block">
                🔥 LATEST MASTER RELEASE
              </span>
              <span className="text-sm font-bold text-white group-hover:text-cyanAccent transition-colors">
                {latestTrack.title} ({latestTrack.subgenre})
              </span>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyanAccent transition-colors" />
        </a>

        {/* 2. Collaborate Portal */}
        <Link
          href="/collab"
          className="w-full p-4 rounded-xl glass-panel glass-panel-hover border border-purpleAccent/40 flex items-center justify-between group shadow-purple-glow"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-purpleAccent/20 text-purpleAccent flex items-center justify-center border border-purpleAccent/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-purpleAccent uppercase font-bold tracking-wider block">
                PRODUCER & VOCALIST INTAKE
              </span>
              <span className="text-sm font-bold text-white group-hover:text-purpleAccent transition-colors">
                Drop Stems & Collab With DJ Caat
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-purpleAccent font-bold">PORTAL →</span>
        </Link>

        {/* 3. Live 808 Visualizer */}
        <Link
          href="/visualizer"
          className="w-full p-4 rounded-xl glass-panel glass-panel-hover border border-white/10 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-cyanAccent/15 text-cyanAccent flex items-center justify-center border border-cyanAccent/30">
              <Radio className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-cyanAccent uppercase font-bold tracking-wider block">
                BROWSER AUDIO ENGINE
              </span>
              <span className="text-sm font-bold text-white group-hover:text-cyanAccent transition-colors">
                Live 808 Phonk Visualizer
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-cyanAccent">PLAY →</span>
        </Link>

        {/* 4. Sound Store */}
        <Link
          href="/store"
          className="w-full p-4 rounded-xl glass-panel glass-panel-hover border border-white/10 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-crimsonAccent/15 text-crimsonAccent flex items-center justify-center border border-crimsonAccent/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-crimsonAccent uppercase font-bold tracking-wider block">
                FOR PRODUCERS
              </span>
              <span className="text-sm font-bold text-white group-hover:text-crimsonAccent transition-colors">
                808 Bass Kits & Cowbell Soundfonts
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-crimsonAccent">VAULT →</span>
        </Link>

        {/* 5. EPK */}
        <Link
          href="/epk"
          className="w-full p-4 rounded-xl glass-panel glass-panel-hover border border-white/10 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-white/5 text-gray-300 flex items-center justify-center border border-white/10">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block">
                PRESS & BOOKINGS
              </span>
              <span className="text-sm font-bold text-white group-hover:text-white transition-colors">
                Electronic Press Kit & Brand Assets
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-gray-400">EPK →</span>
        </Link>
      </div>

      {/* Social Footnote */}
      <div className="w-full pt-4 flex items-center justify-center space-x-4 border-t border-white/10">
        <a
          href={ARTIST_INFO.instagram}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-lg bg-white/5 hover:bg-pink-500/20 text-gray-400 hover:text-pink-400 transition-colors border border-white/5"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href={ARTIST_INFO.spotify}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-lg bg-white/5 hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors border border-white/5"
          aria-label="Spotify"
        >
          <Music className="w-5 h-5" />
        </a>
        <a
          href={ARTIST_INFO.youtube}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors border border-white/5"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5" />
        </a>
      </div>

      <div className="text-center space-y-1">
        <p className="text-[10px] font-mono text-gray-500">
          Powered by DJ Caat Official Architecture • Darjeeling, India
        </p>
        <p className="text-[10px] font-mono text-gray-400">
          Managed & Engineered by{" "}
          <a
            href={ARTIST_INFO.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="text-cyanAccent hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>Upesh Bishwakarma</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </p>
      </div>
    </div>
  );
}
