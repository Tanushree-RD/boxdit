export default function ReportLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090B0E] text-white">
      {/* Ambient background aura */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 -top-40 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[#FF8000]/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 py-8 sm:px-8 lg:px-12">
        {/* Navigation placeholder */}
        <div className="mb-10 sm:mb-12 flex items-center justify-between">
          <div className="h-9 w-44 rounded-full bg-white/[0.04] animate-pulse" />
          <div className="h-4 w-32 rounded-full bg-white/[0.04] animate-pulse" />
        </div>

        <div className="space-y-16 sm:space-y-20 pb-24">
          {/* 1. Hero Skeleton */}
          <section className="relative overflow-hidden rounded-3xl cinema-panel p-7 sm:p-10 lg:p-12 animate-pulse">
            <div className="relative flex flex-col items-center lg:flex-row lg:items-start lg:gap-10">
              {/* Avatar circle */}
              <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full bg-white/[0.06] shrink-0 mb-6 lg:mb-0" />

              {/* Info lines */}
              <div className="flex-1 space-y-4 w-full text-center lg:text-left">
                <div className="flex justify-center lg:justify-start gap-2.5">
                  <div className="h-6 w-32 rounded-full bg-white/[0.05]" />
                  <div className="h-6 w-24 rounded-full bg-white/[0.04]" />
                </div>
                <div className="h-10 sm:h-12 w-3/4 max-w-sm mx-auto lg:mx-0 rounded-xl bg-white/[0.06]" />
                <div className="h-4 w-48 mx-auto lg:mx-0 rounded bg-white/[0.03]" />
                <div className="h-24 w-full max-w-2xl mx-auto lg:mx-0 rounded-2xl bg-white/[0.03]" />
              </div>

              {/* Button placeholder */}
              <div className="h-10 w-36 rounded-full bg-white/[0.05] shrink-0 mt-6 lg:mt-0" />
            </div>

            {/* Quick ticker skeleton */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/[0.06] pt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-white/[0.03]" />
              ))}
            </div>
          </section>

          {/* 2. Rating Histogram Skeleton */}
          <section className="rounded-2xl cinema-panel p-6 sm:p-8 animate-pulse">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-5">
              <div className="space-y-2">
                <div className="h-3 w-36 rounded bg-[#00E054]/20" />
                <div className="h-7 w-52 rounded bg-white/[0.06]" />
              </div>
              <div className="h-10 w-32 rounded-xl bg-white/[0.04]" />
            </div>
            <div className="pt-8 flex h-48 items-end justify-between gap-3 px-3">
              {[30, 45, 60, 80, 95, 100, 75, 50, 35, 20].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[#00E054]/20"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </section>

          {/* 3. Core Highlights Bento Skeleton */}
          <div>
            <div className="mb-6 sm:mb-8 px-1 space-y-2">
              <div className="h-4 sm:h-5 w-44 rounded bg-white/[0.05] animate-pulse" />
              <div className="h-3.5 w-64 rounded bg-white/[0.03] animate-pulse" />
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="lg:col-span-2 h-72 rounded-2xl cinema-panel animate-pulse p-7" />
              <div className="h-72 rounded-2xl cinema-panel animate-pulse p-7" />
              <div className="h-72 rounded-2xl cinema-panel animate-pulse p-7" />
              <div className="h-72 rounded-2xl cinema-panel animate-pulse p-7" />
              <div className="h-72 rounded-2xl cinema-panel animate-pulse p-7" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
