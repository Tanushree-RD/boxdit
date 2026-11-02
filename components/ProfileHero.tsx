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
        className="relative border-t border-b border-white/[0.08] py-12 sm:py-16"
      >
        {/* Top Meta Line: Small Uppercase Tracked */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-8 mb-10 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-normal">
          <span>MONOGRAPH // @{username}</span>
          <span>Index: {nerdScore.score}/100 · {nerdScore.label}</span>
        </div>

        {/* Hero Identity Body */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
          {/* Avatar in Minimal Hairline Frame */}
          <div className="relative shrink-0 mb-8 lg:mb-0">
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden border border-white/[0.12] bg-[#101012]">
              <Image
                src={avatar || FALLBACK_AVATAR}
                alt={`${displayName} avatar`}
                fill
                sizes="(max-width: 640px) 112px, 144px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* User Details & Archetype Synthesis */}
          <div className="flex-1 min-w-0 space-y-8">
            <div>
              <div className="flex flex-wrap items-baseline gap-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-light tracking-tight text-white leading-none">
                  {displayName}
                </h1>
                <span className="font-mono text-xs text-neutral-500 font-normal">
                  @{username}
                </span>
                <a
                  href={`https://letterboxd.com/${username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
                >
                  [ Letterboxd ↗ ]
                </a>
              </div>

              {/* Archetype Editorial Headline */}
              <div className="mt-8 pt-8 border-t border-white/[0.06]">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block mb-2 font-normal">
                  Diagnosed Archetype
                </span>
                <h2 className="font-display italic font-light text-3xl sm:text-5xl text-white leading-tight">
                  &ldquo;{persona.title}&rdquo;
                </h2>
                <p className="mt-4 max-w-2xl font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {persona.tagline}
                </p>

                {/* Persona Traits */}
                <div className="mt-6 flex flex-wrap gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                  {persona.traits.map((trait, idx) => (
                    <span key={trait}>
                      {idx > 0 && <span className="mr-3 text-neutral-700">·</span>}
                      #{trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Share Action */}
          <div className="mt-8 lg:mt-0 shrink-0 self-start">
            <button
              onClick={() => setIsShareOpen(true)}
              className="btn-editorial btn-editorial-ghost font-mono text-[9px] tracking-[0.2em] h-9 px-4 uppercase font-normal cursor-pointer"
            >
              <span>Export Pass</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 4-Metric Grid Communicating via Typography */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 border-t border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] pt-8 sm:pt-0">
          <div className="py-6 sm:py-8 sm:px-8 sm:first:pl-0">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block font-normal">
              Films Logged
            </span>
            <p className="font-display font-light text-3xl sm:text-4xl text-white mt-2">
              {totalMovies.toLocaleString()}
            </p>
          </div>

          <div className="py-6 sm:py-8 sm:px-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block font-normal">
              Mean Rating
            </span>
            <p className="font-display font-light text-3xl sm:text-4xl text-white mt-2">
              {avgRating ? `${avgRating.toFixed(2)} ★` : "—"}
            </p>
          </div>

          <div className="py-6 sm:py-8 sm:px-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block font-normal">
              Dominant Era
            </span>
            <p className="font-display font-light text-3xl sm:text-4xl text-white mt-2">
              {favoriteDecade}
            </p>
          </div>

          <div className="py-6 sm:py-8 sm:px-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block font-normal">
              Percentile Rank
            </span>
            <p className="font-display font-light text-3xl sm:text-4xl text-white mt-2">
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
