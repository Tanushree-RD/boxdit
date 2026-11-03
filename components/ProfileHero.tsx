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
      <section className="relative pb-16 sm:pb-24">
        {/* Monograph Top Meta Ledger */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-14 sm:mb-20 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 font-normal"
        >
          <span>MONOGRAPH 001 // ARCHIVAL DOSSIER</span>
          <span>Index: {nerdScore.score}/100 · {nerdScore.label}</span>
        </motion.div>

        {/* 12-Column Asymmetric Monograph Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Column (8 cols): Typography, Identity & Narrative Archetype */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* User Identity */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: smoothEase, delay: 0.05 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 font-mono text-xs text-white/55 font-normal">
                  <span>@{username}</span>
                  <span className="text-white/20">/</span>
                  <a
                    href={`https://letterboxd.com/${username}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/55 hover:text-[#F5F5F5] transition-colors duration-300 text-[10px] tracking-[0.2em] uppercase"
                  >
                    Letterboxd Profile ↗
                  </a>
                </div>

                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-light tracking-tight text-[#F5F5F5] leading-[0.92]">
                  {displayName}
                </h1>
              </motion.div>

              {/* Archetype Pull-Quote */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: smoothEase, delay: 0.12 }}
                className="mt-12 sm:mt-16 pt-10 border-t border-white/[0.06]"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 block mb-4 font-normal">
                  DIAGNOSED ARCHETYPE
                </span>
                <h2 className="font-display italic font-light text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.08]">
                  &ldquo;{persona.title}&rdquo;
                </h2>
                <p className="mt-5 max-w-xl font-sans font-normal text-sm sm:text-base text-white/55 leading-relaxed">
                  {persona.tagline}
                </p>

                {/* Persona Traits */}
                <div className="mt-8 flex flex-wrap gap-4 font-mono text-[9px] uppercase tracking-[0.24em] text-white/55">
                  {persona.traits.map((trait, idx) => (
                    <span key={trait}>
                      {idx > 0 && <span className="mr-4 text-white/20">·</span>}
                      #{trait}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column (4 cols): Archival Photographic Portrait & Export */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: smoothEase, delay: 0.18 }}
            className="lg:col-span-4 flex flex-col items-start lg:items-end"
          >
            <div className="group w-full max-w-xs space-y-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/[0.06] bg-[#0D0D0D]">
                <Image
                  src={avatar || FALLBACK_AVATAR}
                  alt={`${displayName} portrait`}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover grayscale contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  unoptimized
                />
              </div>

              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-white/55 font-normal">
                <span>FIG. 01 — ARCHIVAL PORTRAIT</span>
                <span>@{username}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="btn-editorial btn-editorial-ghost font-mono text-[9px] tracking-[0.24em] h-10 w-full px-4 uppercase font-normal cursor-pointer justify-between"
                >
                  <span>Export Archival Pass</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Archival Baseline Specimen Ledger with Staggered Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: smoothEase, delay: 0.24 }}
          className="mt-20 sm:mt-28 border-t border-white/[0.06] pt-12 sm:pt-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                label: "Films Logged",
                value: totalMovies.toLocaleString(),
                caption: "Catalogued total",
              },
              {
                label: "Mean Rating",
                value: avgRating ? `${avgRating.toFixed(2)} ★` : "—",
                caption: "Critical baseline",
              },
              {
                label: "Dominant Era",
                value: favoriteDecade,
                caption: "Temporal center",
              },
              {
                label: "Percentile Rank",
                value: nerdScore.percentile || "Top 5%",
                caption: "Letterboxd cohort",
              },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: smoothEase, delay: 0.28 + i * 0.05 }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/55 block font-normal">
                  {metric.label}
                </span>
                <p className="font-display font-light text-4xl sm:text-5xl text-[#F5F5F5] mt-2">
                  {metric.value}
                </p>
                <p className="mt-1 font-mono text-[10px] text-white/40 font-normal">
                  {metric.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Share Modal Dialog */}
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
