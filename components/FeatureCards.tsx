"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

export function FeatureCards() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-8 sm:py-36">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-16 sm:mb-20"
      >
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000]" />
          <span className="text-[11px] font-mono tracking-[0.24em] text-[#FF8000] uppercase">
            01 // CAPABILITIES
          </span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white"
        >
          A quiet, rigorous lens on{" "}
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF8000] to-white">
            cinema.
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-3 max-w-xl text-sm sm:text-base text-zinc-400 font-light"
        >
          No superficial summaries or generic template cards. Boxdit extracts real statistical rigor from your Letterboxd archive.
        </motion.p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={3}
          className="group relative flex flex-col justify-between rounded-3xl cinema-panel cinema-panel-hover p-7 sm:p-8"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="font-mono text-xs text-[#00E054] font-semibold tracking-wider">
                01 // THE RATING SPECTRUM
              </span>
              <span className="text-[10px] font-mono text-zinc-500">10-BAR CURVE</span>
            </div>

            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-white tracking-tight">
              The Critical Curve
            </h3>
            <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-zinc-400">
              An unvarnished look at your rating tendencies. Discover whether you skew toward generous 4-star adulation or austere critical skepticism.
            </p>

            {/* Visual Micro Histogram */}
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/40 p-4">
              <div className="flex h-16 items-end justify-between gap-1">
                {[10, 20, 35, 60, 85, 100, 70, 45, 25, 10].map((h, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t-[2px] bg-[#00E054]/75 group-hover:bg-[#00E054] transition-colors"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[9px] font-mono text-zinc-500">
                <span>½★</span>
                <span className="text-[#00E054] font-bold">PEAK 3.5★</span>
                <span>5★</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.05] pt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>METRIC RIGOR</span>
            <span className="text-[#00E054]">True Distribution</span>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={4}
          className="group relative flex flex-col justify-between rounded-3xl cinema-panel cinema-panel-hover p-7 sm:p-8"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="font-mono text-xs text-[#FF8000] font-semibold tracking-wider">
                02 // PSYCHOLOGICAL PROFILE
              </span>
              <span className="text-[10px] font-mono text-zinc-500">AUTEUR MATRIX</span>
            </div>

            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-white tracking-tight">
              Taste Archetypes
            </h3>
            <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-zinc-400">
              A literary diagnosis of your cinephilic psyche, narrative themes, and recurring directorial allegiances across cinema history.
            </p>

            {/* Visual Archetype Preview */}
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/40 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF8000]" />
                <span className="text-xs font-serif italic text-white">
                  &ldquo;The Auteur Loyalist&rdquo;
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Dominant Allegiances: Denis Villeneuve, Christopher Nolan, David Fincher
              </p>
              <div className="flex gap-1.5 pt-1">
                <span className="rounded bg-white/[0.04] px-2 py-0.5 text-[9px] font-mono text-zinc-400">
                  #SpeculativeFiction
                </span>
                <span className="rounded bg-white/[0.04] px-2 py-0.5 text-[9px] font-mono text-zinc-400">
                  #HighContrast
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.05] pt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>SYNTHESIS</span>
            <span className="text-[#FF8000]">Editorial Diagnosis</span>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={5}
          className="group relative flex flex-col justify-between rounded-3xl cinema-panel cinema-panel-hover p-7 sm:p-8"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="font-mono text-xs text-[#40BCF4] font-semibold tracking-wider">
                03 // EXPORTABLE DOSSIER
              </span>
              <span className="text-[10px] font-mono text-zinc-500">ARCHIVE PASS</span>
            </div>

            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-white tracking-tight">
              Festival Credentials
            </h3>
            <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-zinc-400">
              High-resolution, typography-first summary passes designed with restraint for digital sharing or print preservation.
            </p>

            {/* Visual Credential Mini Pass */}
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#181D23] to-[#0A0D10] p-4 text-center">
              <span className="text-[9px] font-mono text-[#FF8000] uppercase tracking-widest block">
                BOXDIT 2026 OFFICIAL PASS
              </span>
              <div className="mt-2 text-sm font-bold text-white">
                VIP Cinephile Accreditation
              </div>
              <div className="mt-2 flex justify-center gap-4 text-xs font-mono text-zinc-400 border-t border-white/[0.06] pt-2">
                <span>405 Films</span>
                <span className="text-[#00E054]">3.68★ Avg</span>
                <span className="text-[#FF8000]">99/100</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.05] pt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>PRESERVATION</span>
            <span className="text-[#40BCF4]">Share Ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
