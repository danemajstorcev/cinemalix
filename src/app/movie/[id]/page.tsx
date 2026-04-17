import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getMovieDetail, backdropUrl, posterUrl } from '@/lib/tmdb';
import Navbar from '@/components/layout/Navbar';
import MovieRow from '@/components/movie/MovieRow';
import MovieActions from '@/components/movie/MovieActions';
import { mockMovies } from '@/data/mockData';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetail(id);
  if (!movie) return { title: 'Not Found' };
  return {
    title: movie.title || movie.name,
    description: movie.overview,
  };
}

function formatRuntime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default async function MoviePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');

  const { id } = await params;
  const movie = await getMovieDetail(id);
  if (!movie) notFound();

  const backdrop = backdropUrl(movie.backdrop_path);
  const poster = posterUrl(movie.poster_path, 'w500');
  const title = movie.title || movie.name || 'Unknown';
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
  const cast = movie.credits?.cast?.slice(0, 8) ?? [];
  const director = movie.credits?.crew?.find((c) => c.job === 'Director');
  const similar = movie.similar?.results?.slice(0, 8) ?? mockMovies.slice(0, 8);

  return (
    <div className="bg-netflix-dark min-h-screen">
      <Navbar />
      <div className="relative w-full h-[50vw] min-h-[320px] max-h-[600px] overflow-hidden">
        {backdrop ? (
          <img
            src={backdrop}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <span className="text-gray-700 text-8xl">🎬</span>
          </div>
        )}
        <div className="absolute inset-0 netflix-gradient-right" />
        <div className="absolute inset-0 netflix-gradient-bottom" />
        <div className="absolute inset-0 netflix-gradient-top" />

        <Link
          href="/browse"
          className="absolute top-20 left-4 sm:left-8 lg:left-16 flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
      </div>
      <div className="relative -mt-32 sm:-mt-48 z-10 px-4 sm:px-8 lg:px-16 pb-16">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 mb-12">
          <div className="hidden sm:block flex-shrink-0 w-40 lg:w-52">
            {poster ? (
              <img src={poster} alt={title} className="w-full rounded shadow-2xl" />
            ) : (
              <div className="w-full aspect-[2/3] bg-gray-800 rounded flex items-center justify-center text-5xl">
                🎬
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl text-white text-shadow-lg mb-2 leading-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              {movie.vote_average > 0 && (
                <span className="text-green-400 font-bold">★ {movie.vote_average.toFixed(1)}</span>
              )}
              {year && <span className="text-gray-300">{year}</span>}
              {movie.runtime && (
                <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
              )}
              {movie.number_of_seasons && (
                <span className="text-gray-300">
                  {movie.number_of_seasons} Season
                  {movie.number_of_seasons > 1 ? 's' : ''}
                </span>
              )}
              <span className="border border-gray-600 text-gray-400 text-xs px-1.5 py-0.5">HD</span>
            </div>

            {movie.tagline && (
              <p className="text-gray-400 italic text-sm mb-3">&ldquo;{movie.tagline}&rdquo;</p>
            )}

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
              {movie.overview}
            </p>

            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-xs border border-gray-600 text-gray-300 px-3 py-1 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <MovieActions movie={movie} />

            {(cast.length > 0 || director) && (
              <div className="space-y-1 text-sm">
                {director && (
                  <p>
                    <span className="text-gray-500">Director: </span>
                    <span className="text-gray-200">{director.name}</span>
                  </p>
                )}
                {cast.length > 0 && (
                  <p>
                    <span className="text-gray-500">Cast: </span>
                    <span className="text-gray-200">
                      {cast
                        .slice(0, 5)
                        .map((c) => c.name)
                        .join(', ')}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {similar.length > 0 && <MovieRow title="More Like This" movies={similar} />}
      </div>
    </div>
  );
}
