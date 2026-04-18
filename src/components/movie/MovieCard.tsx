'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Movie } from '@/types';
import { posterUrl } from '@/lib/tmdb';
import { useMyList } from '@/app/mylist-context';
import clsx from 'clsx';

interface Props { movie: Movie }

const PLACEHOLDER_COLORS = [
  'from-red-900 to-red-800',
  'from-blue-900 to-blue-800',
  'from-purple-900 to-purple-800',
  'from-green-900 to-green-800',
  'from-orange-900 to-orange-800',
  'from-pink-900 to-pink-800',
];

export default function MovieCard({ movie }: Props) {
  const [imgErr, setImgErr] = useState(false);
  const { addMovie, removeMovie, isSaved } = useMyList();
  const saved = isSaved(movie.id);

  const title    = movie.title || movie.name || 'Unknown';
  const poster   = posterUrl(movie.poster_path, 'w342');
  const year     = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const rating   = movie.vote_average > 0 ? movie.vote_average.toFixed(1) : null;
  const colorIdx = movie.id % PLACEHOLDER_COLORS.length;

  const handleList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    saved ? removeMovie(movie.id) : addMovie(movie);
  };

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="group relative rounded overflow-hidden bg-gray-900 cursor-pointer transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:z-20">

        {/* Poster */}
        <div className="aspect-[2/3] w-full overflow-hidden">
          {poster && !imgErr ? (
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              onError={() => setImgErr(true)}
              loading="lazy"
            />
          ) : (
            <div className={clsx(
              'w-full h-full bg-gradient-to-b flex flex-col items-center justify-center p-2 text-center',
              PLACEHOLDER_COLORS[colorIdx]
            )}>
              <span className="text-2xl mb-1">🎬</span>
              <span className="text-white text-xs font-semibold leading-tight line-clamp-2">{title}</span>
            </div>
          )}
        </div>

        {/* Hover overlay — fades in smoothly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ease-out">

            {/* Title + meta */}
            <p className="text-white text-xs font-semibold leading-tight truncate mb-1">{title}</p>
            <div className="flex items-center gap-2 mb-2">
              {rating && (
                <span className="text-yellow-400 text-[11px] font-bold">★ {rating}</span>
              )}
              {year && (
                <span className="text-gray-400 text-[11px]">{year}</span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5">
              {/* Play */}
              <button
                className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
                onClick={(e) => e.preventDefault()}
                aria-label="Play"
              >
                <svg className="w-3.5 h-3.5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              {/* Add / Remove from list */}
              <button
                className={clsx(
                  'w-7 h-7 border rounded-full flex items-center justify-center transition-colors flex-shrink-0',
                  saved
                    ? 'bg-white border-white'
                    : 'border-gray-400 hover:border-white'
                )}
                onClick={handleList}
                aria-label={saved ? 'Remove from My List' : 'Add to My List'}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={saved ? '#000' : '#fff'} strokeWidth={2.5}>
                  {saved
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
