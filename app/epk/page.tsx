"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, Download, ShieldCheck, Mail, MapPin, Music, Instagram, Youtube, ExternalLink, Globe, Sparkles, Award, Copy, Check, Disc3 } from "lucide-react";
import { ARTIST_INFO, DISTRO_RELEASES } from "@/lib/tracks";

export default function EpkPage() {
  const [copiedIsrc, setCopiedIsrc] = useState<string | null>(null);

  const handleCopyIsrc = (isrc: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(isrc);
      setCopiedIsrc(isrc);
      setTimeout(() => setCopiedIsrc(null), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 space-y-12 sm:space-y-16">
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
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyanAccent text-black shadow-cyan-glow flex items-center justify-center space-x-2 hover:opacity-90 active:scale-95 transition-all min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Download Press Kit</span>
          </a>
        </div>
      </div>

      {/* Verified Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-panel-premium p-5 sm:p-6 rounded-2xl border border-white/10 space-y-2 text-center shadow-lg">
          <div className="flex items-center justify-center space-x-1 text-cyanAccent text-[11px] font-mono">
            <Instagram className="w-3.5 h-3.5" />
            <span>INSTAGRAM</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black text-white font-mono">{ARTIST_INFO.followers}</div>
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-mono">Organic Community</p>
        </div>

        <div className="glass-panel-premium p-5 sm:p-6 rounded-2xl border border-white/10 space-y-2 text-center shadow-lg">
          <div className="flex items-center justify-center space-x-1 text-purpleAccent text-[11px] font-mono">
            <Music className="w-3.5 h-3.5" />
            <span>MONTHLY STREAMS</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black text-white font-mono">{ARTIST_INFO.streams}</div>
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-mono">Cross-Platform Listens</p>
        </div>

        <div className="glass-panel-premium p-5 sm:p-6 rounded-2xl border border-white/10 space-y-2 text-center shadow-lg">
          <div className="flex items-center justify-center space-x-1 text-crimsonAccent text-[11px] font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>TOP REGIONS</span>
          </div>
          <div className="text-base sm:text-xl font-bold text-white font-mono mt-1">IN • BR • NP • US</div>
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-mono">Global Phonk Reach</p>
        </div>

        <div className="glass-panel-premium p-5 sm:p-6 rounded-2xl border border-white/10 space-y-2 text-center shadow-lg">
          <div className="flex items-center justify-center space-x-1 text-green-400 text-[11px] font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>HERITAGE BASE</span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-white font-mono mt-1">DARJEELING</div>
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-mono">West Bengal, India</p>
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

          <div className="p-4 rounded-2xl glass-panel-premium border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Artist / Producer:</span>
              <span className="text-white font-bold">{ARTIST_INFO.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Primary Genres:</span>
              <span className="text-cyanAccent">Nepali Phonk / Brazilian Phonk</span>
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
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
              Himalayan Harmonics Colliding with Favela Sub-Bass
            </h2>
          </div>

          <div className="text-gray-300 text-xs sm:text-sm leading-relaxed space-y-4 font-normal">
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
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* OFFICIAL DISCOGRAPHY & REPERTOIRE CATALOG */}
      {/* ------------------------------------------------------------- */}
      <div className="glass-panel-premium rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Verified Catalog & Repertoire</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase mt-0.5">
              Official Master Catalog
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-400">
            Artist: <strong className="text-white">DJ Caat</strong> • {DISTRO_RELEASES.length} Registered Masters
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Master Title</th>
                <th className="py-3 px-3">Subgenre</th>
                <th className="py-3 px-3">BPM & Key</th>
                <th className="py-3 px-3">Available Editions</th>
                <th className="py-3 px-3">Release Date</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {DISTRO_RELEASES.map((r) => {
                const editions = r.versions.map((v) => v.versionTitle).join(", ");
                return (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 text-cyanAccent font-bold">#{r.slNo}</td>
                    <td className="py-3 px-3 font-bold text-white">{r.title}</td>
                    <td className="py-3 px-3 text-purpleAccent">{r.subgenre}</td>
                    <td className="py-3 px-3 text-gray-300">{r.bpm} BPM • {r.key}</td>
                    <td className="py-3 px-3 text-gray-400 truncate max-w-xs">{editions}</td>
                    <td className="py-3 px-3 text-gray-400">{r.releaseDate}</td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/visualizer?track=${encodeURIComponent(r.id)}`}
                        className="px-2.5 py-1 rounded-lg bg-cyanAccent/15 text-cyanAccent hover:bg-cyanAccent hover:text-black transition-colors inline-flex items-center gap-1 text-[11px] font-bold"
                      >
                        <Disc3 className="w-3 h-3" />
                        <span>Visualizer</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Card View */}
        <div className="sm:hidden space-y-3">
          {DISTRO_RELEASES.map((r) => {
            const editions = r.versions.map((v) => v.versionTitle).join(", ");
            return (
              <div
                key={r.id}
                className="p-4 rounded-xl bg-void/80 border border-white/5 space-y-2 text-xs font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="text-cyanAccent font-bold">#{r.slNo} • {r.title}</span>
                  <span className="text-[10px] text-gray-400">{r.releaseDate}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-purpleAccent">{r.subgenre}</span>
                  <span className="text-gray-300 text-[11px]">{r.bpm} BPM • {r.key}</span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">Editions: {editions}</p>
                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <Link
                    href={`/visualizer?track=${encodeURIComponent(r.id)}`}
                    className="px-3 py-1.5 rounded-lg bg-cyanAccent text-black font-bold text-[11px] flex items-center gap-1"
                  >
                    <Disc3 className="w-3 h-3" />
                    <span>Test in Visualizer</span>
                  </Link>
                  <a
                    href={r.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gray-400 hover:text-green-400 flex items-center gap-1"
                  >
                    <span>Spotify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
