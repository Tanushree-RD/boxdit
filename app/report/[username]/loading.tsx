export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col bg-[#090909] text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 h-10 w-36 animate-pulse rounded-full border border-white/10 bg-white/5" />

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-28 rounded-full bg-white/10" />
            <div className="h-10 w-48 rounded-xl bg-white/10" />
            <div className="h-4 w-full rounded-lg bg-white/10" />
            <div className="h-4 w-5/6 rounded-lg bg-white/10" />
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <p className="text-lg font-medium text-zinc-100">Loading Letterboxd profile...</p>
          </div>
        </section>
      </div>
    </main>
  );
}
