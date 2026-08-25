export default function ReportLoading() {
  return (
    <main className="flex min-h-screen flex-col bg-[#090909] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
        {/* Back button placeholder */}
        <div className="mb-8 h-8 w-32 rounded-full bg-white/5 animate-pulse" />

        <div className="space-y-8">
          {/* Header Skeleton */}
          <section className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] animate-pulse">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="h-24 w-24 rounded-full bg-white/10 sm:h-28 sm:w-28 shrink-0" />
              <div className="flex-1 space-y-3 w-full">
                <div className="h-4 w-32 rounded-full bg-white/10" />
                <div className="h-10 w-64 rounded-xl bg-white/10" />
                <div className="h-4 w-40 rounded-lg bg-white/5" />
              </div>
            </div>
          </section>

          {/* Stats Grid Skeleton */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 animate-pulse space-y-3"
              >
                <div className="h-3 w-24 rounded bg-white/10" />
                <div className="h-8 w-28 rounded-lg bg-white/10" />
                <div className="h-3 w-36 rounded bg-white/5" />
              </div>
            ))}
          </div>

          {/* Recent Activity Skeleton */}
          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-7 backdrop-blur-xl animate-pulse space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-44 rounded bg-white/10" />
              <div className="h-3 w-60 rounded bg-white/5" />
            </div>

            <div className="divide-y divide-white/5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="h-20 w-14 rounded-lg bg-white/10 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-48 rounded bg-white/10" />
                    <div className="h-4 w-32 rounded bg-white/5" />
                    <div className="h-3 w-3/4 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Film Grid Skeleton */}
          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-7 backdrop-blur-xl animate-pulse space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-36 rounded bg-white/10" />
              <div className="h-3 w-52 rounded bg-white/5" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div key={i} className="space-y-2 rounded-xl border border-white/10 bg-black/30 p-2">
                  <div className="aspect-[2/3] w-full rounded-lg bg-white/10" />
                  <div className="h-3 w-3/4 rounded bg-white/10" />
                  <div className="h-2 w-1/2 rounded bg-white/5" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
