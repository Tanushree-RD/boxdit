export default function ReportLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      {/* Ambient background aura */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 -top-40 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#F5B000]/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 py-8 sm:px-8 lg:px-12">
        {/* Navigation placeholder */}
        <div className="mb-10 sm:mb-12 flex items-center justify-between">
          <div className="h-10 w-44 rounded-full bg-white/[0.03] animate-pulse" />
          <div className="h-4 w-32 rounded-full bg-white/[0.03] animate-pulse" />
        </div>

        <div className="space-y-20 sm:space-y-24 pb-24">
          {/* 1. Hero Skeleton */}
          <section className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-white/[0.015] p-6 sm:p-10 md:p-12 animate-pulse">
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#F5B000]/[0.03] blur-[100px]" />

            <div className="relative flex flex-col items-center sm:flex-row sm:items-center sm:gap-10 lg:gap-14">
              {/* Avatar circle */}
              <div className="h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full bg-white/[0.04] shrink-0 mb-8 sm:mb-0" />

              {/* Info lines */}
              <div className="flex-1 space-y-5 w-full text-center sm:text-left">
                <div className="flex justify-center sm:justify-start gap-2">
                  <div className="h-6 w-28 rounded-full bg-[#F5B000]/[0.06]" />
                  <div className="h-6 w-36 rounded-full bg-white/[0.04]" />
                </div>
                <div className="h-12 sm:h-16 w-3/4 max-w-md mx-auto sm:mx-0 rounded-2xl bg-white/[0.06]" />
                <div className="h-4 w-48 mx-auto sm:mx-0 rounded-lg bg-white/[0.03]" />
                <div className="h-16 w-full max-w-lg mx-auto sm:mx-0 rounded-2xl bg-white/[0.02]" />
                <div className="flex justify-center sm:justify-start gap-2">
                  <div className="h-6 w-20 rounded-lg bg-white/[0.03]" />
                  <div className="h-6 w-24 rounded-lg bg-white/[0.03]" />
                  <div className="h-6 w-20 rounded-lg bg-white/[0.03]" />
                </div>
              </div>

              {/* Button placeholder */}
              <div className="h-12 w-40 rounded-xl bg-[#F5B000]/[0.1] shrink-0 mt-6 sm:mt-0" />
            </div>
          </section>

          {/* 2. Core 6 Stats Skeleton */}
          <div className="space-y-5">
            <div className="h-4 w-48 rounded bg-white/[0.04] animate-pulse" />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-[28px] border border-white/[0.06] bg-white/[0.015] p-6 sm:p-7 animate-pulse space-y-5"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-28 rounded bg-white/[0.04]" />
                    <div className="h-9 w-9 rounded-xl bg-white/[0.03]" />
                  </div>
                  <div className="h-10 w-32 rounded-xl bg-white/[0.06]" />
                  <div className="h-3 w-40 rounded bg-white/[0.03]" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Deep-Dive Insights Skeleton */}
          <div className="space-y-5">
            <div className="h-4 w-40 rounded bg-white/[0.04] animate-pulse" />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-[28px] border border-white/[0.06] bg-white/[0.015] p-6 animate-pulse space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-24 rounded bg-white/[0.04]" />
                    <div className="h-8 w-8 rounded-xl bg-white/[0.03]" />
                  </div>
                  <div className="h-7 w-28 rounded-lg bg-white/[0.06]" />
                  <div className="h-3 w-36 rounded bg-white/[0.03]" />
                </div>
              ))}
            </div>
          </div>

          {/* 4. Recent Activity Skeleton */}
          <div className="space-y-5">
            <div className="h-4 w-52 rounded bg-white/[0.04] animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 sm:gap-6 rounded-[28px] border border-white/[0.06] bg-white/[0.015] p-5 sm:p-6 animate-pulse"
                >
                  <div className="h-28 w-[72px] sm:h-32 sm:w-[84px] rounded-2xl bg-white/[0.04] shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-48 rounded-lg bg-white/[0.06]" />
                    <div className="h-4 w-36 rounded bg-white/[0.03]" />
                    <div className="h-3 w-3/4 rounded bg-white/[0.02]" />
                  </div>
                  <div className="h-9 w-20 rounded-full bg-white/[0.03] shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* 5. Film Grid Skeleton */}
          <div className="space-y-5">
            <div className="h-4 w-44 rounded bg-white/[0.04] animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div
                  key={i}
                  className="rounded-[20px] border border-white/[0.06] bg-white/[0.015] p-2 animate-pulse space-y-2"
                >
                  <div className="aspect-[2/3] w-full rounded-2xl bg-white/[0.04]" />
                  <div className="h-3 w-3/4 rounded bg-white/[0.04] mx-1.5" />
                  <div className="h-2 w-1/2 rounded bg-white/[0.02] mx-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
