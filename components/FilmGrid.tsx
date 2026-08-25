import Image from "next/image";
import { FilmItem } from "@/lib/scraper";

interface FilmGridProps {
  films: FilmItem[];
  username: string;
}

const FALLBACK_POSTER =
  "https://s.ltrbxd.com/static/img/empty-poster-70-BSf-Pjrh.png";

export function FilmGrid({ films, username }: FilmGridProps) {
  const displayFilms = films.slice(0, 12);

  if (displayFilms.length === 0) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-7 backdrop-blur-xl">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[#d4c0a6]">
          Recent Films
        </h2>
        <p className="mt-4 text-sm text-zinc-500">No films found in catalogue.</p>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-7 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4c0a6]">
            Recent Films
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            First 12 films from logged library
          </p>
        </div>
        <a
          href={`https://letterboxd.com/${username}/films/`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[#d4c0a6] hover:underline underline-offset-4"
        >
          View all films ↗
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {displayFilms.map((film, index) => {
          const filmLink = film.link.startsWith("http")
            ? film.link
            : `https://letterboxd.com${film.link}`;

          return (
            <a
              key={`${film.slug}-${index}`}
              href={filmLink}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 p-2 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4c0a6]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-zinc-900">
                <Image
                  src={film.posterUrl || FALLBACK_POSTER}
                  alt={film.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              <div className="mt-2.5 flex flex-col">
                <p className="line-clamp-1 text-xs font-medium text-white group-hover:text-[#d4c0a6] transition-colors">
                  {film.name}
                </p>
                {film.year && (
                  <p className="mt-0.5 text-[11px] text-zinc-500">{film.year}</p>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
