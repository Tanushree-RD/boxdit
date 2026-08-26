"use client";

import { useState } from "react";
import Image from "next/image";
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
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent p-6 sm:p-10 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#f59e0b]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[#d4c0a6]/10 blur-3xl" />

        <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-8 lg:gap-10">
          {/* Avatar with glowing aura */}
          <div className="relative shrink-0 mb-6 sm:mb-0">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#f59e0b] via-[#d4c0a6] to-white/40 opacity-70 blur-sm animate-pulse" />
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 overflow-hidden rounded-full border-2 border-white/20 bg-zinc-900 shadow-2xl">
              <Image
                src={avatar || FALLBACK_AVATAR}
                alt={`${displayName} avatar`}
                fill
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                className="object-cover transition-transform duration-500 hover:scale-105"
                unoptimized
              />
            </div>

            {/* Score pill on avatar */}
            <div className="absolute -bottom-2 -right-1 rounded-full border border-amber-500/40 bg-black/90 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 shadow-lg backdrop-blur-md">
              {nerdScore.score}/100
            </div>
          </div>

          {/* User & Persona Details */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                Movie DNA
              </div>

              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                {nerdScore.label}
              </div>
            </div>

            {/* Display Name */}
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl truncate">
                {displayName}
              </h1>
              <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-zinc-400">
                <span className="font-medium text-zinc-300">@{username}</span>
                <span className="text-zinc-600">•</span>
                <a
                  href={`https://letterboxd.com/${username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-300/80 hover:text-amber-200 hover:underline underline-offset-4 transition-colors"
                >
                  Letterboxd Profile ↗
                </a>
              </div>
            </div>

            {/* Persona Subtitle & Tagline */}
            <div className="pt-2">
              <div className="inline-block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-md">
                <p className="text-base sm:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-white">
                  &ldquo;{persona.title}&rdquo;
                </p>
                <p className="mt-0.5 text-xs text-zinc-400 leading-relaxed max-w-xl">
                  {persona.tagline}
                </p>
              </div>
            </div>

            {/* Persona Traits */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
              {persona.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-zinc-400"
                >
                  #{trait}
                </span>
              ))}
            </div>
          </div>

          {/* Primary CTA: Share Report Button */}
          <div className="mt-6 sm:mt-0 shrink-0 self-center sm:self-center">
            <button
              onClick={() => setIsShareOpen(true)}
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-[#f4efe8] px-7 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_10px_35px_rgba(245,158,11,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_45px_rgba(245,158,11,0.4)] active:scale-95 cursor-pointer"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:rotate-12"
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
      </section>

      {/* Interactive Share Modal */}
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
