import React from "react";

interface TwitterVerifiedBadgeProps {
  size?: number;
  className?: string;
  showTooltip?: boolean;
}

/**
 * Official Twitter-style verified badge:
 * - Outer ring in vibrant neon orange (#f97316)
 * - Inner 12-point scalloped starburst rosette in Twitter grey (#829aab)
 * - Center checkmark in solid black (#000000)
 */
export default function TwitterVerifiedBadge({
  size = 20,
  className = "",
  showTooltip = true,
}: TwitterVerifiedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center relative shrink-0 select-none ${className}`}
      title={showTooltip ? "Verified Official Artist // DJ Caat" : undefined}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]"
      >
        {/* Outer Orange Ring */}
        <circle
          cx="12"
          cy="12"
          r="11"
          stroke="#f97316"
          strokeWidth="1.75"
          fill="#0c0d10"
        />

        {/* Twitter Scalloped Rosette (Grey #829aab) */}
        <g transform="translate(12, 12) scale(0.74) translate(-12, -12)">
          <path
            d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
            fill="#829aab"
          />
          {/* Black Checkmark in Center */}
          <path
            d="M10.5 16.5l-4-4 1.41-1.41 2.59 2.58 6.59-6.59 1.41 1.41-8 8z"
            fill="#000000"
          />
        </g>
      </svg>
    </span>
  );
}
