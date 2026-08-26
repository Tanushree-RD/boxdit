"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-white/20 bg-[#0e0e0e] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Title */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
            Spotify Wrapped Style Card
          </span>
          <h3 className="mt-2 text-xl font-bold text-white">Share Your Movie DNA</h3>
          <p className="text-xs text-zinc-400">Export or share your cinematic snapshot</p>
        </div>

        {/* Wrapped Card Preview */}
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#1a140d] via-[#101010] to-[#0a0a0a] p-6 shadow-2xl">
          {/* Ambient Card Glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-[#d4c0a6]/15 blur-2xl" />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-amber-400/40 bg-zinc-800">
                <Image
                  src={avatar || FALLBACK_AVATAR}
                  alt={displayName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">{displayName}</p>
                <p className="text-xs text-zinc-400 mt-1">@{username}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">
                Boxdit Wrapped
              </span>
              <p className="text-[11px] font-mono text-zinc-400">2026</p>
            </div>
          </div>

          {/* Card Persona Hero */}
          <div className="my-5 text-center">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Your Archetype</p>
            <p className="mt-1 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-white">
              {persona.title}
            </p>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
              {persona.tagline}
            </p>
          </div>

          {/* Card Mini Stats Grid */}
          <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
            <div className="rounded-lg bg-white/[0.03] p-2">
              <p className="text-xs text-zinc-400">Watched</p>
              <p className="text-base font-bold text-white">{totalMovies}</p>
            </div>
            <div className="rounded-lg bg-white/[0.03] p-2">
              <p className="text-xs text-zinc-400">Rating</p>
              <p className="text-base font-bold text-amber-300">
                {avgRating ? `${avgRating} ★` : "—"}
              </p>
            </div>
            <div className="rounded-lg bg-white/[0.03] p-2">
              <p className="text-xs text-zinc-400">Score</p>
              <p className="text-base font-bold text-emerald-400">{nerdScore.score}/100</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleCopy}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-amber-100 active:scale-98 cursor-pointer"
          >
            {copied ? (
              <>
                <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Link Copied to Clipboard!</span>
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

          <div className="flex gap-3">
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Share on X</span>
            </a>

            {canNativeShare && (
              <button
                onClick={handleNativeShare}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>More Options</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
