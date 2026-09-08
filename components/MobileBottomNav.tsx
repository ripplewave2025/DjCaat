"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disc3, Radio, Sparkles, ShoppingBag, Link as LinkIcon } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Catalog", href: "/", icon: Disc3 },
    { name: "808 Engine", href: "/visualizer", icon: Radio, pulse: true },
    { name: "Drop Stems", href: "/collab", icon: Sparkles },
    { name: "Sound Vault", href: "/store", icon: ShoppingBag },
    { name: "Bio Hub", href: "/links", icon: LinkIcon },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-panel-premium border-t border-white/10 pb-safe backdrop-blur-2xl"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? "text-cyanAccent"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {/* Active neon pill indicator */}
              {isActive && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-cyanAccent shadow-[0_0_12px_#00f0ff]" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]" : ""
                  }`}
                />
                {item.pulse && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyanAccent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyanAccent" />
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-mono tracking-wider mt-1 transition-colors ${
                  isActive ? "font-bold text-white" : "font-normal"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
