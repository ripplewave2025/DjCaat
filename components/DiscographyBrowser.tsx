"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Play, Copy, Check, Filter, Disc3, Radio, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { DISTRO_RELEASES, DistroRelease } from "@/lib/tracks";

interface DiscographyBrowserProps {
  onSelectTrackForVisualizer?: (trackIndex: number) => void;
}

export default function DiscographyBrowser({ onSelectTrackForVisualizer }: DiscographyBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedVersions, setSelectedVersions] = useState<Record<string, number>>({});
  const [copiedIsrc, setCopiedIsrc] = useState<string | null>(null);

  // Filter releases based on search query and genre
  const filteredReleases = useMemo(() => {
    return DISTRO_RELEASES.filter((release) => {
      const matchesSearch =
        release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.versions.some((v) => v.isrc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        release.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.subgenre.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === "all" || release.subgenre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const handleCopyIsrc = (isrc: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(isrc);
      setCopiedIsrc(isrc);
      setTimeout(() => setCopiedIsrc(null), 2000);
    }
  };

  const handleSelectVersion = (releaseId: string, versionIndex: number) => {
    setSelectedVersions((prev) => ({
      ...prev,
      [releaseId]: versionIndex,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="glass-panel-premium p-4 sm:p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyanAccent" />
            <input
              type="text"
              placeholder="Search 20 official DJ Caat masters or subgenres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-void/80 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center justify-between sm:justify-end space-x-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-gray-300">
            <div className="flex items-center space-x-1.5">
              <Disc3 className="w-3.5 h-3.5 text-cyanAccent animate-spin" style={{ animationDuration: "8s" }} />
              <span>{DISTRO_RELEASES.length} Official Masters</span>
            </div>
            <span className="text-gray-600">|</span>
            <span className="text-cyanAccent font-bold">DJ Caat</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          <span className="text-gray-500 flex items-center gap-1 shrink-0 text-[11px]">
            <Filter className="w-3 h-3 text-cyanAccent" />
            <span>GENRE:</span>
          </span>
          {[
            { label: "All Catalog", value: "all" },
            { label: "Nepali Phonk", value: "Nepali Phonk" },
            { label: "Brazilian Phonk", value: "Brazilian Phonk" },
            { label: "Himalayan Drift", value: "Himalayan Drift" },
            { label: "Drift Phonk", value: "Drift Phonk" },
            { label: "Trap / Future Bass", value: "Trap / Future Bass" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedGenre(tab.value)}
              className={`px-3 py-1.5 rounded-lg shrink-0 transition-all active:scale-95 ${
                selectedGenre === tab.value
                  ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReleases.map((release, idx) => {
          const activeVersionIndex = selectedVersions[release.id] ?? 0;
          const activeVersion = release.versions[activeVersionIndex] || release.versions[0];

          return (
            <div
              key={release.id}
              className="glass-panel glass-panel-hover rounded-2xl border border-white/10 p-5 flex flex-col justify-between space-y-4 relative overflow-hidden group"
            >
              <div className="space-y-4">
                {/* Header info & cover thumbnail */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden relative shrink-0 border border-white/10 shadow-lg">
                    <Image
                      src={release.coverImage}
                      alt={release.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono font-bold text-cyanAccent border border-cyanAccent/30">
                      #{release.slNo}
                    </div>
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-white/5 text-cyanAccent border border-cyanAccent/30 truncate">
                        {release.subgenre}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 shrink-0">
                        {release.releaseDate}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white tracking-wide truncate group-hover:text-cyanAccent transition-colors">
                      {release.title}
                    </h3>

                    <p className="text-[11px] font-mono text-gray-400 flex items-center space-x-2">
                      <span>{release.bpm} BPM</span>
                      <span>•</span>
                      <span>{release.key}</span>
                      <span>•</span>
                      <span>{activeVersion.duration}</span>
                    </p>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed font-sans">
                  {release.description}
                </p>

                {/* Phonk Version Selector Pills */}
                {release.versions.length > 1 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 block">
                      Select Master Version:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {release.versions.map((ver, vIdx) => (
                        <button
                          key={ver.versionTitle}
                          onClick={() => handleSelectVersion(release.id, vIdx)}
                          className={`px-2 py-1 rounded-md text-[10px] font-mono font-medium transition-colors ${
                            activeVersionIndex === vIdx
                              ? "bg-purpleAccent text-white font-bold shadow-purple-glow"
                              : "bg-white/5 text-gray-400 hover:text-white border border-white/5"
                          }`}
                        >
                          {ver.versionTitle}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Card Action Buttons */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <Link
                  href={`/visualizer?track=${encodeURIComponent(release.id)}`}
                  className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-cyanAccent/15 text-cyanAccent border border-cyanAccent/30 hover:bg-cyanAccent hover:text-black transition-all flex items-center space-x-1.5 active:scale-95 shadow-cyan-glow"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>808 Visualizer</span>
                </Link>

                <a
                  href={release.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-green-400 bg-white/5 hover:bg-green-500/10 border border-white/5 transition-colors flex items-center space-x-1"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReleases.length === 0 && (
        <div className="glass-panel p-10 rounded-2xl text-center space-y-3">
          <Disc3 className="w-10 h-10 text-gray-600 mx-auto" />
          <p className="text-sm text-gray-400 font-mono">No matching releases found in DJ Caat distro vault.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedGenre("all");
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono bg-cyanAccent text-black font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
