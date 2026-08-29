"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FilmItem } from "@/lib/scraper";

interface FilmGridProps {
  films: FilmItem[];
  username: string;
}

const FALLBACK_POSTER =
  "https://s.ltrbxd.com/static/img/empty-poster-1000-CR2Xn85D.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.04,
    },
  }),
};

export function FilmGrid({ films, username }: FilmGridProps) {
  const displayFilms = films.slice(0, 18);

  if (displayFilms.length === 0) {
    return (
      <section className="rounded-[32px] border border-white/[0.06] bg-white/[0.02] p-10 text-center">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFC857]/60">
          Film Library Highlights
        </h2>
        <p className="mt-4 text-[14px] text-zinc-500">
          No films found in catalogue.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-1"
      >
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFC857]/70">
            Film Library Highlights
          </h2>
          <p className="mt-1.5 text-[13px] text-zinc-500">
            Curated snapshot of your most recently logged titles
          </p>
        </div>
        <a
          href={`https://letterboxd.com/${username}/films/`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#F5B000]/15 bg-[#F5B000]/[0.06] px-4 py-1.5 text-[12px] font-semibold text-[#FFC857]/70 transition-all duration-300 hover:border-[#F5B000]/25 hover:bg-[#F5B000]/[0.1] hover:text-[#FFC857]"
        >
          <span>All {films.length > 18 ? `${films.length} ` : ""}Films</span>
          <span className="text-[10px]">↗</span>
        </a>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {displayFilms.map((film, index) => {
          const filmLink = film.link.startsWith("http")
            ? film.link
            : `https://letterboxd.com${film.link}`;

          return (
            <motion.a
              key={`${film.slug}-${index}`}
              href={filmLink}
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative flex flex-col overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.02] p-2 transition-all duration-500 hover:border-[#F5B000]/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Poster */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-zinc-900">
                <Image
                  src={film.posterUrl || FALLBACK_POSTER}
                  alt={film.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 15vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC857]">
                    Letterboxd ↗
                  </span>
                </div>
              </div>

              {/* Title & Year */}
              <div className="mt-2.5 px-1.5 pb-1 flex flex-col">
                <p className="line-clamp-1 text-[12px] font-bold text-white group-hover:text-[#FFC857] transition-colors duration-300">
                  {film.name}
                </p>
                {film.year && (
                  <p className="mt-0.5 text-[11px] font-mono text-zinc-500">
                    {film.year}
                  </p>
                )}
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
