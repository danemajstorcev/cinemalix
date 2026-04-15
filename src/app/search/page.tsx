import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { authOptions } from '@/lib/auth';
import { searchMovies } from '@/lib/tmdb';
import Navbar from '@/components/layout/Navbar';
import MovieCard from '@/components/movie/MovieCard';
import SearchInput from './SearchInput';

interface Props { searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `Search: ${q}` : 'Search' };
}

export default async function SearchPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');

  const { q }   = await searchParams;
  const query   = q?.trim() ?? '';
  const results = query ? await searchMovies(query) : [];

  return (
    <div className="bg-netflix-dark min-h-screen">
      <Navbar />

      <div className="pt-24 px-4 sm:px-8 lg:px-16 pb-16">
        <div className="max-w-xl mb-8">
          <SearchInput initialValue={query} />
        </div>

        {query ? (
          <>
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4">
              {results.length > 0
                ? `${results.length} results for "${query}"`
                : `No results for "${query}"`}
            </h2>
            {results.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3">
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-400">Try a different title or keyword</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-gray-400">Search for movies and TV shows</p>
          </div>
        )}
      </div>
    </div>
  );
}
