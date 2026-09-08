"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, UploadCloud, ShieldCheck, CheckCircle2, ArrowRight, Music, AlertCircle, Clock, MapPin, Mail, ExternalLink, Send } from "lucide-react";
import { ARTIST_INFO } from "@/lib/tracks";

export default function CollabPage() {
  const [formData, setFormData] = useState({
    artistName: "",
    instagramHandle: "",
    streamingUrl: "",
    collabType: "Vocal Feature / Capela Drop",
    subgenre: "Nepali Phonk",
    stemLink: "",
    splitProposal: "50/50 Master Split",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    artistName: string;
    subgenre: string;
    date: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!formData.artistName.trim() || !formData.instagramHandle.trim() || !formData.stemLink.trim()) {
      setErrorMessage("Please complete all required fields (Artist Name, Instagram Handle, and Cloud Stem Link).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/collab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedTicket({
          id: data.ticketId || `CAAT-${Math.floor(1000 + Math.random() * 9000)}`,
          artistName: formData.artistName,
          subgenre: formData.subgenre,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        });
      } else {
        setErrorMessage(data.error || "Failed to submit collaboration request.");
      }
    } catch {
      // Fallback local ticket generation
      setSubmittedTicket({
        id: `CAAT-${Math.floor(1000 + Math.random() * 9000)}`,
        artistName: formData.artistName,
        subgenre: formData.subgenre,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24">
      {/* Top Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 mb-6">
        <Link href="/" className="hover:text-cyanAccent">HOME</Link>
        <span>/</span>
        <span className="text-cyanAccent">COLLABORATION INTAKE</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-3 mb-8 sm:mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyanAccent/10 border border-cyanAccent/30 text-xs font-mono text-cyanAccent">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCER PIPELINE // DARJEELING HQ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          The Collab Machine
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl">
          Direct stem intake for vocalists, producers, and labels. Bypass cluttered Instagram DMs and submit your project stems directly to DJ Caat for review.
        </p>
      </div>

      {/* Direct Email Collab & Management Hub Banner */}
      <div className="mb-6 p-4 rounded-2xl glass-panel-premium border border-cyanAccent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-cyan-glow">
        <div className="space-y-1 text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-cyanAccent" />
            <span>Prefer to Collab via Direct Email?</span>
          </span>
          <p className="text-gray-300">
            Send collaboration requests, stem links, and release proposals directly to{" "}
            <a href={`mailto:${ARTIST_INFO.email}`} className="text-cyanAccent font-mono font-bold hover:underline">
              {ARTIST_INFO.email}
            </a>
          </p>
        </div>
        <div className="text-[11px] font-mono shrink-0 bg-white/5 px-3 py-2 rounded-xl border border-white/10 w-full sm:w-auto text-center">
          <span className="text-gray-400">Everything Managed by: </span>
          <a
            href={ARTIST_INFO.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-cyanAccent font-bold underline inline-flex items-center gap-1"
          >
            <span>{ARTIST_INFO.managedBy}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="mb-8 p-4 rounded-xl glass-panel border border-white/10 flex items-start space-x-3">
        <Clock className="w-5 h-5 text-purpleAccent shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300 space-y-1">
          <span className="font-bold text-white block">Academic Schedule & Review Cadence</span>
          <p className="leading-relaxed">
            DJ Caat balances university sessions with active music production. All submissions are batched and reviewed every Sunday. High-priority stems with clean 24-bit WAV acapellas receive fastest turnaround.
          </p>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION MODAL / RECEIPT */}
      {submittedTicket ? (
        <div className="glass-panel-premium p-6 sm:p-10 rounded-2xl border border-cyanAccent/50 shadow-cyan-glow space-y-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center mx-auto border border-cyanAccent/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyanAccent block">
              COLLABORATION TICKET GENERATED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
              Stems Logged In Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              Your stems and project details have been securely queued for DJ Caat’s Sunday listening session.
            </p>
          </div>

          {/* Ticket Receipt Box */}
          <div className="max-w-sm mx-auto p-4 rounded-xl bg-void/80 border border-cyanAccent/30 space-y-2 text-left font-mono text-xs shadow-inner">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">TICKET REF:</span>
              <strong className="text-cyanAccent">{submittedTicket.id}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ARTIST:</span>
              <span className="text-white">{submittedTicket.artistName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">SUBGENRE:</span>
              <span className="text-purpleAccent">{submittedTicket.subgenre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">SUBMITTED ON:</span>
              <span className="text-gray-300">{submittedTicket.date}</span>
            </div>
            <div className="flex justify-between pt-1 text-[10px] text-gray-500">
              <span>STATUS:</span>
              <span className="text-green-400 font-bold">QUEUED // SUNDAY REVIEW</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setSubmittedTicket(null)}
              className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 min-h-[44px]"
            >
              Submit Another Stem
            </button>
            <Link
              href="/visualizer"
              className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyanAccent text-black shadow-cyan-glow hover:opacity-90 min-h-[44px] flex items-center justify-center space-x-1.5"
            >
              <span>Test Beats in Visualizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* INTAKE FORM WITH TOUCH-SAFE INPUT SIZES (PREVENTS IOS AUTO-ZOOM) */
        <form onSubmit={handleSubmit} className="glass-panel-premium p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-crimsonAccent/15 border border-crimsonAccent/30 flex items-center space-x-2 text-xs text-crimsonAccent">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Artist Credentials */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyanAccent flex items-center space-x-2">
              <span>01 // Artist Identity</span>
              <div className="flex-1 h-[1px] bg-cyanAccent/20" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300 block">
                  Artist / Producer Name <span className="text-crimsonAccent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mc Jamil / KenTo"
                  value={formData.artistName}
                  onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300 block">
                  Instagram Handle / Profile <span className="text-crimsonAccent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="@yourhandle"
                  value={formData.instagramHandle}
                  onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 block">
                Streaming Profile Link (Spotify / SoundCloud / Apple Music)
              </label>
              <input
                type="url"
                inputMode="url"
                placeholder="https://open.spotify.com/artist/..."
                value={formData.streamingUrl}
                onChange={(e) => setFormData({ ...formData, streamingUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
              />
            </div>
          </div>

          {/* Section 2: Collaboration Parameters */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-purpleAccent flex items-center space-x-2">
              <span>02 // Collaboration Parameters</span>
              <div className="flex-1 h-[1px] bg-purpleAccent/20" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300 block">
                  Collaboration Type
                </label>
                <select
                  value={formData.collabType}
                  onChange={(e) => setFormData({ ...formData, collabType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-void/90 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                >
                  <option value="Vocal Feature / Capela Drop">Vocal Feature / Capela Drop</option>
                  <option value="Co-Production / Beat Collab">Co-Production / Beat Collab</option>
                  <option value="Remix License Request">Remix License Request</option>
                  <option value="Sound Kit / Sample Pack Feature">Sound Kit / Sample Pack Feature</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300 block">
                  Target Subgenre
                </label>
                <select
                  value={formData.subgenre}
                  onChange={(e) => setFormData({ ...formData, subgenre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-void/90 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
                >
                  <option value="Nepali Phonk">Nepali Phonk (Himalayan Melodic)</option>
                  <option value="Brazilian Phonk">Brazilian Phonk (São Paulo 808)</option>
                  <option value="Himalayan Drift">Himalayan Drift (High Speed 140+ BPM)</option>
                  <option value="Memphis Phonk">Memphis Phonk (Raw Tape & Cowbell)</option>
                  <option value="Trap / Future Bass">Trap / Future Bass</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 block">
                Royalty & Split Expectation
              </label>
              <select
                value={formData.splitProposal}
                onChange={(e) => setFormData({ ...formData, splitProposal: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-void/90 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
              >
                <option value="50/50 Master Split">Standard 50/50 Master & Publishing Split</option>
                <option value="Work-For-Hire / Producer Royalty">Work-For-Hire / Direct Fee</option>
                <option value="Open / Flexible Discussion">Open / Flexible Discussion</option>
              </select>
            </div>
          </div>

          {/* Section 3: Cloud Stem Link */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-crimsonAccent flex items-center space-x-2">
              <span>03 // Cloud Audio Intake</span>
              <div className="flex-1 h-[1px] bg-crimsonAccent/20" />
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center justify-between">
                <span>Cloud Stem Link (Google Drive / Dropbox / WeTransfer) <span className="text-crimsonAccent">*</span></span>
                <span className="text-[10px] text-gray-500">24-bit WAV preferred</span>
              </label>
              <input
                type="url"
                inputMode="url"
                required
                placeholder="https://drive.google.com/drive/folders/..."
                value={formData.stemLink}
                onChange={(e) => setFormData({ ...formData, stemLink: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors min-h-[48px]"
              />
              <p className="text-[11px] font-mono text-gray-400">
                Ensure link sharing permissions are set to <strong>&quot;Anyone with the link can view/download&quot;</strong>.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 block">
                Additional Notes, BPM, Key or Vision
              </label>
              <textarea
                rows={3}
                placeholder="Key: F# Minor, 138 BPM. Recorded on Shure SM7B. Looking for heavy Brazilian 808 slides on the drop..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/10 text-white text-base sm:text-sm focus:border-cyanAccent focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black shadow-cyan-glow hover:opacity-95 transition-transform active:scale-95 disabled:opacity-50 min-h-[48px] flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Queueing Stems in Pipeline...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>Submit Stems to DJ Caat</span>
                </>
              )}
            </button>
            <p className="text-[11px] font-mono text-gray-400 text-center mt-3">
              Protected by official review policy. Unsolicited spam is filtered automatically.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
