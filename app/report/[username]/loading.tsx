export default function ReportLoading() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#F5F5F5]">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12 sm:px-12">
        {/* Navigation placeholder */}
        <div className="mb-16 sm:mb-24 flex items-center justify-between border-b border-white/[0.06] pb-6">
          <div className="h-4 w-32 bg-white/[0.04] animate-pulse" />
          <div className="h-3 w-28 bg-white/[0.04] animate-pulse" />
        </div>

        <div className="space-y-36 sm:space-y-48 pb-32">
          {/* 1. Hero Skeleton */}
          <section className="border-t border-b border-white/[0.06] py-14 animate-pulse">
            <div className="flex flex-col sm:flex-row items-start gap-10">
              <div className="h-32 w-32 bg-[#0D0D0D] shrink-0 border border-white/[0.06]" />
              <div className="flex-1 space-y-6 w-full">
                <div className="h-3 w-24 bg-white/[0.04]" />
                <div className="h-12 w-3/4 max-w-md bg-white/[0.06]" />
                <div className="h-8 w-2/3 bg-white/[0.03]" />
                <div className="h-16 w-full max-w-xl bg-white/[0.02]" />
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 border-t border-white/[0.06] divide-x divide-white/[0.06] pt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="px-6 h-16 bg-[#0D0D0D]" />
              ))}
            </div>
          </section>

          {/* 2. Rating Histogram Skeleton */}
          <section className="border-t border-b border-white/[0.06] py-14 animate-pulse">
            <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-8">
              <div className="space-y-3">
                <div className="h-3 w-32 bg-white/[0.04]" />
                <div className="h-8 w-48 bg-white/[0.06]" />
              </div>
              <div className="h-6 w-28 bg-white/[0.04]" />
            </div>
            <div className="pt-12 flex h-52 items-end justify-between gap-4 px-2">
              {[25, 40, 55, 75, 90, 100, 70, 50, 30, 15].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/[0.04]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </section>

          {/* 3. Core Highlights Grid Skeleton */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 border-t border-b border-white/[0.06] py-8 animate-pulse bg-[#0D0D0D]"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
