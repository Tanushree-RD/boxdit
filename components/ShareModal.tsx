"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PersonaInfo, FilmNerdScore } from "@/lib/analytics";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  displayName: string;
  username: string;
  avatar: string | null;
  persona: PersonaInfo;
  nerdScore: FilmNerdScore;
  totalMovies: number;
  avgRating: number | null;
  favoriteDecade: string;
}

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

export function ShareModal({
  isOpen,
  onClose,
  displayName,
  username,
  avatar,
  persona,
  nerdScore,
  totalMovies,
  avgRating,
  favoriteDecade,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare] = useState(
    () => typeof navigator !== "undefined" && typeof navigator.share === "function"
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out my Letterboxd Cinematic Dossier on Boxdit! 🎬 "${persona.title}" • Film Nerd Score: ${nerdScore.score}/100`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName}'s Cinematic Dossier | Boxdit`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user dismissed
      }
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0E1216] p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-zinc-400 transition-colors duration-200 hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white cursor-pointer select-none"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF8000]/30 bg-[#FF8000]/[0.08] px-3.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#FF9526]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000]" />
                Festival Accreditation Pass
              </span>
              <h3 className="mt-2.5 text-xl sm:text-2xl font-bold text-white tracking-tight">
                Your Cinephile Credential
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Editorial artifact ready for social export
              </p>
            </div>

            {/* Physical Festival Pass Artifact */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-[#181D23] via-[#12161B] to-[#0A0D10] p-6 shadow-2xl">
              {/* Film Grain Texture */}
              <div className="film-grain absolute inset-0 opacity-25 pointer-events-none" />

              {/* Faint Amber & Green Atmospheric Bleeds */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#FF8000]/[0.12] blur-2xl" />
              <div className="pointer-events-none absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-[#00E054]/[0.08] blur-2xl" />

              {/* Pass Header */}
              <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/[0.2] bg-[#14181C] shadow-md">
                    <Image
                      src={avatar || FALLBACK_AVATAR}
                      alt={displayName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none">
                      {displayName}
                    </p>
                    <p className="text-xs font-mono text-[#00E054] mt-1">
                      @{username}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF8000] font-bold block">
                    BOXDIT 2026
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    DOSSIER PASS
                  </span>
                </div>
              </div>

              {/* Archetype Focal Point */}
              <div className="relative my-6 text-center">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                  OFFICIAL ARCHETYPE
                </span>
                <h4 className="mt-1 text-2xl font-serif italic text-white font-normal">
                  &ldquo;{persona.title}&rdquo;
                </h4>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  {persona.tagline}
                </p>
              </div>

              {/* Pass Metrics Grid */}
              <div className="relative grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4 text-center">
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.03] p-2.5">
                  <p className="text-[10px] font-mono uppercase text-zinc-400">Archive</p>
                  <p className="text-base font-bold text-white font-mono mt-0.5">
                    {totalMovies.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.03] p-2.5">
                  <p className="text-[10px] font-mono uppercase text-zinc-400">Mean</p>
                  <p className="text-base font-bold text-[#00E054] font-mono mt-0.5">
                    {avgRating ? `${avgRating.toFixed(2)} ★` : "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.03] p-2.5">
                  <p className="text-[10px] font-mono uppercase text-zinc-400">Quotient</p>
                  <p className="text-base font-bold text-[#FF8000] font-mono mt-0.5">
                    {nerdScore.score}/100
                  </p>
                </div>
              </div>

              {/* Watermark / Seal */}
              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                <span>ERA: {favoriteDecade} · VERIFIED INDEX</span>
                <span>BOXDIT.COM</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={handleCopy}
                className="btn-base btn-filled w-full py-2.5 text-xs font-semibold shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Link Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Shareable Link</span>
                  </>
                )}
              </button>

              <div className="flex gap-2.5">
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-base btn-outlined flex-1 text-xs"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Post on X</span>
                </a>

                {canNativeShare && (
                  <button
                    onClick={handleNativeShare}
                    className="btn-base btn-outlined flex-1 text-xs cursor-pointer"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Share Pass</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
