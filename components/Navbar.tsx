"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Radio, Sparkles, ShoppingBag, Link as LinkIcon, FileText, Menu, X, Disc3, Instagram, ExternalLink } from "lucide-react";
import { ARTIST_INFO } from "@/lib/tracks";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Catalog", href: "/", icon: Disc3 },
    { name: "808 Visualizer", href: "/visualizer", icon: Radio },
    { name: "Collab Portal", href: "/collab", icon: Sparkles },
    { name: "Sound Vault", href: "/store", icon: ShoppingBag },
    { name: "Bio Links", href: "/links", icon: LinkIcon },
    { name: "EPK", href: "/epk", icon: FileText },
  ];

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel-premium backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyanAccent via-purpleAccent to-crimsonAccent p-[1.5px] shadow-cyan-glow group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-void rounded-[10px] flex items-center justify-center">
                <Music className="w-5 h-5 text-cyanAccent group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-lg sm:text-xl tracking-wider text-white group-hover:text-cyanAccent transition-colors">
                  DJ CAAT
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-cyanAccent/10 text-cyanAccent rounded border border-cyanAccent/30">
                  Darjeeling
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                Nepali // Brazilian Phonk
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5 transition-all duration-200 ${
                    isActive
                      ? "bg-cyanAccent/15 text-cyanAccent border border-cyanAccent/40 shadow-cyan-glow"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyanAccent" : "text-gray-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Quick Socials (Desktop) */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={ARTIST_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <Link
              href="/collab"
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black hover:opacity-95 shadow-cyan-glow transition-all active:scale-95"
            >
              Drop Stems
            </Link>
          </div>

          {/* Mobile menu trigger with ample touch target */}
          <div className="flex items-center space-x-2 lg:hidden">
            <a
              href={ARTIST_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/5 text-gray-300 active:text-pink-400"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-pink-400" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-200 hover:text-white rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyanAccent" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile Drawer with Glassmorphic Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-4/5 max-w-sm h-full glass-sheet p-6 flex flex-col justify-between overflow-y-auto border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-black text-lg text-white tracking-wider">DJ CAAT</h3>
                  <p className="text-[10px] font-mono text-cyanAccent uppercase">
                    33.3K+ Phonk Community
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold tracking-wider flex items-center space-x-3 transition-all ${
                        isActive
                          ? "bg-cyanAccent/20 text-cyanAccent border border-cyanAccent/40 shadow-cyan-glow"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-cyanAccent" : "text-gray-400"}`} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link
                href="/collab"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 text-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black rounded-xl shadow-cyan-glow active:scale-95 transition-transform"
              >
                Drop Vocal Stems & Stems
              </Link>

              <div className="flex items-center justify-center space-x-4 pt-2">
                <a
                  href={ARTIST_INFO.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-green-400 hover:underline flex items-center space-x-1"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href={ARTIST_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-pink-400 hover:underline flex items-center space-x-1"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
