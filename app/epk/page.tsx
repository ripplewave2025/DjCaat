import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, Download, ShieldCheck, Mail, MapPin, Music, Instagram, Youtube, ExternalLink, Globe, Sparkles, Award } from "lucide-react";
import { ARTIST_INFO, TRACKS } from "@/lib/tracks";

export default function EpkPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
            <FileText className="w-4 h-4" />
            <span>Official Electronic Press Kit (EPK)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
            DJ CAAT // PRESS & MEDIA
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            Verified stats, official biography, brand asset kit downloads, sync licensing guidelines, and contact channels for media outlets, labels, and festival promoters.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/images/nepamorphosis.jpg"
            download="dj-caat-press-photo.jpg"
            className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyanAccent text-black shadow-cyan-glow flex items-center space-x-2 hover:opacity-90"
          >
            <Download className="w-4 h-4" />
            <span>Download Press Kit</span>
          </a>
        </div>
      </div>

      {/* Verified Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2 text-center">
          <div className="flex items-center justify-center space-x-1 text-cyanAccent text-xs font-mono">
            <Instagram className="w-3.5 h-3.5" />
            <span>INSTAGRAM</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono">33.3K+</div>
          <p className="text-[11px] text-gray-400 font-mono">Underground Organic Reach</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2 text-center">
          <div className="flex items-center justify-center space-x-1 text-purpleAccent text-xs font-mono">
            <Music className="w-3.5 h-3.5" />
            <span>MONTHLY STREAMS</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono">100K+</div>
          <p className="text-[11px] text-gray-400 font-mono">Cross-Platform Listens</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2 text-center">
          <div className="flex items-center justify-center space-x-1 text-crimsonAccent text-xs font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>TOP REGIONS</span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-white font-mono mt-1">IN • BR • NP • US</div>
          <p className="text-[11px] text-gray-400 font-mono">Global Phonk Listenership</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2 text-center">
          <div className="flex items-center justify-center space-x-1 text-green-400 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>HERITAGE BASE</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">DARJEELING</div>
          <p className="text-[11px] text-gray-400 font-mono">West Bengal, India</p>
        </div>
      </div>

      {/* Artist Biography & Heritage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Promo Frame */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl">
            <Image
              src="/images/nepamorphosis.jpg"
              alt="DJ Caat Official Press Photo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyanAccent text-black uppercase">
                Official Press Photo
              </span>
              <p className="text-xs text-gray-300 font-mono mt-1">
                DJ Caat • Studio Vault Session
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Legal Name / Rep:</span>
              <span className="text-white">Upesh Bishwakarma</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Primary Genres:</span>
              <span className="text-cyanAccent">Nepali Phonk / Brazilian Phonk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Production DAW:</span>
              <span className="text-white">FL Studio / Custom DSP Chains</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Management Contact:</span>
              <span className="text-purpleAccent">{ARTIST_INFO.mgmtEmail}</span>
            </div>
          </div>
        </div>

        {/* Written Bio */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent">
              ARCHITECTURAL LORE // THE SOUND OF THE HILLS
            </span>
            <h2 className="text-3xl font-black text-white uppercase">
              Himalayan Harmonics Colliding with Favela Sub-Bass
            </h2>
          </div>

          <div className="prose prose-invert text-gray-300 text-sm leading-relaxed space-y-4 font-normal">
            <p>
              Born and based in <strong>Darjeeling, West Bengal, India</strong>, <strong>DJ Caat</strong> stands as one of the definitive architects of South Asian underground electronic music. While the global phonk movement surged across Eastern Europe and Latin America, Caat engineered an unmistakable signature: welding the melancholic, haunting modal scales of traditional Nepali and Himalayan folk with the explosive, syncopated 808 pressure of Brazilian Phonk and Memphis drift rap.
            </p>
            <p>
              His breakthrough works — including viral anthems like <em>NEPAMORPHOSIS</em>, <em>TIMRO YAAD MA</em>, and <em>YOi YOi</em> — catalyzed an organic community of over <strong>33,000 followers on Instagram</strong>, capturing the attention of international vocalists, automotive drift culture creators, and gaming communities worldwide.
            </p>
            <p>
              Operating with meticulous craftsmanship from his Darjeeling studio while pursuing academic university studies, DJ Caat maintains a disciplined production schedule. Stems, vocal capelas, and collaborative inquiries are channeled directly into his custom production intake pipeline, guaranteeing high-fidelity output for every official release.
            </p>
          </div>

          {/* Key Master Releases */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-purpleAccent">
              Essential Discography For Sync & Licensing
            </h3>
            <div className="space-y-2">
              {TRACKS.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:border-cyanAccent/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Music className="w-4 h-4 text-cyanAccent" />
                    <div>
                      <span className="text-sm font-bold text-white block">{t.title}</span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {t.genre} • {t.bpm} BPM • {t.key} • {t.origin}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/visualizer"
                    className="text-xs font-mono text-cyanAccent hover:underline"
                  >
                    Listen →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Assets Vault */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent">
            BRAND ASSETS VAULT
          </span>
          <h2 className="text-2xl font-black text-white uppercase">
            Official Logos, Artwork & Event Media Pack
          </h2>
          <p className="text-xs text-gray-400">
            For use by event organizers, festival promoters, designers, and video editors. Do not alter aspect ratios or colors without permission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-void border border-white/10 space-y-3">
            <div className="h-28 flex items-center justify-center bg-white/5 rounded-lg font-black text-2xl tracking-widest text-white">
              DJ CAAT
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">Vector Wordmark</span>
              <a href="/images/nepamorphosis.jpg" download className="text-cyanAccent hover:underline">
                PNG / SVG
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-void border border-white/10 space-y-3">
            <div className="h-28 flex items-center justify-center bg-white/5 rounded-lg relative overflow-hidden">
              <Image src="/images/timro-yaad-ma.png" alt="Timro Yaad Ma Cover" fill className="object-cover" />
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">Timro Yaad Ma High-Res</span>
              <a href="/images/timro-yaad-ma.png" download className="text-cyanAccent hover:underline">
                Download
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-void border border-white/10 space-y-3">
            <div className="h-28 flex items-center justify-center bg-white/5 rounded-lg relative overflow-hidden">
              <Image src="/images/gen-z-funk.jpg" alt="Gen Z Funk Cover" fill className="object-cover" />
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">Gen Z Funk High-Res</span>
              <a href="/images/gen-z-funk.jpg" download className="text-cyanAccent hover:underline">
                Download
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Licensing & Management Routing */}
      <div className="glass-panel p-8 rounded-2xl border border-purpleAccent/30 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-purpleAccent">
            SYNC LICENSING & BOOKINGS
          </span>
          <h2 className="text-2xl font-black text-white uppercase">
            Commercial Music Placement
          </h2>
          <p className="text-xs text-gray-400 max-w-2xl">
            DJ Caat’s catalog is available for sync licensing across video game soundtracks (drift, racing, combat titles), extreme sports reels, automotive campaigns, and indie cinema. Master and publishing rights are consolidated for rapid 24-48 hour turnaround.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-void border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Management & Agency Bookings</span>
            <p className="text-sm font-mono text-white flex items-center space-x-2">
              <Mail className="w-4 h-4 text-cyanAccent" />
              <span>{ARTIST_INFO.mgmtEmail}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Stems, Capelas & Producer Inquiries</span>
            <p className="text-sm font-mono text-white flex items-center space-x-2">
              <Mail className="w-4 h-4 text-purpleAccent" />
              <span>{ARTIST_INFO.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
