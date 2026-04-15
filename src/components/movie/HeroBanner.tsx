import Link from 'next/link';
import type { Movie } from '@/types';
import { backdropUrl } from '@/lib/tmdb';

interface Props { movie: Movie }

export default function HeroBanner({ movie }: Props) {
  const bg     = backdropUrl(movie.backdrop_path, 'original');
  const title  = movie.title || movie.name || 'Untitled';
  const year   = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const rating = movie.vote_average?.toFixed(1);

  return (
    <div className="relative w-full h-[56vw] min-h-[420px] max-h-[780px] overflow-hidden">

      {/* Background image */}
      {bg ? (
        <img
          src={bg}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <span className="text-gray-600 text-8xl select-none">🎬</span>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 netflix-gradient-right" />
      <div className="absolute inset-0 netflix-gradient-bottom" />
      <div className="absolute inset-0 netflix-gradient-top" />

      {/* Content */}
      <div className="absolute bottom-[20%] left-0 px-8 sm:px-12 lg:px-16 max-w-[600px]">

        <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-white text-shadow-lg leading-tight mb-3">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {rating && (
            <span className="text-green-400 font-bold text-sm">
              ★ {rating}
            </span>
          )}
          {year && <span className="text-gray-300 text-sm">{year}</span>}
          <span className="border border-gray-400 text-gray-300 text-xs px-1.5 py-0.5">HD</span>
        </div>

        <p className="text-sm sm:text-base text-gray-200 line-clamp-3 text-shadow mb-6 leading-relaxed max-w-lg">
          {movie.overview}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/movie/${movie.id}`}
            className="flex items-center gap-2 bg-white text-black font-bold px-5 sm:px-8 py-2 sm:py-3 rounded text-sm sm:text-base hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </Link>
          <Link
            href={`/movie/${movie.id}`}
            className="flex items-center gap-2 bg-gray-500/70 text-white font-bold px-5 sm:px-8 py-2 sm:py-3 rounded text-sm sm:text-base hover:bg-gray-500/90 transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
