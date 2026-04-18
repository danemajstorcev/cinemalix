'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Movie } from '@/types';

interface MyListContextType {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
  isSaved: (id: number) => boolean;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export function MyListProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cinemalix-mylist');
    if (saved) {
      try {
        setMovies(JSON.parse(saved));
      } catch {
        setMovies([]);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cinemalix-mylist', JSON.stringify(movies));
    }
  }, [movies, mounted]);

  const addMovie = (movie: Movie) => {
    setMovies((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeMovie = (id: number) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  const isSaved = (id: number) => {
    return movies.some((m) => m.id === id);
  };

  return (
    <MyListContext.Provider value={{ movies, addMovie, removeMovie, isSaved }}>
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within MyListProvider');
  }
  return context;
}
