import Image from "next/image";
import Link from "next/link";
import {
  getProfile,
  ProfileData,
  ProfileFetchError,
  ProfileNotFoundError,
  ProfileParseError,
} from "@/lib/scraper";

type ReportPageProps = {
  params: Promise<{ username: string }>;
};

const fallbackAvatar =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80";

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username.trim());

  let profile: ProfileData | null = null;
  let errorMessage = "";

  try {
    profile = await getProfile(decodedUsername);
  } catch (error) {
    errorMessage =
      error instanceof ProfileNotFoundError
        ? `We couldn’t find a Letterboxd profile for @${decodedUsername}.`
        : error instanceof ProfileFetchError || error instanceof ProfileParseError
          ? "We couldn’t load this Letterboxd profile right now. Please try again."
          : "Something went wrong while loading this profile.";
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen flex-col bg-[#090909] text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:bg-white/10"
          >
            ← Back to home
          </Link>

          <section className="rounded-[32px] border border-red-500/20 bg-red-500/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-red-300">Profile unavailable</p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Unable to load profile
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">{errorMessage}</p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center rounded-full bg-[#f4efe8] px-5 py-3 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              Try another username
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#090909] text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:bg-white/10"
        >
          ← Back to home
        </Link>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[#d4c0a6]/30 bg-zinc-800 shadow-[0_10px_32px_rgba(0,0,0,0.35)] sm:h-24 sm:w-24">
                <Image
                  src={profile.avatar ?? fallbackAvatar}
                  alt={`${profile.displayName} avatar`}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-[#d4c0a6]">
                  Profile overview
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {profile.displayName}
                </h1>
                <p className="text-base text-zinc-300">@{profile.username}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Followers", value: formatCount(profile.followers) },
                { label: "Following", value: formatCount(profile.following) },
                { label: "Username", value: `@${profile.username}` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <p className="text-sm text-zinc-400">{item.label}</p>
                  <p className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-[#d4c0a6]">Bio</p>
              <p className="mt-3 text-base leading-7 text-zinc-200">
                {profile.bio || "No bio available yet."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
