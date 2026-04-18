'use client';
import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchInput({ initialValue }: { initialValue: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  // Fire search 350ms after the user stops typing — no Enter needed
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        const trimmed = q.trim();
        if (trimmed) {
          router.push(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false });
        } else {
          router.push('/search', { scroll: false });
        }
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [q, router]);

  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies, TV shows, actors…"
        autoFocus
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-12 pr-12 py-3.5 text-base focus:outline-none focus:border-white placeholder:text-gray-500 transition-colors"
      />
      {/* Spinner while navigating */}
      {isPending && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
        </div>
      )}
      {/* Clear button */}
      {q && !isPending && (
        <button
          onClick={() => setQ('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-xl leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
}
