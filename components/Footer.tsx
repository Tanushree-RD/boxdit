export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#090B0E] py-14 sm:py-18">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center sm:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-[11px] font-mono font-bold text-white">
            B
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold tracking-[0.22em] text-white uppercase">
                BOXDIT
              </span>
              <span className="h-1 w-1 rounded-full bg-[#00E054]" />
            </div>
            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
              Cinematic Taste Intelligence for Letterboxd
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-8 text-[13px] font-normal text-zinc-400">
          <a href="#features" className="transition-colors hover:text-white">
            Capabilities
          </a>
          <a href="#showcase" className="transition-colors hover:text-white">
            Dossier
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white">
            Apparatus
          </a>
          <a href="#launch" className="text-[#FF8000] hover:underline underline-offset-4 transition-all font-medium">
            Launch Dossier →
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs font-mono text-zinc-400">
          © {new Date().getFullYear()} Boxdit. Independent &amp; unassociated with Letterboxd.
        </p>
      </div>
    </footer>
  );
}
