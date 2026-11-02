export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-12 px-6 sm:flex-row sm:items-center sm:px-12">
        {/* Masthead */}
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs font-normal tracking-[0.32em] text-[#F5F5F5] uppercase">
            BOXDIT
          </span>
          <p className="font-mono text-[9px] text-white/55 tracking-[0.24em] uppercase">
            / Cinematic Taste Intelligence
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 font-normal">
          <a href="#features" className="transition-colors hover:text-[#F5F5F5]">
            Capabilities
          </a>
          <a href="#showcase" className="transition-colors hover:text-[#F5F5F5]">
            Specimen
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-[#F5F5F5]">
            Methodology
          </a>
          <a
            href="#launch"
            className="text-[#F5F5F5] hover:text-white transition-colors"
          >
            Launch Dossier →
          </a>
        </div>

        {/* Colophon */}
        <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-normal">
          © {new Date().getFullYear()} Boxdit. Independent &amp; unassociated with Letterboxd.
        </p>
      </div>
    </footer>
  );
}
