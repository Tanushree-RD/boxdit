export default function ReportLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      {/* Ambient background aura */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 -top-40 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#F5B000]/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 py-8 sm:px-8 lg:px-12">
        {/* Navigation placeholder */}
        <div className="mb-10 sm:mb-12 flex items-center justify-between">
          <div className="h-9 w-36 rounded-full bg-white/[0.03] animate-pulse" />
          <div className="h-4 w-28 rounded-full bg-white/[0.03] animate-pulse" />
        </div>

        <div className="space-y-16 sm:space-y-20 pb-24">
          {/* 1. Hero Skeleton */}
          <section className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8 md:p-10 animate-pulse">
            <div className="relative flex flex-col items-center sm:flex-row sm:items-center sm:gap-8 lg:gap-12">
              {/* Avatar circle */}
              <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full bg-white/[0.04] shrink-0 mb-6 sm:mb-0" />

              {/* Info lines */}
              <div className="flex-1 space-y-4 w-full text-center sm:text-left">
                <div className="flex justify-center sm:justify-start gap-2">
                  <div className="h-5 w-24 rounded-full bg-white/[0.04]" />
                  <div className="h-5 w-28 rounded-full bg-white/[0.03]" />
                </div>
                <div className="h-10 sm:h-12 w-3/4 max-w-sm mx-auto sm:mx-0 rounded-xl bg-white/[0.05]" />
                <div className="h-3.5 w-40 mx-auto sm:mx-0 rounded bg-white/[0.03]" />
                <div className="h-14 w-full max-w-md mx-auto sm:mx-0 rounded-xl bg-white/[0.02]" />
                <div className="flex justify-center sm:justify-start gap-2">
                  <div className="h-5 w-16 rounded-md bg-white/[0.03]" />
                  <div className="h-5 w-20 rounded-md bg-white/[0.03]" />
                  <div className="h-5 w-16 rounded-md bg-white/[0.03]" />
                </div>
              </div>

              {/* Button placeholder */}
              <div className="h-9 w-32 rounded-xl bg-white/[0.05] shrink-0 mt-6 sm:mt-0" />
            </div>
          </section>

          {/* 2. Core 6 Stats Skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-44 rounded bg-white/[0.04] animate-pulse" />
            <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 sm:p-6 animate-pulse space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-24 rounded bg-white/[0.04]" />
                    <div className="h-7 w-7 rounded-lg bg-white/[0.03]" />
                  </div>
                  <div className="h-8 w-28 rounded-lg bg-white/[0.06]" />
                  <div className="h-3 w-36 rounded bg-white/[0.03]" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Deep-Dive Insights Skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-36 rounded bg-white/[0.04] animate-pulse" />
            <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 animate-pulse space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-20 rounded bg-white/[0.04]" />
                    <div className="h-7 w-7 rounded-lg bg-white/[0.03]" />
                  </div>
                  <div className="h-6 w-24 rounded-lg bg-white/[0.06]" />
                  <div className="h-3 w-32 rounded bg-white/[0.03]" />
                </div>
              ))}
            </div>
          </div>

          {/* 4. Recent Activity Skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-48 rounded bg-white/[0.04] animate-pulse" />
            <div className="divide-y divide-white/[0.06]">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 sm:gap-6 py-6 animate-pulse"
                >
                  <div className="h-[84px] w-[56px] sm:w-[64px] rounded-md bg-white/[0.04] shrink-0" />
                  <div className="flex-1 space-y-2.5 pt-1">
                    <div className="h-4 w-44 rounded bg-white/[0.06]" />
                    <div className="h-3 w-32 rounded bg-white/[0.03]" />
                    <div className="h-3 w-2/3 rounded bg-white/[0.02]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
