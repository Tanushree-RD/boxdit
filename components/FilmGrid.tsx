import Image from "next/image";
import { FilmItem } from "@/lib/scraper";

interface FilmGridProps {
  films: FilmItem[];
  username: string;
}

const FALLBACK_POSTER =
  "https://s.ltrbxd.com/static/img/empty-poster-1000-CR2Xn85D.png";

export function FilmGrid({ films, username }: FilmGridProps) {
  // Show up to 18 films for a rich showcase
  const displayFilms = films.slice(0, 18);

  if (displayFilms.length === 0) {
    return (
      <section className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-xl">
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/80">
          Film Library Highlights
        </h2>
        <p className="mt-3 text-sm text-zinc-500">No films found in catalogue.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/90">
            Film Library Highlights
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Curated snapshot of your most recently logged titles
          </p>
        </div>
        <a
          href={`https://letterboxd.com/${username}/films/`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
        >
          <span>All {films.length > 18 ? `${films.length} ` : ""}Films</span>
          <span>↗</span>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
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
              className="group relative flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 p-2 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            >
              {/* Larger Poster Container */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[14px] bg-zinc-900 shadow-inner">
                <Image
                  src={film.posterUrl || FALLBACK_POSTER}
                  alt={film.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 15vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                  unoptimized
                />

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                    Letterboxd ↗
                  </span>
                </div>
              </div>

              {/* Title & Year */}
              <div className="mt-2.5 px-1 pb-1 flex flex-col">
                <p className="line-clamp-1 text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                  {film.name}
                </p>
                {film.year && (
                  <p className="mt-0.5 text-[11px] font-mono text-zinc-400">
                    {film.year}
                  </p>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
