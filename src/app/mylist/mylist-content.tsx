"use client";

import { useMyList } from "@/app/mylist-context";
import MovieCard from "@/components/movie/MovieCard";

export default function MyListContent() {
  const { movies } = useMyList();

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">
        My List
      </h1>

      {movies.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg font-semibold mb-2">
            No movies in your list yet
          </p>
          <p className="text-sm">
            Start adding movies by clicking the add button on movie cards
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 mb-8 text-sm">
            {movies.length} {movies.length === 1 ? "movie" : "movies"} saved
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 auto-rows-max">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
