"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LetterboxdProfile } from "@/lib/scraper";
import { ProfileAnalytics } from "@/lib/analytics";
import { ProfileHero } from "@/components/ProfileHero";
import { RatingHistogram } from "@/components/RatingHistogram";
import { StatsSection } from "@/components/StatsSection";
import { InsightsSection } from "@/components/InsightsSection";
import { RecentActivity } from "@/components/RecentActivity";

interface ReportPageClientProps {
  profile: LetterboxdProfile;
  analytics: ProfileAnalytics;
  decodedUsername: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.08,
    },
  }),
};

export function ReportPageClient({
  profile,
  analytics,
  decodedUsername,
}: ReportPageClientProps) {
  const profileUrl = `https://letterboxd.com/${encodeURIComponent(profile.username)}/`;

  return (
    <main className="relative min-h-screen bg-[#080808] text-white selection:bg-white/20 selection:text-white">
      {/* Archival subtle grain */}
      <div className="film-grain fixed inset-0 opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12 sm:px-12 lg:px-16">
        {/* Navigation Masthead */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24 flex items-center justify-between border-b border-white/[0.08] pb-6"
        >
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors"
          >
            ← Return to Index
          </Link>

          <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 font-normal">
            DOSSIER ARCHIVE // @{decodedUsername}
          </div>
        </motion.header>

        {/* Content Flow with Generous Whitespace & Disciplined Grid Alignment */}
        <div className="space-y-32 sm:space-y-44 pb-32">
          {/* Chapter 00: Monograph Hero Section */}
          <motion.div
            variants={sectionVariants}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <ProfileHero
              displayName={profile.displayName}
              username={profile.username}
              avatar={profile.avatar}
              persona={analytics.persona}
              nerdScore={analytics.nerdScore}
              totalMovies={analytics.totalMoviesWatched}
              avgRating={analytics.ratings.averageRating}
              favoriteDecade={analytics.releaseYears.favoriteDecade?.decade ?? "Not enough data"}
            />
          </motion.div>

          {/* Chapter 01: Signature 10-Bar Rating Curve */}
          <motion.div
            variants={sectionVariants}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <RatingHistogram ratings={analytics.ratings} />
          </motion.div>

          {/* Chapters 02—05: Core Highlights (Scale, Chronology, Taste Matrix, Cinephile Index) */}
          <motion.div
            variants={sectionVariants}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <StatsSection
              totalMovies={analytics.totalMoviesWatched}
              ratings={analytics.ratings}
              releaseYears={analytics.releaseYears}
              nerdScore={analytics.nerdScore}
              genreStats={analytics.genreStats}
              actorStats={analytics.actorStats}
            />
          </motion.div>

          {/* Chapter 06: Curatorial Superlatives */}
          <motion.div
            variants={sectionVariants}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <InsightsSection insights={analytics.insights} />
          </motion.div>

          {/* Chapter 07: Recent Screening Journal */}
          <motion.div
            variants={sectionVariants}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <RecentActivity
              entries={profile.recentActivity}
              username={profile.username}
            />
          </motion.div>
        </div>

        {/* Primary Archive Outro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/[0.08] pt-24 sm:pt-32 pb-20 text-center"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block font-normal">
            PRIMARY ARCHIVE
          </span>
          <h3 className="mt-4 font-display italic font-light text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
            &ldquo;Continue exploring on Letterboxd&rdquo;
          </h3>
          <p className="mt-4 max-w-md mx-auto font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Inspect @{profile.username}&apos;s complete chronological diary, custom lists, review dispatches, and watchlist directly on Letterboxd.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial btn-editorial-primary px-8 h-11 text-[10px] tracking-[0.24em] font-normal"
            >
              <span>Open @{profile.username} on Letterboxd</span>
              <span>↗</span>
            </a>
          </div>
        </motion.div>

        {/* Footer Colophon */}
        <footer className="border-t border-white/[0.06] py-16 text-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-normal">
            Dossier compiled by Boxdit
          </p>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-neutral-600 font-normal">
            Data sourced from Letterboxd. Not affiliated with Letterboxd.
          </p>
        </footer>
      </div>
    </main>
  );
}
