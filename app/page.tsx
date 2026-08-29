"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

const featureCards = [
  {
    title: "Beautiful stats",
    description:
      "See your most watched genres, top-rated films, and cinematic mood in a refined snapshot.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "AI insights",
    description:
      "Get a smart read on your taste and the patterns behind your favorite stories.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: "Shareable cards",
    description:
      "Turn your wrap into a polished little poster you can send to friends and compare.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Enter your username",
    description: "Type in your Letterboxd username to get started.",
  },
  {
    number: "02",
    title: "We analyze your taste",
    description: "Our engine processes your entire watch history and film data.",
  },
  {
    number: "03",
    title: "Get your wrap",
    description: "Receive a beautiful cinematic snapshot ready to share.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <div className="relative isolate overflow-hidden">
        <Navbar />

        <main>
          <Hero />

          {/* Feature Cards Section */}
          <section
            id="about"
            className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 lg:px-12"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-12"
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#FFC857]/60"
              >
                Why Boxdit
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="mt-3 text-2xl font-bold text-white sm:text-3xl"
              >
                Everything you need to understand your taste
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-5 md:grid-cols-3"
            >
              {featureCards.map((card, i) => (
                <motion.article
                  key={card.title}
                  variants={fadeUp}
                  custom={i + 2}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 text-left transition-all duration-500 hover:border-[#F5B000]/15 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                >
                  {/* Subtle hover glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#F5B000]/0 blur-3xl transition-all duration-500 group-hover:bg-[#F5B000]/[0.06]" />

                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition-all duration-300 group-hover:border-[#F5B000]/20 group-hover:bg-[#F5B000]/[0.06] group-hover:text-[#FFC857]">
                    {card.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">
                    {card.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </section>

          {/* How It Works Section */}
          <section
            id="how-it-works"
            className="mx-auto max-w-[1200px] px-5 pb-28 sm:px-8 lg:px-12"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-14"
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#FFC857]/60"
              >
                How it works
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="mt-3 text-2xl font-bold text-white sm:text-3xl"
              >
                Three simple steps
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative"
            >
              {/* Connecting line */}
              <div className="absolute left-[39px] top-0 h-full w-px bg-gradient-to-b from-[#F5B000]/20 via-[#F5B000]/10 to-transparent hidden md:block" />

              <div className="space-y-6">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    variants={fadeUp}
                    custom={i + 2}
                    className="relative flex items-start gap-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
                  >
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#F5B000]/15 bg-[#F5B000]/[0.06] text-sm font-bold text-[#FFC857]">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[14px] text-zinc-500">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
