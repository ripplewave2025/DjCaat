"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Sparkles, Radio, ShoppingBag, Instagram, Youtube, ExternalLink, ShieldCheck, MapPin, FileText, Share2, Play, Pause, Disc3, ArrowUpRight } from "lucide-react";
import { ARTIST_INFO, TRACKS } from "@/lib/tracks";
import TwitterVerifiedBadge from "@/components/TwitterVerifiedBadge";

export default function LinksPage() {
  const latestTrack = TRACKS[0]; // NOITE QUITE or NEPAMORPHOSIS
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "DJ CAAT // Official Nepali & Brazilian Phonk Hub",
          text: "Official Instagram, YouTube, Twitter/X, Spotify, 808 Visualizer, and Collab Intake for DJ Caat.",
          url: window.location.href,
        });
      } catch {
        // Ignored if cancelled
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start py-8 px-4 max-w-md mx-auto space-y-5 pb-32">
      {/* Hidden audio element for instant preview */}
      <audio
        ref={audioRef}
        src={latestTrack.audioSrc}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Profile Header */}
      <div className="text-center space-y-3 relative w-full">
        {/* Top Share Action */}
        <div className="flex justify-end w-full">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyanAccent transition-colors border border-white/10 flex items-center gap-1.5 text-xs font-mono"
            aria-label="Share profile"
          >
            <Share2 className="w-3.5 h-3.5 text-cyanAccent" />
            <span>Share</span>
          </button>
        </div>

        {/* Profile Avatar with Orange Outside & Twitter Grey Tick */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-orange-500 via-amber-400 to-orange-600 shadow-[0_0_24px_rgba(249,115,22,0.45)] mx-auto">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-void border-2 border-void">
              <Image
                src="/images/nepamorphosis.jpg"
                alt="DJ Caat"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* Twitter Verified Tick with Grey inside and Orange outside */}
          <div className="absolute -bottom-1 -right-1" title="Verified Artist // DJ Caat">
            <TwitterVerifiedBadge size={28} />
          </div>
        </div>

        {/* Bio Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-2xl font-black tracking-wide text-white">DJ CAAT</h1>
            {/* Twitter verified badge next to name */}
            <TwitterVerifiedBadge size={20} />
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-orange-500/15 text-orange-400 border border-orange-500/40 rounded">
              DARJEELING
            </span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-xs font-mono pt-0.5">
            <span className="text-pink-400 font-bold">{ARTIST_INFO.instagramHandle}</span>
            <span className="text-gray-600">•</span>
            <span className="text-orange-400 font-bold">{ARTIST_INFO.twitterHandle}</span>
          </div>

          <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto">
            Nepali Phonk & Brazilian Phonk Architect • 33.3K+ Global Community
          </p>

          {/* Twitter Verified Badge Under Bio */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-void/90 border border-orange-500/40 text-[11px] font-mono text-gray-300 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <TwitterVerifiedBadge size={16} />
              <span className="text-white font-bold">Official Verified Master Artist</span>
              <span className="text-orange-400">• Darjeeling</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Notice Card for Instagram DMs */}
      <div className="w-full p-3.5 rounded-2xl bg-crimsonAccent/10 border border-crimsonAccent/30 backdrop-blur-md space-y-1 shadow-crimson-glow">
        <div className="flex items-center space-x-1.5 text-crimsonAccent text-xs font-bold font-mono uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Artist Notice</span>
        </div>
        <p className="text-[11px] text-gray-300 leading-relaxed">
          Instagram DMs are managed by team during academic sessions. For serious stem drops or beat licensing, submit directly through the <strong className="text-white">Collab Portal</strong> below.
        </p>
      </div>

      {/* Main Action Links Stack */}
      <div className="w-full space-y-3">
        {/* 1. LATEST MASTER RELEASE CARD (With Instant Preview Player) */}
        <div className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-cyanAccent/40 flex items-center justify-between group shadow-cyan-glow">
          <a
            href={ARTIST_INFO.spotify}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-3.5 flex-1 min-w-0"
          >
            <div className="w-11 h-11 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30 shrink-0">
              <Music className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-cyanAccent uppercase font-bold tracking-wider block truncate">
                🔥 LATEST MASTER RELEASE
              </span>
              <span className="text-sm font-bold text-white group-hover:text-cyanAccent transition-colors truncate block">
                {latestTrack.title} ({latestTrack.subgenre})
              </span>
            </div>
          </a>

          {/* Inline Play Preview Button */}
          <button
            onClick={toggleAudio}
            className="p-2.5 rounded-xl bg-cyanAccent text-black hover:opacity-90 shadow-cyan-glow transition-all active:scale-90 shrink-0 ml-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
            title={isPlaying ? "Pause Preview" : "Play Stem Preview"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
          </button>
        </div>

        {/* 2. INSTAGRAM OFFICIAL HUB (Featured Prominently) */}
        <a
          href={ARTIST_INFO.instagram}
          target="_blank"
          rel="noreferrer"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-pink-500/40 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-pink-400/70 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-yellow-500/20 via-pink-500/20 to-purple-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30 shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-pink-400 uppercase font-bold tracking-wider block truncate">
                INSTAGRAM // 33.3K+ COMMUNITY
              </span>
              <span className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors truncate block">
                Follow @d.g_dj_caat_
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-pink-400 font-bold shrink-0 ml-2 flex items-center gap-0.5">
            FOLLOW <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* 3. YOUTUBE OFFICIAL CHANNEL (Featured Prominently) */}
        <a
          href={ARTIST_INFO.youtube}
          target="_blank"
          rel="noreferrer"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-red-500/40 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-red-400/70 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30 shrink-0">
              <Youtube className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-red-400 uppercase font-bold tracking-wider block truncate">
                YOUTUBE // VISUALS & MUSIC VIDEOS
              </span>
              <span className="text-sm font-bold text-white group-hover:text-red-300 transition-colors truncate block">
                Subscribe @d.g_dj_caat
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-red-400 font-bold shrink-0 ml-2 flex items-center gap-0.5">
            WATCH <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* 4. SPOTIFY ARTIST PROFILE */}
        <a
          href={ARTIST_INFO.spotify}
          target="_blank"
          rel="noreferrer"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-green-500/40 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-green-400/70 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30 shrink-0">
              <Music className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-green-400 uppercase font-bold tracking-wider block truncate">
                SPOTIFY // OFFICIAL ARTIST
              </span>
              <span className="text-sm font-bold text-white group-hover:text-green-300 transition-colors truncate block">
                Stream DJ Caat on Spotify
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-green-400 font-bold shrink-0 ml-2 flex items-center gap-0.5">
            LISTEN <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* 5. SOUNDCLOUD VAULT */}
        <a
          href={ARTIST_INFO.soundcloud}
          target="_blank"
          rel="noreferrer"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-orange-500/40 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-orange-400/70 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30 shrink-0">
              <Disc3 className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-orange-400 uppercase font-bold tracking-wider block truncate">
                SOUNDCLOUD // BOOTLEGS & EDITS
              </span>
              <span className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors truncate block">
                Listen on SoundCloud (dgdjcaat)
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-orange-400 font-bold shrink-0 ml-2 flex items-center gap-0.5">
            PLAY <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* 6. TWITTER / X OFFICIAL HUB */}
        <a
          href={ARTIST_INFO.twitter}
          target="_blank"
          rel="noreferrer"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-white/20 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-orange-400/60 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white/5 text-gray-200 group-hover:text-white flex items-center justify-center border border-white/10 shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block truncate">
                  TWITTER / X // OFFICIAL
                </span>
                <TwitterVerifiedBadge size={14} />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors truncate block">
                Follow {ARTIST_INFO.twitterHandle}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-orange-400 font-bold shrink-0 ml-2 flex items-center gap-0.5">
            FOLLOW <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* 7. COLLABORATE PORTAL (Drop Stems) */}
        <Link
          href="/collab"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-purpleAccent/40 flex items-center justify-between group shadow-purple-glow active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-purpleAccent/20 text-purpleAccent flex items-center justify-center border border-purpleAccent/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-purpleAccent uppercase font-bold tracking-wider block truncate">
                PRODUCER & VOCALIST INTAKE
              </span>
              <span className="text-sm font-bold text-white group-hover:text-purpleAccent transition-colors truncate block">
                Drop Stems & Collab With DJ Caat
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-purpleAccent font-bold shrink-0 ml-2">PORTAL →</span>
        </Link>

        {/* 7. LIVE 808 VISUALIZER */}
        <Link
          href="/visualizer"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-cyanAccent/30 flex items-center justify-between group active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-cyanAccent/15 text-cyanAccent flex items-center justify-center border border-cyanAccent/30 shrink-0">
              <Radio className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-cyanAccent uppercase font-bold tracking-wider block truncate">
                BROWSER AUDIO ENGINE
              </span>
              <span className="text-sm font-bold text-white group-hover:text-cyanAccent transition-colors truncate block">
                Live 808 Phonk Visualizer
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-cyanAccent font-bold shrink-0 ml-2">PLAY →</span>
        </Link>

        {/* 8. SOUND STORE */}
        <Link
          href="/store"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-crimsonAccent/30 flex items-center justify-between group active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-crimsonAccent/15 text-crimsonAccent flex items-center justify-center border border-crimsonAccent/30 shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-crimsonAccent uppercase font-bold tracking-wider block truncate">
                FOR PRODUCERS & BEATMAKERS
              </span>
              <span className="text-sm font-bold text-white group-hover:text-crimsonAccent transition-colors truncate block">
                808 Bass Kits & Cowbell Soundfonts
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-crimsonAccent font-bold shrink-0 ml-2">VAULT →</span>
        </Link>

        {/* 9. EPK & BOOKINGS */}
        <Link
          href="/epk"
          className="w-full p-4 rounded-2xl glass-panel-premium glass-panel-hover border border-white/10 flex items-center justify-between group active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white/5 text-gray-300 flex items-center justify-center border border-white/10 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block truncate">
                PRESS, LABELS & BOOKINGS
              </span>
              <span className="text-sm font-bold text-white group-hover:text-white transition-colors truncate block">
                Electronic Press Kit & Master Catalog
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-gray-400 font-bold shrink-0 ml-2">EPK →</span>
        </Link>
      </div>

      {/* Footer Branding */}
      <div className="w-full pt-4 border-t border-white/10 text-center space-y-1">
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
            <span>{ARTIST_INFO.managedBy}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </p>
      </div>
    </div>
  );
}
