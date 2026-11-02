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
  const shareText = `Check out my Letterboxd Cinematic Dossier on Boxdit: "${persona.title}" • Cinephile Index: ${nerdScore.score}/100`;

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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/85"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md border border-white/[0.12] bg-[#0A0A0B] p-8 sm:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 font-mono text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer select-none p-1 font-normal"
            >
              [ ✕ ]
            </button>

            {/* Modal Header */}
            <div className="text-center pb-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block font-normal">
                ACCREDITATION PASS
              </span>
              <h3 className="mt-2 font-display font-light text-2xl text-white tracking-tight">
                Cinephile Credential
              </h3>
            </div>

            {/* Physical Accreditation Pass Artifact */}
            <div className="relative mt-8 border border-white/[0.1] bg-[#070708] p-6 text-left">
              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden border border-white/[0.16] bg-[#101012]">
                    <Image
                      src={avatar || FALLBACK_AVATAR}
                      alt={displayName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-display font-light text-base text-white leading-none">
                      {displayName}
                    </p>
                    <p className="font-mono text-xs text-neutral-400 mt-1 font-normal">
                      @{username}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono text-[8px] uppercase tracking-widest text-neutral-500 font-normal">
                  <span className="text-white block">BOXDIT 2026</span>
                  <span>PASS 01</span>
                </div>
              </div>

              {/* Archetype Focal Point */}
              <div className="my-8 text-center">
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-neutral-500 block font-normal">
                  OFFICIAL ARCHETYPE
                </span>
                <h4 className="mt-2 font-display italic font-light text-3xl text-white">
                  &ldquo;{persona.title}&rdquo;
                </h4>
                <p className="mt-2 font-sans font-normal text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  {persona.tagline}
                </p>
              </div>

              {/* Pass Metrics Grid */}
              <div className="grid grid-cols-3 border-t border-white/[0.08] divide-x divide-white/[0.08] pt-4 text-center">
                <div className="px-2">
                  <p className="font-mono text-[8px] uppercase text-neutral-500 tracking-wider font-normal">Archive</p>
                  <p className="font-display font-light text-xl text-white mt-0.5">
                    {totalMovies.toLocaleString()}
                  </p>
                </div>
                <div className="px-2">
                  <p className="font-mono text-[8px] uppercase text-neutral-500 tracking-wider font-normal">Mean</p>
                  <p className="font-display font-light text-xl text-white mt-0.5">
                    {avgRating ? `${avgRating.toFixed(2)} ★` : "—"}
                  </p>
                </div>
                <div className="px-2">
                  <p className="font-mono text-[8px] uppercase text-neutral-500 tracking-wider font-normal">Index</p>
                  <p className="font-display font-light text-xl text-white mt-0.5">
                    {nerdScore.score}/100
                  </p>
                </div>
              </div>

              {/* Seal */}
              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-[8px] text-neutral-500 uppercase tracking-widest font-normal">
                <span>ERA: {favoriteDecade}</span>
                <span>BOXDIT.COM</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleCopy}
                className="btn-editorial btn-editorial-primary w-full h-10 text-[10px] tracking-[0.2em] font-medium cursor-pointer"
              >
                {copied ? "Link Copied to Clipboard" : "Copy Shareable Link"}
              </button>

              <div className="flex gap-3">
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-editorial btn-editorial-ghost flex-1 h-9 text-[9px] tracking-[0.16em] uppercase font-normal text-center"
                >
                  Post on X
                </a>

                {canNativeShare && (
                  <button
                    onClick={handleNativeShare}
                    className="btn-editorial btn-editorial-ghost flex-1 h-9 text-[9px] tracking-[0.16em] uppercase font-normal cursor-pointer"
                  >
                    Share Pass
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
