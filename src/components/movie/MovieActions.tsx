"use client";

import { useMyList } from "@/app/mylist-context";
import type { MovieDetail } from "@/types";

interface Props {
  movie: MovieDetail;
}

export default function MovieActions({ movie }: Props) {
  const { addMovie, removeMovie, isSaved } = useMyList();
  const saved = isSaved(movie.id);
  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  const title = movie.title || movie.name || "Unknown";

  const handleAddToList = () => {
    if (saved) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {trailer ? (
        <a
          href={`https://www.youtube.com/watch?v=${trailer.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded text-sm hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Trailer
        </a>
      ) : (
        <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded text-sm hover:bg-gray-200 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>
      )}
      <button
        onClick={handleAddToList}
        className={`flex items-center gap-2 font-bold px-6 py-3 rounded text-sm transition-colors ${
          saved
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-gray-600/70 text-white hover:bg-gray-500/70"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
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
        {saved ? "Remove from List" : "Add to My List"}
      </button>
    </div>
  );
}
