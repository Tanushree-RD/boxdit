import Link from "next/link";
import {
  getLetterboxdProfile,
  LetterboxdProfile,
  ProfileFetchError,
  ProfileNotFoundError,
} from "@/lib/scraper";
import { ProfileHeader } from "@/components/ProfileHeader";
import { StatsGrid } from "@/components/StatsGrid";
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
      <main className="flex min-h-screen flex-col bg-[#090909] text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
          >
            ← Back to home
          </Link>

          <section className="rounded-[32px] border border-red-500/20 bg-red-500/[0.04] p-8 sm:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-red-300">
              {isNotFound ? "Profile Not Found" : "Scraping Error"}
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isNotFound
                ? `Letterboxd user not found`
                : "Unable to load profile"}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300">
              {errorMessage}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-[#f4efe8] px-6 py-3 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
              >
                Try another username
              </Link>
              <a
                href={`https://letterboxd.com/${encodeURIComponent(decodedUsername)}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Check on Letterboxd ↗
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#090909] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation back bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
          >
            ← Back to search
          </Link>

          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Realtime Scraped Profile
          </span>
        </div>

        <div className="space-y-8">
          {/* Header Card */}
          <section className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <ProfileHeader
              displayName={profile.displayName}
              username={profile.username}
              avatar={profile.avatar}
            />
          </section>

          {/* Quick Stats Grid */}
          <StatsGrid
            filmsCount={profile.filmsCount}
            followersCount={profile.followersCount}
            followingCount={profile.followingCount}
          />

          {/* Recent Activity (Latest 5 diary entries) */}
          <RecentActivity entries={profile.recentActivity} />

          {/* Recent Films Grid (First 12 films) */}
          <FilmGrid films={profile.films} username={profile.username} />
        </div>
      </div>
    </main>
  );
}
