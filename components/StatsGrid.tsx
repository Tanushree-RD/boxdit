interface StatsGridProps {
  filmsCount: number;
  followersCount: number;
  followingCount: number;
}

function formatCount(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (value >= 1_000) {
    return new Intl.NumberFormat("en-US").format(value);
  }
  return value.toString();
}

export function StatsGrid({
  filmsCount,
  followersCount,
  followingCount,
}: StatsGridProps) {
  const stats = [
    {
      label: "Movies Watched",
      value: formatCount(filmsCount),
      description: "Logged film titles",
      icon: (
        <svg
          className="h-5 w-5 text-[#d4c0a6]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      ),
    },
    {
      label: "Followers",
      value: formatCount(followersCount),
      description: "Film network reach",
      icon: (
        <svg
          className="h-5 w-5 text-[#d4c0a6]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      label: "Following",
      value: formatCount(followingCount),
      description: "Friends & cinephiles",
      icon: (
        <svg
          className="h-5 w-5 text-[#d4c0a6]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative flex h-full min-h-[220px] sm:min-h-[230px] lg:min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-8 lg:p-9 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
        >
          {/* Header */}
          <div className="flex h-6 items-center justify-between">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30">
              {stat.label}
            </p>
            <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-1.5 text-white/25 transition-colors duration-200 group-hover:text-zinc-300">
              {stat.icon}
            </div>
          </div>

          {/* Metric Value & Description */}
          <div className="pt-8 sm:pt-10">
            <p className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-none tabular-nums truncate select-all">
              {stat.value}
            </p>
            <p className="mt-3 text-xs sm:text-[13px] text-zinc-500 font-normal leading-relaxed truncate">
              {stat.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
