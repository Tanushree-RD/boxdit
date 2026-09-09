"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = username.trim();
    if (!trimmed || isLoading) return;
    setIsLoading(true);
    router.push(`/report/${encodeURIComponent(trimmed)}`);
  };

  const handleQuickFill = (name: string) => {
    setUsername(name);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Search Bar */}
      <form
        id="launch"
        onSubmit={handleSubmit}
        className={`relative w-full rounded-full border transition-all duration-300 backdrop-blur-md ${
          isFocused
            ? "border-white/[0.25] bg-[#111113]/95 shadow-[0_0_30px_rgba(255,255,255,0.03)]"
            : "border-white/[0.08] bg-[#0d0d0e]/80 hover:border-white/[0.14]"
        }`}
      >
        <div className="flex items-center px-4 py-1.5 sm:py-2">
          {/* Subtle Search / Letterboxd Prefix */}
          <div className="flex items-center gap-2 pl-1 select-none text-zinc-500 font-mono text-xs">
            <svg
              className="h-3.5 w-3.5 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <span className="hidden sm:inline text-zinc-600">letterboxd.com/</span>
          </div>

          {/* Input */}
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="username"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
            aria-label="Letterboxd username"
            className="h-10 flex-1 border-0 bg-transparent px-2.5 text-[14px] font-normal tracking-tight text-white placeholder:text-zinc-600 focus:outline-none disabled:opacity-50"
          />

          {/* Pill CTA Button */}
          <button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="inline-flex h-8 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 text-xs font-medium tracking-wide text-zinc-200 transition-all duration-200 hover:border-[#FF8000]/60 hover:bg-[#FF8000] hover:text-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.12] disabled:hover:bg-white/[0.04] disabled:hover:text-zinc-200"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="h-3 w-3 animate-spin text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Analyzing</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <span>View Wrap</span>
                <span className="text-[11px]">→</span>
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Understated Sample Handles */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-zinc-500 font-mono">
        <span className="text-zinc-600">Sample:</span>
        {["davidehrlich", "karsten", "letterboxd"].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => handleQuickFill(name)}
            className="text-zinc-400 hover:text-white transition-colors duration-150 underline-offset-4 hover:underline"
          >
            @{name}
          </button>
        ))}
      </div>
    </div>
  );
}
