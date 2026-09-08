"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, Upload, Mic, Volume2, Maximize2, Sparkles, Sliders, Radio, Music, Disc3, Settings2, Eye } from "lucide-react";
import { TRACKS, Track } from "@/lib/tracks";

interface AudioVisualizerProps {
  initialTrackIndex?: number;
  compactMode?: boolean;
}

export default function AudioVisualizer({ initialTrackIndex = 0, compactMode = false }: AudioVisualizerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Audio nodes refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [audioSourceType, setAudioSourceType] = useState<"preset" | "upload" | "mic">("preset");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  // Mobile Control Deck Tab
  const [mobileTab, setMobileTab] = useState<"playback" | "fx" | "dsp">("playback");

  // Visualization settings
  const [renderMode, setRenderMode] = useState<"radial" | "waveform" | "grid">("radial");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [bassSensitivity, setBassSensitivity] = useState(1.5);
  const [chromaticAberration, setChromaticAberration] = useState(true);
  const [particleDensity, setParticleDensity] = useState(60);

  // Metrics
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bassLevel, setBassLevel] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }>>([]);

  // Auto-detect mobile screen on mount for 9:16 default
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setAspectRatio("9:16");
      }

      // Check URL search param for track
      const params = new URLSearchParams(window.location.search);
      const trackParam = params.get("track");
      if (trackParam) {
        const foundIdx = TRACKS.findIndex((t) => t.id === trackParam || t.title.toLowerCase() === trackParam.toLowerCase());
        if (foundIdx !== -1) {
          setCurrentTrackIndex(foundIdx);
        }
      }
    }
  }, []);

  // IntersectionObserver to pause rendering when offscreen (saves mobile battery)
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize Audio Context and pipeline
  const initAudioEngine = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;

      audioContextRef.current = ctx;
      analyserRef.current = analyser;

      if (audioRef.current && audioSourceType !== "mic") {
        try {
          const source = ctx.createMediaElementSource(audioRef.current);
          source.connect(analyser);
          analyser.connect(ctx.destination);
          sourceNodeRef.current = source;
        } catch {
          // Already connected
        }
      }
    }

    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  };

  // Play / Pause toggle
  const togglePlay = async () => {
    initAudioEngine();

    if (audioSourceType === "mic") {
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback error:", err);
      }
    }
  };

  // Handle Track Selection
  const selectTrack = (index: number) => {
    if (audioSourceType === "mic" && micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setAudioSourceType("preset");
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = TRACKS[index].audioSrc;
      audioRef.current.currentTime = 0;
      setTimeout(() => {
        togglePlay();
      }, 100);
    }
  };

  // Handle Local File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (uploadedFileUrl) {
      URL.revokeObjectURL(uploadedFileUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setUploadedFileUrl(objectUrl);
    setUploadedFileName(file.name);
    setAudioSourceType("upload");
    setIsPlaying(false);

    initAudioEngine();

    if (audioRef.current) {
      audioRef.current.src = objectUrl;
      audioRef.current.currentTime = 0;
      setTimeout(() => {
        togglePlay();
      }, 150);
    }
  };

  // Handle Live Mic Input
  const handleMicInput = async () => {
    initAudioEngine();
    if (!audioContextRef.current || !analyserRef.current) return;

    if (audioSourceType === "mic") {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      setAudioSourceType("preset");
      return;
    }

    try {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const micSource = audioContextRef.current.createMediaStreamSource(stream);
      micSource.connect(analyserRef.current);
      sourceNodeRef.current = micSource;

      setAudioSourceType("mic");
      setIsPlaying(true);
    } catch (err) {
      console.error("Mic access denied or error:", err);
    }
  };

  // Timeline scrubber
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // -------------------------------------------------------------
  // CANVAS RENDER LOOP (Web Audio DSP FFT 2048)
  // -------------------------------------------------------------
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    let subBass = 0;
    let midFreq = 0;
    let highFreq = 0;

    if (analyserRef.current && isPlaying) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Multi-band splitting
      // 1. Sub-Bass (0 - 10) ~ 20Hz - 80Hz
      let bassSum = 0;
      for (let i = 0; i < 10; i++) {
        bassSum += dataArray[i];
      }
      subBass = (bassSum / 10 / 255) * bassSensitivity;

      // 2. Mids (12 - 120) ~ 250Hz - 2500Hz
      let midSum = 0;
      for (let i = 12; i < 120; i++) {
        midSum += dataArray[i];
      }
      midFreq = midSum / 108 / 255;

      // 3. Highs (180 - 450) ~ 4000Hz - 10000Hz
      let highSum = 0;
      for (let i = 180; i < 450; i++) {
        highSum += dataArray[i];
      }
      highFreq = highSum / 270 / 255;

      setBassLevel(subBass);

      // Background clearing with fade motion blur
      ctx.fillStyle = "rgba(8, 8, 10, 0.22)";
      ctx.fillRect(0, 0, width, height);

      // Chromatic Glitch screen shake on heavy 808 kicks
      let shakeX = 0;
      let shakeY = 0;
      if (chromaticAberration && subBass > 1.2) {
        shakeX = (Math.random() - 0.5) * subBass * 9;
        shakeY = (Math.random() - 0.5) * subBass * 9;
      }

      ctx.save();
      ctx.translate(shakeX, shakeY);

      // -------------------------------------------------------------
      // MODE 1: RADIAL 808 PHONK RING
      // -------------------------------------------------------------
      if (renderMode === "radial") {
        const baseRadius = Math.min(width, height) * 0.22 + subBass * 32;
        const barCount = 72;

        // Pulsing core aura
        const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, baseRadius * 1.6);
        gradient.addColorStop(0, "rgba(0, 240, 255, 0.45)");
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.25)");
        gradient.addColorStop(0.85, "rgba(255, 0, 85, 0.15)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Equalizer Bars
        for (let i = 0; i < barCount; i++) {
          const angle = (i * 2 * Math.PI) / barCount;
          const dataIdx = Math.floor((i / barCount) * (bufferLength / 5));
          const val = dataArray[dataIdx] / 255;
          const barHeight = val * (height * 0.22) * bassSensitivity + subBass * 18;

          const xStart = centerX + Math.cos(angle) * baseRadius;
          const yStart = centerY + Math.sin(angle) * baseRadius;
          const xEnd = centerX + Math.cos(angle) * (baseRadius + barHeight);
          const yEnd = centerY + Math.sin(angle) * (baseRadius + barHeight);

          ctx.beginPath();
          ctx.moveTo(xStart, yStart);
          ctx.lineTo(xEnd, yEnd);

          if (i % 3 === 0) {
            ctx.strokeStyle = "#00f0ff";
            ctx.shadowColor = "#00f0ff";
          } else if (i % 3 === 1) {
            ctx.strokeStyle = "#8b5cf6";
            ctx.shadowColor = "#8b5cf6";
          } else {
            ctx.strokeStyle = "#ff0055";
            ctx.shadowColor = "#ff0055";
          }
          ctx.shadowBlur = 12;
          ctx.lineWidth = Math.max(2, (width / barCount) * 0.45);
          ctx.stroke();
        }

        // Center Bass Emblem
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = "#0c0c12";
        ctx.fill();
        ctx.strokeStyle = subBass > 1.0 ? "#00f0ff" : "#8b5cf6";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText("DJ CAAT", centerX, centerY - 6);
        ctx.fillStyle = "#00f0ff";
        ctx.font = "10px monospace";
        ctx.fillText("DARJEELING 808", centerX, centerY + 14);
      }

      // -------------------------------------------------------------
      // MODE 2: OSCILLOSCOPE CYBER WAVEFORM
      // -------------------------------------------------------------
      else if (renderMode === "waveform") {
        const timeData = new Uint8Array(analyserRef.current.fftSize);
        analyserRef.current.getByteTimeDomainData(timeData);

        ctx.lineWidth = 3;
        ctx.shadowBlur = 14;

        // Layer 1: Cyan Wave
        ctx.beginPath();
        ctx.strokeStyle = "#00f0ff";
        ctx.shadowColor = "#00f0ff";
        const sliceWidth = width / timeData.length;
        let x = 0;
        for (let i = 0; i < timeData.length; i++) {
          const v = timeData[i] / 128.0;
          const y = (v * height) / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.stroke();

        // Layer 2: Crimson Sub Wave Offset
        ctx.beginPath();
        ctx.strokeStyle = "#ff0055";
        ctx.shadowColor = "#ff0055";
        x = 0;
        for (let i = 0; i < timeData.length; i += 2) {
          const v = timeData[i] / 128.0;
          const y = (v * height) / 2 + subBass * 18;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth * 2;
        }
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // MODE 3: 3D DRIFT ROAD GRID
      // -------------------------------------------------------------
      else if (renderMode === "grid") {
        const horizon = centerY;
        const lines = 18;

        // Ground grid
        ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 8;
        ctx.lineWidth = 1.5;

        // Perspective lines
        for (let i = -lines / 2; i <= lines / 2; i++) {
          ctx.beginPath();
          ctx.moveTo(centerX, horizon);
          ctx.lineTo(centerX + i * (width / 5), height);
          ctx.stroke();
        }

        // Horizontal bars moving towards camera
        const time = (Date.now() / 30) % 50;
        for (let y = horizon; y < height; y += 22) {
          const progress = (y - horizon) / (height - horizon);
          const currentY = y + (time * progress);
          if (currentY > height) continue;

          ctx.beginPath();
          ctx.moveTo(0, currentY);
          ctx.lineTo(width, currentY);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 + progress * 0.7})`;
          ctx.stroke();
        }

        // Equalizer Mountain Sky in distance
        ctx.beginPath();
        const barWidth = width / 64;
        for (let i = 0; i < 64; i++) {
          const val = dataArray[i * 4] / 255;
          const h = val * (height * 0.35) * bassSensitivity;
          ctx.fillStyle = i % 2 === 0 ? "#00f0ff" : "#ff0055";
          ctx.fillRect(i * barWidth, horizon - h, barWidth - 1, h);
        }
      }

      // -------------------------------------------------------------
      // PARTICLE EMISSION (Transients & Hats)
      // -------------------------------------------------------------
      if (highFreq > 0.25 && particlesRef.current.length < particleDensity) {
        for (let p = 0; p < 3; p++) {
          particlesRef.current.push({
            x: centerX + (Math.random() - 0.5) * 60,
            y: centerY + (Math.random() - 0.5) * 60,
            vx: (Math.random() - 0.5) * 8 * (subBass + 1),
            vy: (Math.random() - 0.5) * 8 * (subBass + 1),
            size: Math.random() * 3.5 + 1.5,
            color: Math.random() > 0.5 ? "#00f0ff" : "#ff0055",
            life: 1.0,
          });
        }
      }

      // Update & Draw particles
      particlesRef.current.forEach((pt, idx) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.02;

        if (pt.life <= 0) {
          particlesRef.current.splice(idx, 1);
        } else {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.shadowColor = pt.color;
          ctx.shadowBlur = 10;
          ctx.fill();
        }
      });

      ctx.restore();
    } else {
      // Idle pulse state
      ctx.fillStyle = "rgba(8, 8, 10, 0.4)";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.fillText("TAP PLAY TO ENGAGE 808 ENGINE", centerX, centerY);
    }

    if (isVisible) {
      animationFrameId.current = requestAnimationFrame(renderCanvas);
    }
  }, [isPlaying, renderMode, bassSensitivity, chromaticAberration, particleDensity, isVisible]);

  useEffect(() => {
    if (isVisible) {
      animationFrameId.current = requestAnimationFrame(renderCanvas);
    }
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [renderCanvas, isVisible]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  const activeTrack = TRACKS[currentTrackIndex] || TRACKS[0];

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl glass-panel-premium border border-white/10 overflow-hidden shadow-2xl relative"
    >
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={activeTrack.audioSrc}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        crossOrigin="anonymous"
      />

      {/* Visualizer Canvas Area */}
      <div
        className={`relative flex items-center justify-center bg-black overflow-hidden transition-all duration-300 ${
          aspectRatio === "9:16"
            ? "aspect-[9/16] max-w-xs sm:max-w-sm mx-auto my-3 sm:my-4 rounded-xl border border-cyanAccent/40 shadow-cyan-glow"
            : "aspect-video w-full"
        }`}
      >
        <canvas
          ref={canvasRef}
          width={aspectRatio === "9:16" ? 720 : 1280}
          height={aspectRatio === "9:16" ? 1280 : 720}
          className="w-full h-full object-cover"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center space-x-1.5 sm:space-x-2 pointer-events-none">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-void/80 text-cyanAccent border border-cyanAccent/40 rounded backdrop-blur-md flex items-center space-x-1.5 shadow-cyan-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-ping" />
            <span>808 DSP</span>
          </span>
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-mono text-gray-300 bg-void/80 border border-white/10 rounded backdrop-blur-md">
            {renderMode.toUpperCase()}
          </span>
        </div>

        {/* Current Track Label on Canvas */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none bg-void/80 p-2.5 sm:p-3 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyanAccent to-crimsonAccent p-[1px] shrink-0">
              <div className="w-full h-full bg-void rounded-[7px] flex items-center justify-center">
                <Music className="w-4 h-4 sm:w-5 sm:h-5 text-cyanAccent" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                {audioSourceType === "upload" ? uploadedFileName : activeTrack.title}
              </p>
              <p className="text-[9px] sm:text-[10px] font-mono text-cyanAccent truncate">
                {audioSourceType === "mic"
                  ? "LIVE MICROPHONE INPUT"
                  : `${activeTrack.genre} • ${activeTrack.origin}`}
              </p>
            </div>
          </div>

          {/* Real-time Bass Meter */}
          <div className="flex flex-col items-end shrink-0 pl-2">
            <span className="text-[8px] sm:text-[9px] font-mono text-gray-400">808 PRESSURE</span>
            <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent transition-all duration-75"
                style={{ width: `${Math.min(100, bassLevel * 70)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SEGMENTED CONTROL DECK FOR MOBILE & DESKTOP */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 sm:p-6 bg-void/95 space-y-4 border-t border-white/10">
        {/* Scrubber bar (timeline) */}
        {audioSourceType !== "mic" && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyanAccent"
            />
          </div>
        )}

        {/* Mobile Tab Switcher (< md screens) */}
        <div className="flex sm:hidden items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => setMobileTab("playback")}
            className={`flex-1 py-2 text-center rounded-lg transition-all ${
              mobileTab === "playback"
                ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                : "text-gray-400"
            }`}
          >
            Playback
          </button>
          <button
            onClick={() => setMobileTab("fx")}
            className={`flex-1 py-2 text-center rounded-lg transition-all ${
              mobileTab === "fx"
                ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                : "text-gray-400"
            }`}
          >
            Modes & FX
          </button>
          <button
            onClick={() => setMobileTab("dsp")}
            className={`flex-1 py-2 text-center rounded-lg transition-all ${
              mobileTab === "dsp"
                ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                : "text-gray-400"
            }`}
          >
            808 Sliders
          </button>
        </div>

        {/* CONTROLS ROW 1: PLAYBACK & ACTIONS */}
        <div className={`space-y-3 ${mobileTab !== "playback" ? "hidden sm:block" : "block"}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Play/Pause & Reset */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={togglePlay}
                className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black hover:opacity-90 shadow-cyan-glow flex items-center space-x-2 transition-transform active:scale-95 min-h-[44px]"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                <span>{isPlaying ? "Pause" : "Play Beat"}</span>
              </button>

              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime = 0;
                }}
                className="p-3 rounded-xl text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Restart Track"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Upload & Mic triggers */}
            <div className="flex items-center space-x-2">
              <label className="px-3.5 py-2.5 rounded-xl text-xs font-mono text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center space-x-1.5 cursor-pointer min-h-[44px]">
                <Upload className="w-3.5 h-3.5 text-cyanAccent" />
                <span className="hidden sm:inline">Upload Stems</span>
                <span className="sm:hidden">Upload</span>
                <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
              </label>

              <button
                onClick={handleMicInput}
                className={`p-2.5 rounded-xl border transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  audioSourceType === "mic"
                    ? "bg-crimsonAccent/20 border-crimsonAccent text-crimsonAccent shadow-crimson-glow"
                    : "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                title="Live Mic Input"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* CONTROLS ROW 2: MODES & FX */}
        <div className={`space-y-3 ${mobileTab !== "fx" ? "hidden sm:block" : "block"}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 sm:pt-0">
            {/* Mode switchers */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 space-x-1">
              <button
                onClick={() => setRenderMode("radial")}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  renderMode === "radial"
                    ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Radial 808
              </button>
              <button
                onClick={() => setRenderMode("waveform")}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  renderMode === "waveform"
                    ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Waveform
              </button>
              <button
                onClick={() => setRenderMode("grid")}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  renderMode === "grid"
                    ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                3D Road
              </button>
            </div>

            {/* Aspect ratio */}
            <button
              onClick={() => setAspectRatio(aspectRatio === "16:9" ? "9:16" : "16:9")}
              className="px-3.5 py-2 rounded-xl text-xs font-mono text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center space-x-1.5 min-h-[44px]"
            >
              <Maximize2 className="w-3.5 h-3.5 text-purpleAccent" />
              <span>Aspect: {aspectRatio}</span>
            </button>
          </div>
        </div>

        {/* CONTROLS ROW 3: 808 DSP SLIDERS */}
        <div className={`pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 ${mobileTab !== "dsp" ? "hidden sm:grid" : "grid"}`}>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-gray-400">
              <span>808 BASS RESPONSE</span>
              <span className="text-cyanAccent font-bold">{bassSensitivity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={bassSensitivity}
              onChange={(e) => setBassSensitivity(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyanAccent"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-gray-400">
              <span>PARTICLE EMISSION</span>
              <span className="text-purpleAccent font-bold">{particleDensity}</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="10"
              value={particleDensity}
              onChange={(e) => setParticleDensity(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purpleAccent"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-3 pt-1 sm:pt-0">
            <span className="text-[11px] font-mono text-gray-400">RGB GLITCH SHAKE</span>
            <button
              onClick={() => setChromaticAberration(!chromaticAberration)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-colors min-h-[38px] ${
                chromaticAberration
                  ? "bg-crimsonAccent/20 text-crimsonAccent border border-crimsonAccent/40 shadow-crimson-glow"
                  : "bg-white/5 text-gray-400 border border-white/5"
              }`}
            >
              {chromaticAberration ? "ACTIVE" : "OFF"}
            </button>
          </div>
        </div>

        {/* Quick Track Selection Pills */}
        <div className="pt-2">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
            Load Official DJ Caat Masters:
          </p>
          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
            {TRACKS.slice(0, 10).map((t, idx) => (
              <button
                key={t.id}
                onClick={() => selectTrack(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 active:scale-95 ${
                  currentTrackIndex === idx && audioSourceType === "preset"
                    ? "bg-cyanAccent/20 text-cyanAccent border border-cyanAccent/40 shadow-cyan-glow font-bold"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                <span>{t.title}</span>
                <span className="text-[9px] text-gray-500">({t.subgenre})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
