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
      <section className="rounded-[24px] border border-white/10 bg-black/20 p-6">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[#d4c0a6]">
          Recent Activity
        </h2>
        <p className="mt-4 text-sm text-zinc-500">No recent activity found.</p>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-7 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4c0a6]">
            Recent Diary & Activity
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Latest 5 logged film entries & reviews
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
          {latestFive.length} entries
        </span>
      </div>

      <div className="divide-y divide-white/5">
        {latestFive.map((entry, idx) => {
          const stars = renderStars(entry.rating);
          const formattedWatchedDate = formatDate(
            entry.watchedDate || entry.pubDate
          );

          return (
            <div
              key={`${entry.link}-${idx}`}
              className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 group"
            >
              <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-md">
                <Image
                  src={entry.posterUrl || FALLBACK_POSTER}
                  alt={entry.filmTitle || entry.title}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-semibold text-white hover:text-[#d4c0a6] transition-colors truncate"
                  >
                    {entry.filmTitle || entry.title}
                  </a>
                  {entry.filmYear && (
                    <span className="text-xs text-zinc-500">
                      ({entry.filmYear})
                    </span>
                  )}
                  {entry.rewatch && (
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-300">
                      Rewatch
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm">
                  {stars && (
                    <span className="text-[#00e054] tracking-wider font-medium">
                      {stars}
                    </span>
                  )}
                  {entry.rating !== null && entry.rating !== undefined && (
                    <span className="text-xs text-zinc-400">
                      ({entry.rating} / 5)
                    </span>
                  )}
                  {formattedWatchedDate && (
                    <>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs text-zinc-400">
                        {formattedWatchedDate}
                      </span>
                    </>
                  )}
                </div>

                {entry.reviewText && (
                  <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400 pt-1">
                    {entry.reviewText}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
