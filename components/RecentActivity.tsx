import Image from "next/image";
import { RSSEntry } from "@/lib/scraper";

interface RecentActivityProps {
  entries: RSSEntry[];
}

function renderStars(rating: number | null): string {
  if (rating === null || rating === undefined) return "";
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return "★".repeat(fullStars) + (hasHalf ? "½" : "");
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

const FALLBACK_POSTER =
  "https://s.ltrbxd.com/static/img/empty-poster-70-BSf-Pjrh.png";

export function RecentActivity({ entries }: RecentActivityProps) {
  const latestFive = entries.slice(0, 5);

  if (latestFive.length === 0) {
    return (
      <section className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/80">
          Recent Activity
        </p>
        <p className="mt-3 text-sm text-zinc-500">No recent logged activity or diary entries found.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/90">
            Recent Diary & Reviews
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Latest 5 logged film entries with your personal ratings
          </p>
        </div>
        <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
          {latestFive.length} logged entries
        </span>
      </div>

      <div className="space-y-3">
        {latestFive.map((entry, idx) => {
          const stars = renderStars(entry.rating);
          const formattedWatchedDate = formatDate(
            entry.watchedDate || entry.pubDate
          );

          return (
            <div
              key={`${entry.link}-${idx}`}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent p-4 sm:p-5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/[0.05]"
            >
              {/* Larger Poster */}
              <div className="relative h-24 w-16 sm:h-28 sm:w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-md">
                <Image
                  src={entry.posterUrl || FALLBACK_POSTER}
                  alt={entry.filmTitle || entry.title}
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Film & Rating Info */}
              <div className="flex-1 min-w-0 space-y-1.5 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors truncate"
                  >
                    {entry.filmTitle || entry.title}
                  </a>

                  {entry.filmYear && (
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-zinc-400 font-mono">
                      {entry.filmYear}
                    </span>
                  )}

                  {entry.rewatch && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-purple-300">
                      🔄 Rewatch
                    </span>
                  )}
                </div>

                {/* Rating Stars & Date */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {stars ? (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 shadow-sm">
                      <span className="tracking-widest">{stars}</span>
                      <span className="text-[11px] text-emerald-300/70">({entry.rating}/5)</span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-500 italic">No rating cast</span>
                  )}

                  {formattedWatchedDate && (
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      <span>🗓 Watched</span>
                      <span className="font-medium text-zinc-300">{formattedWatchedDate}</span>
                    </div>
                  )}
                </div>

                {/* Review Excerpt */}
                {entry.reviewText && (
                  <p className="line-clamp-2 text-xs leading-relaxed text-zinc-300/80 pt-1 italic border-l-2 border-amber-500/30 pl-3">
                    &ldquo;{entry.reviewText}&rdquo;
                  </p>
                )}
              </div>

              {/* View on Letterboxd link */}
              <div className="self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span>Review</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
