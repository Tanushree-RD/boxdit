import Link from "next/link";
import {
  getLetterboxdProfile,
  LetterboxdProfile,
  ProfileFetchError,
  ProfileNotFoundError,
} from "@/lib/scraper";
import { analyzeProfile } from "@/lib/analytics";
import { ProfileHero } from "@/components/ProfileHero";
import { StatsSection } from "@/components/StatsSection";
import { InsightsSection } from "@/components/InsightsSection";
import { RecentActivity } from "@/components/RecentActivity";
import { FilmGrid } from "@/components/FilmGrid";

type ReportPageProps = {
  params: Promise<{ username: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username.trim());

  let profile: LetterboxdProfile | null = null;
  let isNotFound = false;
  let errorMessage = "";

  try {
    profile = await getLetterboxdProfile(decodedUsername);
  } catch (error) {
    if (error instanceof ProfileNotFoundError) {
      isNotFound = true;
      errorMessage = `We couldn't find a Letterboxd profile for @${decodedUsername}. Please check the spelling and try again.`;
    } else if (error instanceof ProfileFetchError) {
      errorMessage = `Could not retrieve Letterboxd profile data for @${decodedUsername}. Please check your connection and try again.`;
    } else {
      errorMessage = "An unexpected error occurred while loading this profile.";
    }
  }

  if (!profile) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
          >
            ← Back to search
          </Link>

          <section className="relative overflow-hidden rounded-[36px] border border-red-500/20 bg-gradient-to-b from-red-500/[0.06] to-transparent p-8 sm:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
              {isNotFound ? "Profile Not Found" : "Connection Error"}
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {isNotFound ? `Letterboxd User Not Found` : "Unable to Load Profile"}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300">
              {errorMessage}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-300 to-amber-100 px-7 py-3.5 text-sm font-bold text-zinc-950 shadow-lg transition-all hover:scale-105"
              >
                Try Another Username
              </Link>
              <a
                href={`https://letterboxd.com/${encodeURIComponent(decodedUsername)}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Check on Letterboxd ↗
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Calculate full Spotify Wrapped style analytics
  const analytics = analyzeProfile(profile);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white selection:bg-amber-400 selection:text-black">
      {/* Dynamic ambient mesh gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 -top-40 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.08),_transparent_70%)] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(212,192,166,0.06),_transparent_70%)] blur-3xl" />
        <div className="absolute -left-20 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.05),_transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <header className="mb-8 sm:mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm font-medium text-zinc-300 transition-all hover:border-amber-400/40 hover:bg-white/10 hover:text-white backdrop-blur-md"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Search another cinephile</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Boxdit Wrapped 2026
            </span>
          </div>
        </header>

        {/* Content Flow with Generous Spacing */}
        <div className="space-y-16 sm:space-y-20 pb-20">
          {/* 1. Top Hero Section */}
          <ProfileHero
            displayName={profile.displayName}
            username={profile.username}
            avatar={profile.avatar}
            persona={analytics.persona}
            nerdScore={analytics.nerdScore}
            totalMovies={analytics.totalMoviesWatched}
            avgRating={analytics.ratings.averageRating}
            favoriteDecade={analytics.releaseYears.favoriteDecade?.decade ?? "2020s"}
          />

          {/* 2. Core 6 Stats Cards */}
          <StatsSection
            totalMovies={analytics.totalMoviesWatched}
            ratings={analytics.ratings}
            releaseYears={analytics.releaseYears}
            nerdScore={analytics.nerdScore}
          />

          {/* 3. Deep-Dive Insights Cards (8 Cards) */}
          <InsightsSection insights={analytics.insights} />

          {/* 4. Recent Diary & Activity */}
          <RecentActivity entries={profile.recentActivity} />

          {/* 5. Film Library Highlights */}
          <FilmGrid films={profile.films} username={profile.username} />
        </div>

        {/* Bottom Footer Callout */}
        <footer className="border-t border-white/10 py-10 text-center text-xs text-zinc-500">
          <p>
            Generated with Boxdit • Data sourced in realtime from Letterboxd • Not affiliated with Letterboxd Limited
          </p>
        </footer>
      </div>
    </main>
  );
}
