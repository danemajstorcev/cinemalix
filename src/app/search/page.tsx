import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { authOptions } from '@/lib/auth';
import { searchMovies } from '@/lib/tmdb';
import Navbar from '@/components/layout/Navbar';
import MovieCard from '@/components/movie/MovieCard';
import SearchInput from './SearchInput';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `"${q}" — Search` : 'Search' };
}

export default async function SearchPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');

  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const results = query.length >= 2 ? await searchMovies(query) : [];

  return (
    <div className="bg-netflix-dark min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 sm:px-8 lg:px-16 pb-16">
        <div className="max-w-2xl mb-8">
          <SearchInput initialValue={query} />
        </div>

        {query.length >= 2 ? (
          results.length > 0 ? (
            <>
              <p className="text-gray-400 text-sm mb-5">
                <span className="text-white font-semibold">{results.length}</span> result
                {results.length !== 1 ? 's' : ''} for{' '}
                <span className="text-white">&ldquo;{query}&rdquo;</span>
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3">
                {results.map((movie) => (
                  <MovieCard key={`${movie.id}-${movie.media_type}`} movie={movie} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">😶</div>
              <p className="text-white font-semibold text-lg mb-2">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-gray-500 text-sm">Try a different title or actor name</p>
            </div>
          )
        ) : query.length === 1 ? (
          <div className="text-center py-24">
            <p className="text-gray-400">Keep typing…</p>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-gray-300 text-lg font-medium">What do you want to watch?</p>
            <p className="text-gray-600 text-sm mt-2">Results appear as you type</p>
          </div>
        )}
      </div>
    </div>
  );
}
