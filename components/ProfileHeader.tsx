import Image from "next/image";

interface ProfileHeaderProps {
  displayName: string;
  username: string;
  avatar: string | null;
}

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80";

export function ProfileHeader({
  displayName,
  username,
  avatar,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-[#d4c0a6]/40 bg-zinc-800 shadow-[0_10px_32px_rgba(0,0,0,0.5)] sm:h-28 sm:w-28">
        <Image
          src={avatar || FALLBACK_AVATAR}
          alt={`${displayName} avatar`}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4c0a6]/30 bg-[#d4c0a6]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#d4c0a6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4c0a6] animate-pulse" />
          Letterboxd Member
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {displayName}
        </h1>

        <div className="flex items-center gap-3">
          <p className="text-base text-zinc-400">@{username}</p>
          <span className="text-zinc-600">•</span>
          <a
            href={`https://letterboxd.com/${username}/`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#d4c0a6] hover:underline underline-offset-4 transition-colors"
          >
            View on Letterboxd ↗
          </a>
        </div>
      </div>
    </div>
  );
}
