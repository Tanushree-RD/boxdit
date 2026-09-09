export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#080808] py-14 sm:py-18">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center sm:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-[11px] font-mono text-zinc-300">
            B
          </span>
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-zinc-300 uppercase">
              BOXDIT
            </span>
            <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
              Taste Intelligence for Letterboxd
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-8 text-[13px] font-normal text-zinc-400">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#showcase" className="transition-colors hover:text-white">
            Artifact
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white">
            Methodology
          </a>
          <a href="#launch" className="text-[#FF8000] hover:underline underline-offset-4 transition-all">
            Launch Wrap →
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs font-mono text-zinc-600">
          © {new Date().getFullYear()} Boxdit. Not affiliated with Letterboxd.
        </p>
      </div>
    </footer>
  );
}
