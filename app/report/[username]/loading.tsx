export default function ReportLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      {/* Ambient background aura */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 -top-40 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation placeholder */}
        <div className="mb-8 sm:mb-10 flex items-center justify-between">
          <div className="h-8 w-40 rounded-full bg-white/5 animate-pulse" />
          <div className="h-4 w-28 rounded-full bg-white/5 animate-pulse" />
        </div>

        <div className="space-y-16 sm:space-y-20 pb-20">
          {/* 1. Hero Skeleton */}
          <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.02] p-6 sm:p-10 md:p-12 backdrop-blur-2xl animate-pulse">
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-8 lg:gap-10">
              {/* Avatar circle */}
              <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full bg-white/10 shrink-0 mb-6 sm:mb-0" />

              {/* Info lines */}
              <div className="flex-1 space-y-4 w-full text-center sm:text-left">
                <div className="flex justify-center sm:justify-start gap-2">
                  <div className="h-5 w-24 rounded-full bg-amber-500/20" />
                  <div className="h-5 w-32 rounded-full bg-white/10" />
                </div>
                <div className="h-10 sm:h-14 w-3/4 max-w-md mx-auto sm:mx-0 rounded-2xl bg-white/10" />
                <div className="h-4 w-40 mx-auto sm:mx-0 rounded-lg bg-white/5" />
                <div className="h-14 w-full max-w-lg mx-auto sm:mx-0 rounded-2xl bg-white/[0.04]" />
              </div>

              {/* Button placeholder */}
              <div className="h-12 w-36 rounded-full bg-amber-400/20 shrink-0 mt-6 sm:mt-0" />
            </div>
          </section>

          {/* 2. Core 6 Stats Skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-44 rounded bg-white/10 animate-pulse" />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-7 backdrop-blur-xl animate-pulse space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-28 rounded bg-white/10" />
                    <div className="h-6 w-6 rounded-full bg-white/10" />
                  </div>
                  <div className="h-9 w-32 rounded-xl bg-white/10" />
                  <div className="h-3 w-40 rounded bg-white/5" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Deep-Dive Insights Skeleton (8 cards) */}
          <div className="space-y-4">
            <div className="h-4 w-36 rounded bg-white/10 animate-pulse" />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="rounded-[26px] border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl animate-pulse space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-24 rounded bg-white/10" />
                    <div className="h-5 w-5 rounded-full bg-white/10" />
                  </div>
                  <div className="h-6 w-28 rounded-lg bg-white/10" />
                  <div className="h-3 w-36 rounded bg-white/5" />
                </div>
              ))}
            </div>
          </div>

          {/* 4. Recent Activity Skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-48 rounded bg-white/10 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 sm:gap-6 rounded-[26px] border border-white/10 bg-white/[0.02] p-4 sm:p-5 backdrop-blur-xl animate-pulse"
                >
                  <div className="h-24 w-16 sm:h-28 sm:w-20 rounded-xl bg-white/10 shrink-0" />
                  <div className="flex-1 space-y-2.5">
                    <div className="h-5 w-48 rounded-lg bg-white/10" />
                    <div className="h-4 w-32 rounded bg-white/5" />
                    <div className="h-3 w-3/4 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Film Grid Skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div
                  key={i}
                  className="rounded-[20px] border border-white/10 bg-white/[0.02] p-2 animate-pulse space-y-2"
                >
                  <div className="aspect-[2/3] w-full rounded-[14px] bg-white/10" />
                  <div className="h-3 w-3/4 rounded bg-white/10" />
                  <div className="h-2 w-1/2 rounded bg-white/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
