import Link from "next/link";

type ReportPageProps = {
  params: Promise<{ username: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { username } = await params;

  return (
    <main className="flex min-h-screen flex-col bg-[#090909] text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:bg-white/10"
        >
          ← Back to home
        </Link>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-[#d4c0a6]">Your report</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-5xl">{decodeURIComponent(username)}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            This is the placeholder profile page for your Boxdit analysis. The actual scraping, data processing, and AI insights will be connected here next.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { label: "Top genre", value: "Drama" },
              { label: "Favorite era", value: "2000s" },
              { label: "Average rating", value: "4.0" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-zinc-400">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
