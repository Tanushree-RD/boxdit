import Link from "next/link";
import {
  LetterboxdProfile,
  ProfileFetchError,
  ProfileNotFoundError,
} from "@/lib/scraper";
import { ProfileAnalytics } from "@/lib/analytics";
import { getProfileReport } from "@/lib/services/profileReport";
import { ReportPageClient } from "./ReportPageClient";

type ReportPageProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function isRefreshRequested(value: string | string[] | undefined): boolean {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "" || raw === "1" || raw === "true";
}

export default async function ReportPage({
  params,
  searchParams,
}: ReportPageProps) {
  const { username } = await params;
  const { refresh } = await searchParams;
  const decodedUsername = decodeURIComponent(username.trim());

  let profile: LetterboxdProfile | null = null;
  let analytics: ProfileAnalytics | null = null;
  let isNotFound = false;
  let errorMessage = "";

  try {
    const report = await getProfileReport(decodedUsername, {
      forceRefresh: isRefreshRequested(refresh),
    });
    profile = report.profile;
    analytics = report.analytics;
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

  if (!profile || !analytics) {
    return (
      <main className="relative min-h-screen bg-[#050505] text-[#F5F5F5]">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 sm:px-10">
          <Link
            href="/"
            className="btn-editorial btn-editorial-ghost mb-12 w-fit text-[11px]"
          >
            ← Return to Index
          </Link>

          <section className="border-t border-b border-white/[0.06] py-16">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 block font-normal">
              {isNotFound ? "404 // PROFILE UNRESOLVED" : "502 // LEDGER ERROR"}
            </span>

            <h1 className="mt-4 font-display italic font-light text-4xl sm:text-5xl text-[#F5F5F5]">
              {isNotFound ? "Dossier Not Found" : "Unable to Retrieve Archive"}
            </h1>

            <p className="mt-4 max-w-xl text-sm font-sans font-normal leading-relaxed text-white/55">
              {errorMessage}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="btn-editorial btn-editorial-primary text-[10px] tracking-[0.18em] h-9 px-4 font-medium"
              >
                Search Another Handle
              </Link>
              <a
                href={`https://letterboxd.com/${encodeURIComponent(decodedUsername)}/`}
                target="_blank"
                rel="noreferrer"
                className="btn-editorial btn-editorial-ghost text-[10px] tracking-[0.18em] h-9 px-4 font-normal"
              >
                <span>Letterboxd Profile</span>
                <span className="text-neutral-500">↗</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <ReportPageClient
      profile={profile}
      analytics={analytics}
      decodedUsername={decodedUsername}
    />
  );
}
