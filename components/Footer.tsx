export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#070707]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#F5B000]/15 bg-[#F5B000]/5 text-[9px] font-bold tracking-widest text-[#FFC857]/70">
            B
          </div>
          <span className="text-[13px] font-semibold tracking-[0.2em] text-zinc-400">
            BOXDIT
          </span>
        </div>
        <p className="text-[13px] text-zinc-600">
          Crafting a cinematic snapshot of your taste.
        </p>
      </div>
    </footer>
  );
}
