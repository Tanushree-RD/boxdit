"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PersonaInfo, FilmNerdScore } from "@/lib/analytics";
import { ShareModal } from "./ShareModal";

interface ProfileHeroProps {
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

export function ProfileHero({
  displayName,
  username,
  avatar,
  persona,
  nerdScore,
  totalMovies,
  avgRating,
  favoriteDecade,
}: ProfileHeroProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl cinema-panel p-7 sm:p-10 lg:p-12 shadow-2xl"
      >
        {/* Filmic Lighting Accents */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#FF8000]/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#00E054]/[0.04] blur-3xl" />
        
        {/* Perforated Film Strip Detail Indicator in top-right */}
        <div className="absolute right-6 top-6 hidden sm:flex items-center gap-1.5 opacity-30 select-none">
          <span className="h-3 w-2 rounded-[1px] border border-white/40" />
          <span className="h-3 w-2 rounded-[1px] border border-white/40" />
          <span className="h-3 w-2 rounded-[1px] border border-white/40" />
          <span className="text-[10px] font-mono tracking-widest uppercase ml-1">35MM CANON</span>
        </div>

        <div className="relative flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:gap-10">
          {/* Avatar with Festival Pass Ring */}
          <div className="relative shrink-0 mb-6 lg:mb-0">
            <div className="relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full border-2 border-white/[0.12] bg-[#14181C] p-1 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={avatar || FALLBACK_AVATAR}
                  alt={`${displayName} avatar`}
                  fill
                  sizes="(max-width: 640px) 128px, 144px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Nerd Score Stamp Badge */}
            <div className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full border border-[#FF8000]/30 bg-[#14181C] px-3 py-1 text-[11px] font-mono font-bold text-[#FF8000] shadow-lg">
              <span>{nerdScore.score}</span>
              <span className="text-[9px] text-zinc-500 font-normal">/100</span>
            </div>
          </div>

          {/* User & Persona Details */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF8000]/25 bg-[#FF8000]/[0.08] px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[#FF9526] uppercase font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000] animate-pulse" />
                Verified Dossier
              </span>
              <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-zinc-400">
                {nerdScore.label}
              </span>
            </div>

            {/* Display Name & Handle */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {displayName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm text-zinc-400">
                <span className="font-mono text-zinc-300">@{username}</span>
                <span className="text-zinc-600 select-none">·</span>
                <a
                  href={`https://letterboxd.com/${username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#00E054] hover:underline underline-offset-4 transition-colors"
                >
                  <span>Letterboxd Profile</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>

            {/* Archetype Editorial Banner */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5 text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF8000]/80">
                Cinematic Archetype
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-serif italic font-normal text-white">
                &ldquo;{persona.title}&rdquo;
              </h2>
              <p className="mt-1.5 text-xs sm:text-[13px] text-zinc-400 leading-relaxed max-w-2xl font-normal">
                {persona.tagline}
              </p>

              {/* Persona Traits */}
              <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                {persona.traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-mono text-zinc-300"
                  >
                    #{trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Share Action Button */}
          <div className="mt-6 lg:mt-0 shrink-0 self-center lg:self-start">
            <button
              onClick={() => setIsShareOpen(true)}
              className="btn-base btn-filled gap-2 px-5 py-2.5 text-xs font-semibold cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span>Share Dossier</span>
            </button>
          </div>
        </div>

        {/* Quick Ticker Ribbon */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/[0.06] pt-6">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Films Logged
            </span>
            <p className="text-xl font-bold text-white font-mono mt-0.5">
              {totalMovies.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Mean Rating
            </span>
            <p className="text-xl font-bold text-[#00E054] font-mono mt-0.5">
              {avgRating ? `${avgRating.toFixed(2)} ★` : "—"}
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Peak Era
            </span>
            <p className="text-xl font-bold text-white font-mono mt-0.5">
              {favoriteDecade}
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Percentile Rank
            </span>
            <p className="text-xl font-bold text-[#FF8000] font-mono mt-0.5">
              {nerdScore.percentile || "Top 5%"}
            </p>
          </div>
        </div>
      </motion.section>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        displayName={displayName}
        username={username}
        avatar={avatar}
        persona={persona}
        nerdScore={nerdScore}
        totalMovies={totalMovies}
        avgRating={avgRating}
        favoriteDecade={favoriteDecade}
      />
    </>
  );
}
