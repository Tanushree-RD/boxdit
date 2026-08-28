import Image from "next/image";
import { InsightCardData } from "@/lib/analytics";

interface InsightsSectionProps {
  insights: InsightCardData[];
}

const FALLBACK_POSTER =
  "https://s.ltrbxd.com/static/img/empty-poster-70-BSf-Pjrh.png";

const ICON_MAP: Record<string, string> = {
  director: "🎬",
  trophy: "🏆",
  "thumb-down": "📉",
  drama: "🎭",
  globe: "🌐",
  clock: "⏱",
  film: "🎞",
  calendar: "🗓",
};

export function InsightsSection({ insights }: InsightsSectionProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/90">
            Deep-Dive Insights
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Patterns, milestones, and quirks in your taste
          </p>
        </div>
        <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
          {insights.length} insights
        </span>
      </div>

      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((item) => {
          const emojiIcon = ICON_MAP[item.icon] || "✨";

          return (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent p-5 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_16px_45px_rgba(0,0,0,0.4)]"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  {item.title}
                </span>
                <span className="text-lg">{emojiIcon}</span>
              </div>

              {/* Content with optional poster thumbnail */}
              <div className="my-3 flex items-center gap-3">
                {item.posterUrl && (
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md border border-white/10 bg-zinc-900 shadow-md">
                    <Image
                      src={item.posterUrl || FALLBACK_POSTER}
                      alt={item.value}
                      fill
                      sizes="40px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p
                    title={item.value}
                    className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors truncate"
                  >
                    {item.value}
                  </p>
                  <p
                    title={item.subtitle}
                    className="mt-0.5 text-xs text-zinc-400 leading-snug line-clamp-2"
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom detail pill or link */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Verified Snapshot</span>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400/80 hover:text-amber-300 hover:underline"
                  >
                    View film ↗
                  </a>
                ) : (
                  <span className="text-zinc-600">Boxdit AI</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

