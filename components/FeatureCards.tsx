"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.12,
    },
  }),
};

export function FeatureCards() {
  return (
    <section id="features" className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-16 text-center"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-[#FF9F1C] uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF9F1C] animate-pulse" />
          The Boxdit Engine
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Movie taste, fully illuminated
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400"
        >
          Beyond simple star ratings. Uncover your hidden cinematic habits, obscure director obsessions, and unique cinema DNA.
        </motion.p>
      </motion.div>

      {/* Tri-Color Feature Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* ORANGE CARD: Stats & Analytics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={0}
          className="h-full"
        >
          <TiltCard
            glowColor="rgba(255, 159, 28, 0.22)"
            borderColor="hover:border-[#FF9F1C]/40"
          >
            <div>
              {/* Card Icon & Accent Badge */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF9F1C]/30 bg-[#FF9F1C]/10 text-[#FF9F1C] shadow-[0_0_20px_rgba(255,159,28,0.2)]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <span className="rounded-full border border-[#FF9F1C]/20 bg-[#FF9F1C]/10 px-2.5 py-1 text-[11px] font-mono font-medium text-[#FF9F1C]">
                  01 // STATS
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-xl font-bold text-white">Cinematic Breakdown</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">
                Visualize genre dominance, release era distribution, average ratings, and your most binge-watched decades.
              </p>
            </div>

            {/* Micro Visual Preview */}
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/40 p-4">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>GENRE COMPOSITION</span>
                <span className="text-[#FF9F1C] font-semibold">SCI-FI 42%</span>
              </div>
              <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-white/[0.06] gap-1">
                <div className="h-full w-[42%] rounded-full bg-[#FF9F1C]" />
                <div className="h-full w-[28%] rounded-full bg-[#FFA834]/80" />
                <div className="h-full w-[18%] rounded-full bg-zinc-600" />
                <div className="h-full w-[12%] rounded-full bg-zinc-700" />
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] text-zinc-400">
                <span>Avg Rating: <strong className="text-white">4.1★</strong></span>
                <span>Hours: <strong className="text-white">340h</strong></span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* BLUE CARD: AI Taste Persona */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={1}
          className="h-full"
        >
          <TiltCard
            glowColor="rgba(59, 130, 246, 0.22)"
            borderColor="hover:border-[#3B82F6]/40"
          >
            <div>
              {/* Card Icon & Accent Badge */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                </div>
                <span className="rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-2.5 py-1 text-[11px] font-mono font-medium text-[#3B82F6]">
                  02 // AI DNA
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-xl font-bold text-white">AI Taste DNA</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">
                Our neural model analyzes mood arcs, obscure motifs, and director synergy to synthesize your cinephile archetype.
              </p>
            </div>

            {/* Micro Visual Preview */}
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/40 p-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#3B82F6] animate-ping" />
                <span className="text-[11px] font-mono text-zinc-400 uppercase">IDENTIFIED ARCHETYPE</span>
              </div>
              <div className="mt-2 text-[15px] font-bold text-white tracking-wide">
                &ldquo;The Neo-Noir Romantic&rdquo;
              </div>
              <p className="mt-1 text-[12px] text-zinc-400 italic">
                Prefers atmospheric melancholy, synth scores & high-contrast night shots.
              </p>
            </div>
          </TiltCard>
        </motion.div>

        {/* GREEN CARD: Shareable Visual Wraps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={2}
          className="h-full"
        >
          <TiltCard
            glowColor="rgba(34, 197, 94, 0.22)"
            borderColor="hover:border-[#22C55E]/40"
          >
            <div>
              {/* Card Icon & Accent Badge */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                </div>
                <span className="rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-2.5 py-1 text-[11px] font-mono font-medium text-[#22C55E]">
                  03 // SHARE
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-xl font-bold text-white">4K Social Posters</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">
                Instant high-resolution export cards formatted for Instagram stories, Twitter, Discord, and Reddit comparisons.
              </p>
            </div>

            {/* Micro Visual Preview */}
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/40 p-4">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>EXPORT RATIOS</span>
                <span className="text-[#22C55E] font-semibold">9:16 & 1:1</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] py-1.5 text-center text-[11px] font-medium text-zinc-300">
                  📱 IG Story
                </div>
                <div className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] py-1.5 text-center text-[11px] font-medium text-zinc-300">
                  🖼️ 4K Poster
                </div>
                <div className="flex-1 rounded-lg border border-[#22C55E]/30 bg-[#22C55E]/10 py-1.5 text-center text-[11px] font-semibold text-[#22C55E]">
                  ✨ Instant
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
