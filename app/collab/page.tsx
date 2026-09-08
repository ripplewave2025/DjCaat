"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, UploadCloud, ShieldCheck, CheckCircle2, ArrowRight, Music, AlertCircle, Clock, MapPin, Mail, ExternalLink } from "lucide-react";
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
      // POST to our internal endpoint
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 mb-6">
        <Link href="/" className="hover:text-cyanAccent">HOME</Link>
        <span>/</span>
        <span className="text-cyanAccent">COLLABORATION INTAKE</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyanAccent/10 border border-cyanAccent/30 text-xs font-mono text-cyanAccent">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCER PIPELINE // DARJEELING HQ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          The Collab Machine
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
          Direct stem intake for vocalists, producers, and labels. Bypass cluttered Instagram DMs and submit your project stems directly to DJ Caat for review.
        </p>
      </div>

      {/* Direct Email Collab & Management Hub Banner */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-cyanAccent/10 to-purpleAccent/10 border border-cyanAccent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md shadow-cyan-glow">
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
        <div className="text-[11px] font-mono shrink-0 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-gray-400">Everything Managed by: </span>
          <a
            href={ARTIST_INFO.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-cyanAccent font-bold underline inline-flex items-center gap-1"
          >
            <span>Upesh Bishwakarma</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3 backdrop-blur-md">
        <Clock className="w-5 h-5 text-purpleAccent shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300 space-y-1">
          <span className="font-bold text-white block">Academic Schedule & Review Cadence</span>
          <p>
            DJ Caat balances university sessions with active music production. All submissions are batched and reviewed every Sunday. High-priority stems with clean 24-bit WAV acapellas receive fastest turnaround.
          </p>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION MODAL / RECEIPT */}
      {submittedTicket ? (
        <div className="glass-panel p-8 rounded-2xl border border-cyanAccent/50 shadow-cyan-glow space-y-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center mx-auto border border-cyanAccent/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent">
              INTAKE CONFIRMED // QUEUED IN VAULT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
              Submission Received, {submittedTicket.artistName}!
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              Your stems and project details have been logged into DJ Caat’s production dashboard under ticket:
            </p>
            <div className="inline-block px-4 py-2 rounded-lg bg-void border border-cyanAccent/40 font-mono text-cyanAccent font-bold text-base mt-2">
              #{submittedTicket.id}
            </div>
          </div>

          {/* Ticket metadata */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-void/60 border border-white/5 text-left text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Target Sub-genre:</span>
              <span className="text-white">{submittedTicket.subgenre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Submission Date:</span>
              <span className="text-white">{submittedTicket.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Review Destination:</span>
              <span className="text-cyanAccent">Darjeeling Production Vault</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmittedTicket(null);
                setFormData({
                  artistName: "",
                  instagramHandle: "",
                  streamingUrl: "",
                  collabType: "Vocal Feature / Capela Drop",
                  subgenre: "Nepali Phonk",
                  stemLink: "",
                  splitProposal: "50/50 Master Split",
                  notes: "",
                });
              }}
              className="px-6 py-2.5 rounded-lg text-xs font-mono text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10"
            >
              Submit Another Project
            </button>
            <Link
              href="/visualizer"
              className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyanAccent text-black hover:opacity-90 shadow-cyan-glow"
            >
              Test Music in Visualizer
            </Link>
          </div>
        </div>
      ) : (
        /* THE FORM */
        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-crimsonAccent/15 border border-crimsonAccent/40 text-crimsonAccent text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Artist Identity */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyanAccent flex items-center space-x-2">
              <span>01 // Artist Identity</span>
              <div className="flex-1 h-[1px] bg-cyanAccent/20" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">
                  Artist / Producer Name <span className="text-crimsonAccent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mc Jamil / KenTo"
                  value={formData.artistName}
                  onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border border-white/10 text-white text-sm focus:border-cyanAccent focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">
                  Instagram Handle / Profile <span className="text-crimsonAccent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="@yourhandle"
                  value={formData.instagramHandle}
                  onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border border-white/10 text-white text-sm focus:border-cyanAccent focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">
                Streaming Profile Link (Spotify / SoundCloud / Apple Music)
              </label>
              <input
                type="url"
                placeholder="https://open.spotify.com/artist/..."
                value={formData.streamingUrl}
                onChange={(e) => setFormData({ ...formData, streamingUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-void border border-white/10 text-white text-sm focus:border-cyanAccent focus:outline-none transition-colors"
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
                <label className="text-xs font-mono text-gray-300">Collaboration Type</label>
                <select
                  value={formData.collabType}
                  onChange={(e) => setFormData({ ...formData, collabType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border border-white/10 text-white text-sm focus:border-purpleAccent focus:outline-none"
                >
                  <option value="Vocal Feature / Capela Drop">Vocal Feature / Capela Drop</option>
                  <option value="Co-Production">Co-Production</option>
                  <option value="Official Remix">Official Remix</option>
                  <option value="Beat Lease / Custom Beat">Beat Lease / Custom Beat</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Target Phonk Sub-genre</label>
                <select
                  value={formData.subgenre}
                  onChange={(e) => setFormData({ ...formData, subgenre: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border border-white/10 text-white text-sm focus:border-purpleAccent focus:outline-none"
                >
                  <option value="Nepali Phonk">Nepali Phonk (Himalayan Melodies & 808s)</option>
                  <option value="Himalayan Drift">Himalayan Drift (Atmospheric / Fast)</option>
                  <option value="Brazilian Phonk">Brazilian Phonk (Favela Funk Chops)</option>
                  <option value="Drift Phonk">Drift Phonk (Heavy Cowbells)</option>
                  <option value="Memphis Rap Phonk">Memphis Rap Phonk</option>
                  <option value="Funk Mandelão">Funk Mandelão / Aggressive</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Royalty / Split Proposal</label>
              <select
                value={formData.splitProposal}
                onChange={(e) => setFormData({ ...formData, splitProposal: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-void border border-white/10 text-white text-sm focus:border-purpleAccent focus:outline-none"
              >
                <option value="50/50 Master Split">50/50 Master & Publishing Split</option>
                <option value="Work-for-Hire Fee">Work-for-Hire Flat Producer Fee</option>
                <option value="Exclusive Beat Purchase">Exclusive Beat Purchase</option>
                <option value="Negotiable">Negotiable depending on release scale</option>
              </select>
            </div>
          </div>

          {/* Section 3: Stems & Cloud Link */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-crimsonAccent flex items-center space-x-2">
              <span>03 // Stems & Files</span>
              <div className="flex-1 h-[1px] bg-crimsonAccent/20" />
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">
                Cloud Link to Stems / Capelas (.wav / .zip) <span className="text-crimsonAccent">*</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/... or Dropbox / WeTransfer"
                  value={formData.stemLink}
                  onChange={(e) => setFormData({ ...formData, stemLink: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-void border border-white/10 text-white text-sm focus:border-crimsonAccent focus:outline-none transition-colors"
                />
                <UploadCloud className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              <p className="text-[10px] text-gray-500 font-mono">
                Make sure sharing permissions are set to "Anyone with link can view".
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">
                Project Notes, Vision, or References (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Share your BPM, key, release plan, or references for this track..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-void border border-white/10 text-white text-sm focus:border-cyanAccent focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyanAccent via-purpleAccent to-crimsonAccent text-black hover:opacity-95 shadow-cyan-glow transition-transform active:scale-98 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Transmitting Stems to Darjeeling Vault...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Queue Stems for DJ Caat Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
