"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Upload, Mic, Volume2, Maximize2, Sparkles, Sliders, Radio, Music } from "lucide-react";
import { TRACKS } from "@/lib/tracks";

interface AudioVisualizerProps {
  initialTrackIndex?: number;
  compactMode?: boolean;
}

export default function AudioVisualizer({ initialTrackIndex = 0, compactMode = false }: AudioVisualizerProps) {
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

  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }>>([]);

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
    try {
      initAudioEngine();
      if (!audioContextRef.current || !analyserRef.current) return;

      if (audioRef.current) {
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
      alert("Microphone permission denied or unavailable.");
      console.error(err);
    }
  };

  // Spawn spark particles on treble transients
  const spawnParticles = (count: number, width: number, height: number) => {
    const colors = ["#00f0ff", "#8b5cf6", "#ff0055", "#ffffff"];
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: width / 2 + (Math.random() - 0.5) * 40,
        y: height / 2 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
      });
    }
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rotationAngle = 0;
    let gridOffset = 0;

    const render = () => {
      animationFrameId.current = requestAnimationFrame(render);

      const width = canvas.width;
      const height = canvas.height;

      // Extract frequency and time domain data
      let freqData = new Uint8Array(1024);
      let timeData = new Uint8Array(1024);

      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(freqData);
        analyserRef.current.getByteTimeDomainData(timeData);
      }

      // 3-Band DSP Calculation
      // Sub-bass: 20-80Hz (bins 1 to 4 in 44.1kHz / 2048 FFT)
      let subBassSum = 0;
      for (let i = 1; i <= 4; i++) subBassSum += freqData[i] || 0;
      const subBassAvg = (subBassSum / 4 / 255) * bassSensitivity;

      // Mids: 250Hz - 4kHz (bins 12 to 180)
      let midsSum = 0;
      for (let i = 12; i <= 180; i++) midsSum += freqData[i] || 0;
      const midsAvg = midsSum / 168 / 255;

      // Highs: 4kHz - 16kHz (bins 180 to 740)
      let highsSum = 0;
      for (let i = 180; i <= 740; i++) highsSum += freqData[i] || 0;
      const highsAvg = highsSum / 560 / 255;

      setBassLevel(subBassAvg);

      // Trigger spark particles if high frequencies hit transient
      if (highsAvg > 0.35 && isPlaying) {
        spawnParticles(Math.floor((particleDensity / 20) * highsAvg), width, height);
      }

      // Base background clear with trail persistence
      ctx.fillStyle = "rgba(8, 8, 10, 0.28)";
      ctx.fillRect(0, 0, width, height);

      // Chromatic Aberration Screen Shake
      const shakeX = chromaticAberration ? (Math.random() - 0.5) * subBassAvg * 8 : 0;
      const shakeY = chromaticAberration ? (Math.random() - 0.5) * subBassAvg * 8 : 0;

      ctx.save();
      ctx.translate(shakeX, shakeY);

      // -----------------------------------------------------------------
      // RENDER MODE A: RADIAL RING
      // -----------------------------------------------------------------
      if (renderMode === "radial") {
        rotationAngle += 0.005 + midsAvg * 0.015;
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = Math.min(width, height) * 0.22 + subBassAvg * 25;

        // Center Pulsing Orb & Ring
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          10,
          centerX,
          centerY,
          baseRadius * 1.2
        );
        gradient.addColorStop(0, "rgba(255, 0, 85, 0.45)");
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.3)");
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Radial Equalizer Bars
        const barCount = 72;
        for (let i = 0; i < barCount; i++) {
          const angle = (i / barCount) * Math.PI * 2 + rotationAngle;
          const dataIdx = Math.floor((i / barCount) * 128);
          const val = (freqData[dataIdx] || 0) / 255;
          const barHeight = val * (Math.min(width, height) * 0.28) * (1 + subBassAvg * 0.6);

          const x1 = centerX + Math.cos(angle) * baseRadius;
          const y1 = centerY + Math.sin(angle) * baseRadius;
          const x2 = centerX + Math.cos(angle) * (baseRadius + barHeight);
          const y2 = centerY + Math.sin(angle) * (baseRadius + barHeight);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineWidth = 3;

          // Hue shift based on position and bass
          if (i % 3 === 0) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 + val * 0.6})`;
          } else if (i % 3 === 1) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.4 + val * 0.6})`;
          } else {
            ctx.strokeStyle = `rgba(255, 0, 85, ${0.4 + val * 0.6})`;
          }
          ctx.stroke();
        }

        // Center DJ CAAT Emblem
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(14, Math.floor(baseRadius * 0.22))}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 15;
        ctx.fillText("DJ CAAT", centerX, centerY - 6);
        ctx.font = `${Math.max(9, Math.floor(baseRadius * 0.1))}px monospace`;
        ctx.fillStyle = "#00f0ff";
        ctx.fillText("DARJEELING // PHONK", centerX, centerY + 14);
        ctx.shadowBlur = 0;
      }

      // -----------------------------------------------------------------
      // RENDER MODE B: CYBER WAVEFORM OSCILLOSCOPE
      // -----------------------------------------------------------------
      else if (renderMode === "waveform") {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#00f0ff";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 12;

        ctx.beginPath();
        const sliceWidth = width / 128;
        let x = 0;

        for (let i = 0; i < 128; i++) {
          const v = (timeData[i * 4] || 128) / 128.0;
          const y = (v * height) / 2;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.stroke();

        // Secondary mirrored pink wave
        ctx.beginPath();
        ctx.strokeStyle = "#ff0055";
        ctx.shadowColor = "#ff0055";
        x = 0;
        for (let i = 0; i < 128; i++) {
          const v = (timeData[i * 4] || 128) / 128.0;
          const y = height - (v * height) / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // -----------------------------------------------------------------
      // RENDER MODE C: 3D RETRO GRID ROAD
      // -----------------------------------------------------------------
      else if (renderMode === "grid") {
        const horizon = height * 0.45;
        gridOffset = (gridOffset + 2 + subBassAvg * 14) % 40;

        // Draw Sun on Horizon
        const sunRadius = Math.min(width, height) * 0.18;
        const sunGrad = ctx.createRadialGradient(
          width / 2,
          horizon,
          10,
          width / 2,
          horizon,
          sunRadius
        );
        sunGrad.addColorStop(0, "#ff0055");
        sunGrad.addColorStop(0.7, "#8b5cf6");
        sunGrad.addColorStop(1, "transparent");
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(width / 2, horizon, sunRadius, Math.PI, 0);
        ctx.fill();

        // Horizontal Grid Lines
        ctx.strokeStyle = "rgba(0, 240, 255, 0.45)";
        ctx.lineWidth = 1.5;

        for (let y = horizon; y < height; y += 18) {
          const perspectiveY = horizon + Math.pow((y - horizon) / (height - horizon), 2) * (height - horizon);
          ctx.beginPath();
          ctx.moveTo(0, perspectiveY);
          ctx.lineTo(width, perspectiveY);
          ctx.stroke();
        }

        // Perspective Vertical Grid Lines
        const vanishingPointX = width / 2;
        const count = 16;
        for (let i = -count; i <= count; i++) {
          const bottomX = vanishingPointX + i * (width / count) * 1.5;
          ctx.beginPath();
          ctx.moveTo(vanishingPointX, horizon);
          ctx.lineTo(bottomX, height);
          ctx.stroke();
        }
      }

      // Render Dynamic Spark Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [renderMode, bassSensitivity, chromaticAberration, particleDensity, isPlaying]);

  // Audio element events
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  const activeTrack = TRACKS[currentTrackIndex];

  return (
    <div className="w-full rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl relative">
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
          aspectRatio === "9:16" ? "aspect-[9/16] max-w-sm mx-auto my-4 rounded-xl border border-cyanAccent/30" : "aspect-video w-full"
        }`}
      >
        <canvas
          ref={canvasRef}
          width={aspectRatio === "9:16" ? 720 : 1280}
          height={aspectRatio === "9:16" ? 1280 : 720}
          className="w-full h-full object-cover"
        />

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider bg-void/80 text-cyanAccent border border-cyanAccent/40 rounded backdrop-blur-md flex items-center space-x-1.5 shadow-cyan-glow">
            <span className="w-2 h-2 rounded-full bg-cyanAccent animate-ping" />
            <span>808 FFT ENGINE</span>
          </span>
          <span className="px-2.5 py-1 text-[11px] font-mono text-gray-300 bg-void/80 border border-white/10 rounded backdrop-blur-md">
            MODE: {renderMode.toUpperCase()}
          </span>
        </div>

        {/* Current Track Label on Canvas */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none bg-void/70 p-3 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyanAccent to-crimsonAccent p-[1px]">
              <div className="w-full h-full bg-void rounded-[7px] flex items-center justify-center">
                <Music className="w-5 h-5 text-cyanAccent" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-wide">
                {audioSourceType === "upload" ? uploadedFileName : activeTrack.title}
              </p>
              <p className="text-[10px] font-mono text-cyanAccent">
                {audioSourceType === "mic"
                  ? "LIVE MICROPHONE INPUT"
                  : `${activeTrack.genre} • ${activeTrack.origin}`}
              </p>
            </div>
          </div>
          {/* Real-time Bass Meter */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] font-mono text-gray-400">SUB-BASS PRESSURE</span>
            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent transition-all duration-75"
                style={{ width: `${Math.min(100, bassLevel * 70)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar & Audio Timeline */}
      <div className="p-4 sm:p-6 bg-void/90 space-y-4 border-t border-white/10">
        {/* Scrubber bar */}
        {audioSourceType !== "mic" && (
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyanAccent"
            />
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Play/Pause & Reset */}
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent to-purpleAccent text-black hover:opacity-90 shadow-cyan-glow flex items-center space-x-2 transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
              <span>{isPlaying ? "Pause" : "Play Beat"}</span>
            </button>

            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = 0;
              }}
              className="p-2.5 rounded-xl text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
              title="Restart Track"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Mode switchers */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5 space-x-1">
            <button
              onClick={() => setRenderMode("radial")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                renderMode === "radial"
                  ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Radial 808
            </button>
            <button
              onClick={() => setRenderMode("waveform")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                renderMode === "waveform"
                  ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Oscilloscope
            </button>
            <button
              onClick={() => setRenderMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                renderMode === "grid"
                  ? "bg-cyanAccent text-black font-bold shadow-cyan-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              3D Drift Road
            </button>
          </div>

          {/* Aspect ratio & Source triggers */}
          <div className="flex items-center space-x-2">
            {/* Aspect ratio */}
            <button
              onClick={() => setAspectRatio(aspectRatio === "16:9" ? "9:16" : "16:9")}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-gray-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex items-center space-x-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5 text-purpleAccent" />
              <span>{aspectRatio}</span>
            </button>

            {/* Upload File */}
            <label className="px-3 py-1.5 rounded-lg text-xs font-mono text-gray-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex items-center space-x-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-cyanAccent" />
              <span>Upload Stems</span>
              <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Mic Input */}
            <button
              onClick={handleMicInput}
              className={`p-2 rounded-lg border transition-colors ${
                audioSourceType === "mic"
                  ? "bg-crimsonAccent/20 border-crimsonAccent text-crimsonAccent shadow-crimson-glow"
                  : "bg-white/5 border-white/5 text-gray-300 hover:text-white hover:bg-white/10"
              }`}
              title="Mic Input"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sliders & DSP controls (collapsible / compact) */}
        <div className="pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-gray-400">
              <span>808 BASS RESPONSE</span>
              <span className="text-cyanAccent">{bassSensitivity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={bassSensitivity}
              onChange={(e) => setBassSensitivity(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyanAccent"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-gray-400">
              <span>PARTICLE GLOW DENSITY</span>
              <span className="text-purpleAccent">{particleDensity}</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="10"
              value={particleDensity}
              onChange={(e) => setParticleDensity(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purpleAccent"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0">
            <span className="text-[10px] font-mono text-gray-400">RGB GLITCH SHAKE</span>
            <button
              onClick={() => setChromaticAberration(!chromaticAberration)}
              className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider transition-colors ${
                chromaticAberration
                  ? "bg-crimsonAccent/20 text-crimsonAccent border border-crimsonAccent/40"
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
          <div className="flex flex-wrap gap-2">
            {TRACKS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => selectTrack(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 ${
                  currentTrackIndex === idx && audioSourceType === "preset"
                    ? "bg-cyanAccent/20 text-cyanAccent border border-cyanAccent/40 shadow-cyan-glow"
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
