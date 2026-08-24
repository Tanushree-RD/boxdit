import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

const featureCards = [
  {
    title: "Beautiful stats",
    description: "See your most watched genres, top-rated films, and cinematic mood in a refined snapshot.",
  },
  {
    title: "AI insights",
    description: "Get a smart read on your taste and the patterns behind your favorite stories.",
  },
  {
    title: "Shareable cards",
    description: "Turn your wrap into a polished little poster you can send to friends and compare.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(212,192,166,0.18),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.04),_transparent_25%)]" />

        <Navbar />

        <main>
          <Hero />

          <section id="about" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-xs uppercase tracking-[0.28em] text-[#d4c0a6]">Why Boxdit</p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {featureCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[28px] border border-white/10 bg-white/4 p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="mb-5 h-11 w-11 rounded-2xl border border-[#d4c0a6]/35 bg-[#d4c0a6]/10" />
                  <h2 className="text-xl font-semibold text-white">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{card.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="how-it-works"
            className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8"
          >
            <div className="rounded-[32px] border border-white/10 bg-[#111111]/80 p-8 shadow-[0_16px_60px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-10">
              <div className="mb-8 text-center">
                <p className="text-xs uppercase tracking-[0.24em] text-[#d4c0a6]">How it works</p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  "Enter your Letterboxd username",
                  "Boxdit analyzes your watch history",
                  "Get a polished wrap to share",
                ].map((step, index) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d4c0a6]/15 text-sm font-semibold text-[#f1e3cf]">
                      {index + 1}
                    </div>
                    <p className="text-base text-zinc-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
