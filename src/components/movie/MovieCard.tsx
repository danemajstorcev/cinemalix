'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Movie } from '@/types';
import { posterUrl } from '@/lib/tmdb';
import { useMyList } from '@/app/mylist-context';
import clsx from 'clsx';

interface Props {
  movie: Movie;
}

const PLACEHOLDER_COLORS = [
  'from-red-900 to-red-700',
  'from-blue-900 to-blue-700',
  'from-purple-900 to-purple-700',
  'from-green-900 to-green-700',
  'from-orange-900 to-orange-700',
  'from-pink-900 to-pink-700',
];

export default function MovieCard({ movie }: Props) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const { addMovie, removeMovie, isSaved } = useMyList();
  const saved = isSaved(movie.id);

  const title = movie.title || movie.name || 'Unknown';
  const poster = posterUrl(movie.poster_path, 'w342');
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const rating = movie.vote_average?.toFixed(1);
  const colorIdx = movie.id % PLACEHOLDER_COLORS.length;
  const overview =
    (movie.overview || '').slice(0, 85) +
    (movie.overview && movie.overview.length > 85 ? '...' : '');

  const handleAddToList = (e: React.MouseEvent) => {
    e.preventDefault();
    if (saved) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 group shadow-lg hover:shadow-2xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: hovered ? 'scale(1.05) translateY(-8px)' : 'scale(1)',
          zIndex: hovered ? 50 : 1,
        }}
      >
        <div className="aspect-[2/3] w-full bg-gray-800 overflow-hidden">
          {poster && !imgErr ? (
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImgErr(true)}
              loading="lazy"
            />
          ) : (
            <div
              className={clsx(
                'w-full h-full bg-gradient-to-b flex flex-col items-center justify-center p-3 text-center',
                PLACEHOLDER_COLORS[colorIdx]
              )}
            >
              <span className="text-4xl mb-2">🎬</span>
              <span className="text-white text-sm font-bold leading-tight">{title}</span>
            </div>
          )}
        </div>
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/95 flex flex-col justify-between p-4 transition-all duration-200 pointer-events-none',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="flex-1" />
          <div
            className={clsx(
              'transition-all duration-200',
              hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            )}
          >
            <h3 className="text-white text-sm font-bold leading-tight mb-2 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-3 mb-3">
              {rating && (
                <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                  <span className="text-yellow-400 text-xs font-bold">★</span>
                  <span className="text-white text-xs font-semibold">{rating}</span>
                </div>
              )}
              {year && <span className="text-gray-300 text-xs font-semibold">{year}</span>}
            </div>
            {overview && <p className="text-gray-200 text-xs line-clamp-2 mb-3">{overview}</p>}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 hover:scale-110 shadow-lg"
                onClick={(e) => e.preventDefault()}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <button
                className={clsx(
                  'flex-shrink-0 w-8 h-8 border-2 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg',
                  saved ? 'bg-red-500 border-red-500' : 'border-white hover:bg-white/20'
                )}
                onClick={handleAddToList}
              >
                <svg
                  className={clsx('w-4 h-4', saved ? 'text-white' : 'text-white')}
                  fill={saved ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {saved ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  )}
                </svg>
              </button>
              <button
                className="flex-shrink-0 w-8 h-8 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110 shadow-lg"
                onClick={(e) => e.preventDefault()}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
