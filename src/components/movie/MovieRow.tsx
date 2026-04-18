'use client';
import { useRef, useState } from 'react';
import type { Movie } from '@/types';
import MovieCard from './MovieCard';
import clsx from 'clsx';

interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({
      left:
        dir === 'right' ? rowRef.current.clientWidth * 0.8 : -(rowRef.current.clientWidth * 0.8),
      behavior: 'smooth',
    });
  };

  const onScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanLeft(scrollLeft > 8);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 8);
  };

  if (!movies.length) return null;

  return (
    <div className="mb-8 sm:mb-10 group/row">
      <h2 className="px-4 sm:px-8 lg:px-16 text-sm sm:text-base font-semibold text-gray-200 tracking-wide mb-2 sm:mb-3">
        {title}
      </h2>

      <div className="relative">
        {/* Left chevron */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className={clsx(
            'absolute left-0 top-0 bottom-0 z-20 w-10 sm:w-14',
            'flex items-center justify-center',
            'bg-gradient-to-r from-black/80 to-transparent',
            'opacity-0 group-hover/row:opacity-100',
            'transition-opacity duration-200',
            !canLeft && 'pointer-events-none opacity-0 group-hover/row:opacity-0'
          )}
        >
          <svg
            className="w-5 h-5 text-white drop-shadow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable track */}
        <div
          ref={rowRef}
          onScroll={onScroll}
          className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-8 lg:px-16"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0"
              style={{
                // Mobile: 3 cards | sm: 4 | md: 5 | lg: 6 | xl: 7
                width: 'clamp(100px, calc(16.666% - 8px), 200px)',
              }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right chevron */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className={clsx(
            'absolute right-0 top-0 bottom-0 z-20 w-10 sm:w-14',
            'flex items-center justify-center',
            'bg-gradient-to-l from-black/80 to-transparent',
            'opacity-0 group-hover/row:opacity-100',
            'transition-opacity duration-200',
            !canRight && 'pointer-events-none opacity-0 group-hover/row:opacity-0'
          )}
        >
          <svg
            className="w-5 h-5 text-white drop-shadow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
