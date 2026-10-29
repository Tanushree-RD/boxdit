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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.12,
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
    <main className="relative min-h-screen overflow-hidden bg-[#090B0E] text-white selection:bg-[#FF8000]/30 selection:text-white">
      {/* Subtle warm atmospheric spotlight */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 -top-40 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,128,0,0.06),_transparent_70%)] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,224,84,0.03),_transparent_70%)] blur-3xl" />
        <div className="absolute -left-20 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(64,188,244,0.03),_transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 py-8 sm:px-8 lg:px-12">
        {/* Navigation Bar */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12 flex items-center justify-between"
        >
          <Link
            href="/"
            className="btn-base btn-outlined gap-2"
          >
            <span className="text-zinc-500">←</span>
            <span>Search another cinephile</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#00E054] shadow-[0_0_8px_#00E054]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Boxdit Dossier // @{decodedUsername}
            </span>
          </div>
        </motion.header>

        {/* Content Flow with Generous Spacing */}
        <div className="space-y-16 sm:space-y-20 pb-24">
          {/* 1. Top Hero Section */}
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

          {/* 2. Signature 10-Bar Letterboxd Rating Curve */}
          <motion.div
            variants={sectionVariants}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <RatingHistogram ratings={analytics.ratings} />
          </motion.div>

          {/* 3. Core Highlights Bento Grid */}
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

          {/* 4. Deep-Dive Insights Cards */}
          <motion.div
            variants={sectionVariants}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <InsightsSection insights={analytics.insights} />
          </motion.div>

          {/* 5. Recent Diary & Activity */}
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

        {/* Letterboxd Outro CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl cinema-panel p-8 sm:p-12 text-center my-12 relative overflow-hidden shadow-2xl"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-[#00E054]/[0.08] blur-3xl" />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#00E054]">
            PRIMARY ARCHIVE
          </span>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Continue exploring on Letterboxd
          </h3>
          <p className="mt-2 max-w-md mx-auto text-xs sm:text-sm font-light text-zinc-400 leading-relaxed">
            View @{profile.username}&apos;s complete diary, lists, review dispatches, and watchlist directly on Letterboxd.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-filled gap-2 px-6 py-2.5 text-xs font-semibold shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Open @{profile.username} on Letterboxd</span>
              <span>↗</span>
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-white/[0.04] py-10 text-center">
          <p className="text-[11px] font-light text-zinc-600">
            Generated by Boxdit
          </p>
          <p className="mt-1 text-[10px] font-light text-zinc-700">
            Data sourced from Letterboxd. Not affiliated with Letterboxd.
          </p>
        </footer>
      </div>
    </main>
  );
}

