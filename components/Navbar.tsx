import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.32em] text-zinc-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4c0a6]/40 bg-[#d4c0a6]/10 text-[10px] text-[#e7dcc5]">
            B
          </span>
          BOXDIT
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#launch"
          className="rounded-full border border-[#d4c0a6]/30 bg-[#d4c0a6]/10 px-4 py-2 text-sm font-medium text-[#f3ebdf] transition-all duration-200 hover:border-[#d4c0a6]/60 hover:bg-[#d4c0a6]/15"
        >
          Start now
        </a>
      </div>
    </header>
  );
}
