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
        className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8 md:p-10"
      >
        <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-8 lg:gap-12">
          {/* Avatar */}
          <div className="relative shrink-0 mb-6 sm:mb-0">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 overflow-hidden rounded-full border border-white/[0.1] bg-zinc-900">
              <Image
                src={avatar || FALLBACK_AVATAR}
                alt={`${displayName} avatar`}
                fill
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Film Nerd Score badge */}
            <div className="absolute -bottom-1 -right-1 rounded-full border border-white/[0.12] bg-zinc-950 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-300 font-mono">
              {nerdScore.score}/100
            </div>
          </div>

          {/* User & Persona Details */}
          <div className="flex-1 min-w-0 space-y-3.5">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-0.5 text-[11px] font-medium text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Movie DNA
              </div>
              <div className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-0.5 text-[11px] font-medium text-zinc-500 font-mono">
                {nerdScore.label}
              </div>
            </div>

            {/* Display Name */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl truncate max-w-full">
                {displayName}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm">
                <span className="font-normal text-zinc-400">@{username}</span>
                <span className="text-zinc-700">·</span>
                <a
                  href={`https://letterboxd.com/${username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-zinc-500 hover:text-white transition-colors duration-200"
                >
                  Letterboxd Profile ↗
                </a>
              </div>
            </div>

            {/* Persona Card */}
            <div className="pt-0.5">
              <div className="inline-block rounded-xl border border-white/[0.07] bg-white/[0.015] px-4 py-3">
                <p className="text-sm sm:text-base font-semibold text-zinc-200">
                  &ldquo;{persona.title}&rdquo;
                </p>
                <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed max-w-xl font-normal">
                  {persona.tagline}
                </p>
              </div>
            </div>

            {/* Persona Traits */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
              {persona.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-md border border-white/[0.05] bg-white/[0.015] px-2.5 py-0.5 text-[11px] font-normal text-zinc-500"
                >
                  #{trait}
                </span>
              ))}
            </div>
          </div>

          {/* Share CTA */}
          <div className="mt-6 sm:mt-0 shrink-0 self-center">
            <button
              onClick={() => setIsShareOpen(true)}
              className="group relative inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-2 text-xs sm:text-sm font-medium text-white transition-colors duration-200 hover:border-white/[0.2] hover:bg-white/[0.08] cursor-pointer"
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
            </button>
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
