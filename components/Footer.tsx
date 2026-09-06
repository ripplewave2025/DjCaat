import React from "react";
import Link from "next/link";
import { Instagram, Youtube, Music, Mail, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { ARTIST_INFO } from "@/lib/tracks";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void/90 relative z-10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-black text-2xl tracking-wider text-white">DJ CAAT</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-cyanAccent/15 text-cyanAccent border border-cyanAccent/40 rounded">
                OFFICIAL
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-400 space-x-2">
              <MapPin className="w-3.5 h-3.5 text-crimsonAccent" />
              <span>Darjeeling, West Bengal, India ➔ Global Phonk Movement</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              Architecting the frontier of Nepali Phonk and Brazilian Phonk. Over 33,000 strong underground community. Mastered 808s, Himalayan melodies, and relentless drift rhythms.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={ARTIST_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyanAccent/20 flex items-center justify-center text-gray-300 hover:text-cyanAccent transition-colors border border-white/5 hover:border-cyanAccent/30"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={ARTIST_INFO.spotify}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyanAccent/20 flex items-center justify-center text-gray-300 hover:text-cyanAccent transition-colors border border-white/5 hover:border-cyanAccent/30"
                aria-label="Spotify"
              >
                <Music className="w-4 h-4" />
              </a>
              <a
                href={ARTIST_INFO.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyanAccent/20 flex items-center justify-center text-gray-300 hover:text-cyanAccent transition-colors border border-white/5 hover:border-cyanAccent/30"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={ARTIST_INFO.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyanAccent/20 flex items-center justify-center text-gray-300 hover:text-cyanAccent transition-colors border border-white/5 hover:border-cyanAccent/30"
                aria-label="SoundCloud"
              >
                <span className="text-[10px] font-black">SC</span>
              </a>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-cyanAccent">
              Platform Nodes
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Discography Catalog</Link>
              </li>
              <li>
                <Link href="/visualizer" className="hover:text-cyanAccent transition-colors flex items-center space-x-1">
                  <span>Audio Visualizer</span>
                  <Sparkles className="w-3 h-3 text-cyanAccent" />
                </Link>
              </li>
              <li>
                <Link href="/collab" className="hover:text-white transition-colors">Collab & Stem Drop</Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-white transition-colors">808 & Cowbell Sound Vault</Link>
              </li>
              <li>
                <Link href="/links" className="hover:text-white transition-colors">Mobile Bio Hub (/links)</Link>
              </li>
              <li>
                <Link href="/epk" className="hover:text-white transition-colors">Electronic Press Kit (EPK)</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Management & Licensing */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-purpleAccent">
              Direct Inquiries
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-500 font-mono block">MANAGEMENT & BOOKINGS</span>
                <a
                  href={`mailto:${ARTIST_INFO.mgmtEmail}`}
                  className="text-white hover:text-cyanAccent transition-colors font-mono flex items-center space-x-1.5"
                >
                  <Mail className="w-3 h-3 text-cyanAccent" />
                  <span>{ARTIST_INFO.mgmtEmail}</span>
                </a>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-500 font-mono block">VOCAL STEMS & PRODUCTION</span>
                <a
                  href={`mailto:${ARTIST_INFO.email}`}
                  className="text-white hover:text-purpleAccent transition-colors font-mono flex items-center space-x-1.5"
                >
                  <Mail className="w-3 h-3 text-purpleAccent" />
                  <span>{ARTIST_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} DJ CAAT. All rights reserved. Darjeeling, India.</p>
          <div className="flex items-center space-x-3 mt-3 sm:mt-0">
            <span className="text-cyanAccent">33.3K+ Verified Reach</span>
            <span>•</span>
            <Link
              href="/admin/plan"
              className="text-gray-600 hover:text-cyanAccent transition-colors flex items-center space-x-1"
              title="Private Management Portal"
            >
              <span>Owner Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
