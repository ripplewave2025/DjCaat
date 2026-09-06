import React from "react";
import Link from "next/link";
import { Radio, Sparkles, Layers, Sliders, Music, Info, UploadCloud, ArrowRight } from "lucide-react";
import AudioVisualizer from "@/components/AudioVisualizer";
import { TRACKS } from "@/lib/tracks";

export default function VisualizerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyanAccent">
            <Radio className="w-4 h-4" />
            <span>WebGL & Web Audio DSP Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
            808 Phonk Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            Real-time FFT audio engine with multi-band frequency splitting, sub-bass 808 pulse reactivity, and dynamic particle emission.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/collab"
            className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center space-x-2"
          >
            <UploadCloud className="w-3.5 h-3.5 text-cyanAccent" />
            <span>Drop Your Stems</span>
          </Link>
          <Link
            href="/store"
            className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyanAccent to-purpleAccent text-black shadow-cyan-glow"
          >
            Get Sound Kits
          </Link>
        </div>
      </div>

      {/* Main Visualizer Player */}
      <div className="w-full">
        <AudioVisualizer initialTrackIndex={0} />
      </div>

      {/* Frequency Bands Guide & Technical Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Sub-Bass */}
        <div className="glass-panel p-6 rounded-xl border border-crimsonAccent/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-crimsonAccent">
              Band 1 // 20Hz - 80Hz
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-crimsonAccent/20 text-crimsonAccent">
              SUB-BASS 808
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Distortion Pulse & Screen Shake</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Captures low-end 808 slides and kick transients. Drives canvas camera zoom pulse, chromatic aberration glitch, and ground grid acceleration.
          </p>
        </div>

        {/* Mids */}
        <div className="glass-panel p-6 rounded-xl border border-cyanAccent/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-cyanAccent">
              Band 2 // 250Hz - 4kHz
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyanAccent/20 text-cyanAccent">
              COWBELLS & VOCALS
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Radial Ring Amplitude</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Tracks classic Memphis vocal cuts, brass hits, and tuned drift cowbells. Directly governs the 72 radial equalizer bar heights and rotational speed.
          </p>
        </div>

        {/* Highs */}
        <div className="glass-panel p-6 rounded-xl border border-purpleAccent/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-purpleAccent">
              Band 3 // 4kHz - 16kHz
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-purpleAccent/20 text-purpleAccent">
              TRANSIENTS & HATS
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Neon Spark Particles</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Detects hi-hat rolls, open cymbals, and transient noise bursts to spawn kinetic neon spark particles that orbit and dissolve in real-time.
          </p>
        </div>
      </div>

      {/* Instructions for Creators */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent">
            CONTENT CREATOR & REELS WORKFLOW
          </span>
          <h3 className="text-xl font-bold text-white">
            Exporting Visuals for Instagram Reels & TikTok
          </h3>
          <p className="text-xs text-gray-400 max-w-xl">
            Toggle the aspect ratio to <strong>9:16</strong>, upload your unreleased track or select a DJ Caat master, and screen record with audio enabled for instant viral snippet visuals.
          </p>
        </div>

        <Link
          href="/links"
          className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center space-x-2 shrink-0 transition-colors"
        >
          <span>DJ Caat Bio Hub</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
