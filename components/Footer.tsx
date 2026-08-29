export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#060709]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.1] bg-gradient-to-br from-[#FF9F1C]/20 via-[#3B82F6]/20 to-[#22C55E]/20 text-[10px] font-black text-white">
            B
          </div>
          <div>
            <span className="text-sm font-bold tracking-[0.2em] text-zinc-300">
              BOXDIT
            </span>
            <p className="text-[11px] text-zinc-500 font-mono">
              The Letterboxd Cinephile Wrapped
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[13px] text-zinc-400">
          <a
            href="#features"
            className="hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How it works
          </a>
          <a
            href="#launch"
            className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
          >
            Create your wrap →
          </a>
        </div>

        <p className="text-[12px] text-zinc-600 font-mono">
          © {new Date().getFullYear()} Boxdit. Not affiliated with Letterboxd.
        </p>
      </div>
    </footer>
  );
}
