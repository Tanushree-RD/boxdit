import Link from "next/link";
import {
  getLetterboxdProfile,
  LetterboxdProfile,
  ProfileFetchError,
  ProfileNotFoundError,
} from "@/lib/scraper";
import { analyzeProfileAsync } from "@/lib/analytics";
import { ProfileHero } from "@/components/ProfileHero";
import { StatsSection } from "@/components/StatsSection";
import { InsightsSection } from "@/components/InsightsSection";
import { RecentActivity } from "@/components/RecentActivity";
import { ReportPageClient } from "./ReportPageClient";

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
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-red-500/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#F5B000]/[0.03] blur-[120px]" />

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 py-16 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="btn-base btn-outlined mb-10 w-fit"
          >
            ← Back to search
          </Link>

          <section className="relative overflow-hidden rounded-2xl border border-red-500/15 bg-gradient-to-b from-red-500/[0.03] to-transparent p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/15 bg-red-400/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300/80">
              {isNotFound ? "Profile Not Found" : "Connection Error"}
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {isNotFound ? "Letterboxd User Not Found" : "Unable to Load Profile"}
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400">
              {errorMessage}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="btn-base btn-filled"
              >
                Try Another Username
              </Link>
              <a
                href={`https://letterboxd.com/${encodeURIComponent(decodedUsername)}/`}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-outlined"
              >
                <span>Check on Letterboxd</span>
                <span className="text-[11px]">↗</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Calculate full Spotify Wrapped style analytics with real movie metadata
  const analytics = await analyzeProfileAsync(profile);

  return (
    <ReportPageClient
      profile={profile}
      analytics={analytics}
      decodedUsername={decodedUsername}
    />
  );
}
