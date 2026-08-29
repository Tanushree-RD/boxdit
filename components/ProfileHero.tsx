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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-10 md:p-12"
      >
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#F5B000]/[0.06] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#FFC857]/[0.04] blur-[100px]" />

        <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-10 lg:gap-14">
          {/* Avatar with golden glow */}
          <div className="relative shrink-0 mb-8 sm:mb-0">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#F5B000]/20 via-[#FFC857]/10 to-transparent blur-lg animate-pulse-glow" />
            <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 overflow-hidden rounded-full border-2 border-white/[0.08] bg-zinc-900 shadow-[0_0_60px_rgba(245,176,0,0.12)]">
              <Image
                src={avatar || FALLBACK_AVATAR}
                alt={`${displayName} avatar`}
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                className="object-cover transition-transform duration-700 hover:scale-105"
                unoptimized
              />
            </div>

            {/* Film Nerd Score badge */}
            <div className="absolute -bottom-1 -right-1 rounded-full border border-[#F5B000]/30 bg-[#070707] px-3 py-1 text-[12px] font-bold text-[#FFC857] shadow-[0_4px_20px_rgba(245,176,0,0.2)] backdrop-blur-md">
              {nerdScore.score}/100
            </div>
          </div>

          {/* User & Persona Details */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F5B000]/20 bg-[#F5B000]/[0.06] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFC857]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5B000] animate-pulse" />
                Movie DNA
              </div>
              <div className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1 text-[11px] font-medium text-zinc-400">
                {nerdScore.label}
              </div>
            </div>

            {/* Display Name */}
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl truncate max-w-full">
                {displayName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-sm">
                <span className="font-medium text-zinc-400">@{username}</span>
                <span className="text-zinc-700">·</span>
                <a
                  href={`https://letterboxd.com/${username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-[#FFC857]/60 hover:text-[#FFC857] transition-colors duration-200"
                >
                  Letterboxd Profile ↗
                </a>
              </div>
            </div>

            {/* Persona Card */}
            <div className="pt-1">
              <div className="inline-block rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5">
                <p className="text-base sm:text-lg font-semibold text-gold-gradient">
                  &ldquo;{persona.title}&rdquo;
                </p>
                <p className="mt-1 text-[13px] text-zinc-500 leading-relaxed max-w-xl">
                  {persona.tagline}
                </p>
              </div>
            </div>

            {/* Persona Traits */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              {persona.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-1.5 text-[12px] font-medium text-zinc-500"
                >
                  #{trait}
                </span>
              ))}
            </div>
          </div>

          {/* Share CTA */}
          <div className="mt-6 sm:mt-0 shrink-0 self-center">
            <motion.button
              onClick={() => setIsShareOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#F5B000] to-[#FFC857] px-7 py-3.5 text-sm font-bold text-[#070707] shadow-[0_8px_30px_rgba(245,176,0,0.25)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(245,176,0,0.35)] cursor-pointer"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
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
              <span>Share Report</span>
            </motion.button>
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
