"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      return;
    }

    router.push(`/report/${encodeURIComponent(trimmedUsername)}`);
  };

  return (
    <form id="launch" onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 rounded-[28px] border border-white/10 bg-white/5 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your Letterboxd username"
          aria-label="Letterboxd username"
          className="h-14 flex-1 border-0 bg-transparent px-4 text-base text-white placeholder:text-zinc-400 focus:outline-none sm:px-5"
        />

        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center rounded-full bg-[#f4efe8] px-6 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!username.trim()}
        >
          Analyze Profile
        </button>
      </div>
    </form>
  );
}
