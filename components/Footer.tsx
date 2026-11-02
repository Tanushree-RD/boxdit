export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#080808] py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-12 px-6 sm:flex-row sm:items-center sm:px-12">
        {/* Masthead */}
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs font-normal tracking-[0.32em] text-white uppercase">
            BOXDIT
          </span>
          <p className="font-mono text-[9px] text-neutral-500 tracking-[0.24em] uppercase">
            / Cinematic Taste Intelligence
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-normal">
          <a href="#features" className="transition-colors hover:text-white">
            Capabilities
          </a>
          <a href="#showcase" className="transition-colors hover:text-white">
            Specimen
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white">
            Methodology
          </a>
          <a
            href="#launch"
            className="text-white hover:text-neutral-300 transition-colors"
          >
            Launch Dossier →
          </a>
        </div>

        {/* Colophon */}
        <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-normal">
          © {new Date().getFullYear()} Boxdit. Independent &amp; unassociated with Letterboxd.
        </p>
      </div>
    </footer>
  );
}
