"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LetterboxdProfile } from "@/lib/scraper";
import { ProfileAnalytics } from "@/lib/analytics";
import { ProfileHero } from "@/components/ProfileHero";
import { StatsSection } from "@/components/StatsSection";
import { InsightsSection } from "@/components/InsightsSection";
import { RecentActivity } from "@/components/RecentActivity";
import { FilmGrid } from "@/components/FilmGrid";

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
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white selection:bg-[#F5B000]/30 selection:text-white">
      {/* Dynamic ambient mesh gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 -top-40 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,176,11,0.06),_transparent_70%)] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,200,87,0.04),_transparent_70%)] blur-3xl" />
        <div className="absolute -left-20 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.03),_transparent_70%)] blur-3xl" />
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
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-[13px] font-medium text-zinc-400 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
              ←
            </span>
            <span>Search another cinephile</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Boxdit Wrapped 2026
            </span>
          </div>
        </motion.header>

        {/* Content Flow with Generous Spacing */}
        <div className="space-y-20 sm:space-y-24 pb-24">
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

          {/* 2. Core 6 Hero Stats Cards */}
          <motion.div
            variants={sectionVariants}
            custom={1}
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

          {/* 3. Deep-Dive Insights Cards */}
          <motion.div
            variants={sectionVariants}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <InsightsSection insights={analytics.insights} />
          </motion.div>

          {/* 4. Recent Diary & Activity */}
          <motion.div
            variants={sectionVariants}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <RecentActivity entries={profile.recentActivity} />
          </motion.div>

          {/* 5. Film Library Highlights */}
          <motion.div
            variants={sectionVariants}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <FilmGrid films={profile.films} username={profile.username} />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.04] py-10 text-center">
          <p className="text-[12px] text-zinc-600">
            Generated with Boxdit • Data sourced in realtime from Letterboxd • Not affiliated with Letterboxd Limited
          </p>
        </footer>
      </div>
    </main>
  );
}
