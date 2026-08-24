import { UsernameForm } from "./UsernameForm";

export function Hero() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 pt-16 pb-16 text-center sm:px-6 lg:px-8 lg:pt-24">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4c0a6]/25 bg-[#d4c0a6]/8 px-3 py-1.5 text-[11px] font-medium tracking-[0.24em] text-[#e6d9c7] uppercase">
        Movie taste, decoded
      </div>

      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 -z-10 h-[360px] w-[360px] rounded-full bg-[#d4c0a6]/10 blur-[110px]" aria-hidden="true" />

        <h1 className="text-5xl font-black tracking-[0.2em] text-white sm:text-6xl lg:text-8xl">
          BOXDIT
        </h1>
        <p className="mt-6 text-xl font-light text-zinc-200 sm:text-2xl lg:text-3xl">
          Your Letterboxd Wrapped
        </p>
      </div>

      <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
        Discover your movie taste through beautiful statistics, AI insights, and shareable cards. Just enter your Letterboxd username to get started.
      </p>

      <div className="mt-10 w-full max-w-2xl">
        <UsernameForm />
      </div>
    </section>
  );
}
