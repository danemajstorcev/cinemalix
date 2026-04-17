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
    const amount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const onScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanLeft(scrollLeft > 10);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  if (!movies.length) return null;

  return (
    <div className="mb-6 sm:mb-8 group/row">
      <h2 className="px-4 sm:px-8 lg:px-16 text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
        {title}
      </h2>

      <div className="relative px-4 sm:px-8 lg:px-16">
        <button
          onClick={() => scroll('left')}
          className={clsx(
            'absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-10 flex items-center justify-center bg-black/50 hover:bg-black/80 transition-all opacity-0 group-hover/row:opacity-100',
            !canLeft && 'invisible'
          )}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div
          ref={rowRef}
          onScroll={onScroll}
          className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0"
              style={{
                width: 'calc(33.333% - 4px)',
                scrollSnapAlign: 'start',
              }}
            >
              <div className="hidden sm:block" style={{ width: 'calc(100%)' }}>
                <MovieCard movie={movie} />
              </div>
              <div className="sm:hidden">
                <MovieCard movie={movie} />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className={clsx(
            'absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-10 flex items-center justify-center bg-black/50 hover:bg-black/80 transition-all opacity-0 group-hover/row:opacity-100',
            !canRight && 'invisible'
          )}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
