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
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

const smoothEase = [0.16, 1, 0.3, 1] as const;

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
      <section className="relative pb-20 sm:pb-28 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="mb-12 sm:mb-16 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-5 font-mono text-[9px] uppercase tracking-[0.28em] text-white/45"
        >
          <span>LETTERBOXD / A FILMOGRAPHIC PORTRAIT</span>
          <span>BOXDIT ARCHIVE&nbsp;&nbsp; Nº 001</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: smoothEase, delay: 0.05 }}
        >
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[#d4c0a6]/75 sm:mb-7">
            The collected cinema of
          </p>
          <h1 className="max-w-full break-words font-display text-[clamp(3.5rem,11vw,9.5rem)] font-light leading-[0.82] tracking-[-0.055em] text-[#F5F5F5]">
            {displayName}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.14 }}
          className="mt-12 grid grid-cols-1 gap-10 border-b border-white/[0.07] pb-10 sm:mt-16 sm:gap-12 lg:mt-20 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-12"
        >
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/[0.03] sm:h-24 sm:w-24">
              <Image
                src={avatar || FALLBACK_AVATAR}
                alt={`${displayName} avatar`}
                fill
                sizes="96px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">Letterboxd member</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                <span>@{username}</span>
                <span aria-hidden="true" className="text-white/20">/</span>
                <a
                  href={`https://letterboxd.com/${username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white/80"
                >
                  Letterboxd profile ↗
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-8 lg:justify-end lg:gap-12">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">Films watched</p>
              <p className="mt-1 font-display text-5xl font-light leading-none tracking-tight text-[#F5F5F5] sm:text-6xl">
                {totalMovies.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => setIsShareOpen(true)}
              className="btn-editorial btn-editorial-ghost mb-1 h-10 px-4 text-[9px] tracking-[0.18em]"
            >
              Share portrait&nbsp; ↗
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.24 }}
          className="flex flex-wrap items-baseline gap-x-7 gap-y-5 border-b border-white/[0.07] py-7 sm:gap-x-10 sm:py-8"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Signature</span>
            <span className="font-display text-lg italic font-light text-white/80 sm:text-xl">{persona.title}</span>
          </div>
          <span aria-hidden="true" className="hidden h-5 w-px bg-white/10 sm:block" />
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Mean rating</span>
            <span className="font-display text-lg font-light text-white/75 sm:text-xl">
              {avgRating ? `${avgRating.toFixed(2)} / 5` : "—"}
            </span>
          </div>
          <span aria-hidden="true" className="hidden h-5 w-px bg-white/10 sm:block" />
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Favorite era</span>
            <span className="font-display text-lg font-light text-white/75 sm:text-xl">{favoriteDecade}</span>
          </div>
          <span aria-hidden="true" className="hidden h-5 w-px bg-white/10 sm:block" />
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Index</span>
            <span className="font-display text-lg font-light text-white/75 sm:text-xl">
              {nerdScore.score}<span className="ml-1 text-xs text-white/35">/ 100</span>
            </span>
          </div>
        </motion.div>

        <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-white/45 sm:mt-10 sm:text-base">
          {persona.tagline}
        </p>
      </section>

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
