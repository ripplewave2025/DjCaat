"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Radio, Sparkles, ShoppingBag, Link as LinkIcon, FileText, Menu, X, Disc3 } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Catalog", href: "/", icon: Disc3 },
    { name: "Visualizer", href: "/visualizer", icon: Radio },
    { name: "Collab Portal", href: "/collab", icon: Sparkles },
    { name: "Sound Vault", href: "/store", icon: ShoppingBag },
    { name: "Bio Links", href: "/links", icon: LinkIcon },
    { name: "EPK", href: "/epk", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyanAccent via-purpleAccent to-crimsonAccent p-[1px] shadow-cyan-glow group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-void rounded-[7px] flex items-center justify-center">
              <Music className="w-5 h-5 text-cyanAccent group-hover:text-white transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-xl tracking-wider text-white group-hover:text-cyanAccent transition-colors">
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
                className={`px-3 py-1.5 rounded-md text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5 transition-all duration-200 ${
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

        {/* Action Button */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/collab"
            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyanAccent to-purpleAccent text-black hover:opacity-95 shadow-cyan-glow transition-all active:scale-95"
          >
            Drop Vocal Stems
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-5 space-y-1 bg-void/95 border-b border-white/10 backdrop-blur-2xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wider flex items-center space-x-2.5 ${
                  isActive
                    ? "bg-cyanAccent/20 text-cyanAccent border border-cyanAccent/40"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 text-cyanAccent" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/collab"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyanAccent to-purpleAccent text-black rounded-lg shadow-cyan-glow"
            >
              Submit Stems & Collabs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
