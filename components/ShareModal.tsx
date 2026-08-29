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
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

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
  const shareText = `Check out my Letterboxd Movie DNA on Boxdit! 🎬 "${persona.title}" • Film Nerd Score: ${nerdScore.score}/100`;

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
          title: `${displayName}'s Movie DNA | Boxdit`,
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-white/[0.06] bg-white/[0.03] p-2 text-zinc-500 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F5B000]/15 bg-[#F5B000]/[0.06] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFC857]/70">
                Spotify Wrapped Style Card
              </span>
              <h3 className="mt-3 text-xl font-bold text-white">
                Share Your Movie DNA
              </h3>
              <p className="mt-1 text-[13px] text-zinc-500">
                Export or share your cinematic snapshot
              </p>
            </div>

            {/* Wrapped Card Preview */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#F5B000]/15 bg-gradient-to-br from-[#12100a] via-[#0c0c0c] to-[#070707] p-6">
              {/* Ambient Card Glows */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#F5B000]/[0.1] blur-3xl" />
              <div className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-[#FFC857]/[0.06] blur-3xl" />

              {/* Card Header */}
              <div className="relative flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#F5B000]/20 bg-zinc-800">
                    <Image
                      src={avatar || FALLBACK_AVATAR}
                      alt={displayName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white leading-none">
                      {displayName}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      @{username}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFC857]/60 font-bold">
                    Boxdit Wrapped
                  </span>
                  <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                    2026
                  </p>
                </div>
              </div>

              {/* Card Persona Hero */}
              <div className="relative my-5 text-center">
                <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Your Archetype
                </p>
                <p className="mt-2 text-2xl font-black text-gold-gradient">
                  {persona.title}
                </p>
                <p className="mt-1.5 text-[12px] text-zinc-500 leading-relaxed max-w-xs mx-auto">
                  {persona.tagline}
                </p>
              </div>

              {/* Card Mini Stats */}
              <div className="relative grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4 text-center">
                <div className="rounded-xl bg-white/[0.02] p-2.5">
                  <p className="text-[11px] text-zinc-500">Watched</p>
                  <p className="text-base font-bold text-white mt-0.5">
                    {totalMovies}
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.02] p-2.5">
                  <p className="text-[11px] text-zinc-500">Rating</p>
                  <p className="text-base font-bold text-[#FFC857] mt-0.5">
                    {avgRating ? `${avgRating} ★` : "—"}
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.02] p-2.5">
                  <p className="text-[11px] text-zinc-500">Score</p>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">
                    {nerdScore.score}/100
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5B000] to-[#FFC857] px-5 py-3.5 text-sm font-bold text-[#070707] shadow-[0_4px_20px_rgba(245,176,0,0.2)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(245,176,0,0.3)] cursor-pointer"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Shareable Link</span>
                  </>
                )}
              </motion.button>

              <div className="flex gap-3">
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] py-2.5 text-[12px] font-semibold text-zinc-300 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Share on X</span>
                </a>

                {canNativeShare && (
                  <button
                    onClick={handleNativeShare}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] py-2.5 text-[12px] font-semibold text-zinc-300 transition-all duration-300 hover:bg-white/[0.06] hover:text-white cursor-pointer"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>More Options</span>
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
