import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getHomeRows, getHeroMovie } from '@/lib/tmdb';
import Navbar from '@/components/layout/Navbar';
import HeroBanner from '@/components/movie/HeroBanner';
import MovieRow from '@/components/movie/MovieRow';

export default async function BrowsePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');

  const [hero, rows] = await Promise.all([getHeroMovie(), getHomeRows()]);

  return (
    <div className="bg-netflix-dark min-h-screen">
      <Navbar />

      <HeroBanner movie={hero} />

      {/* Movie rows — overlap the hero slightly */}
      <div className="relative -mt-12 sm:-mt-16 lg:-mt-24 z-10 pb-12">
        {rows.map((row) => (
          <MovieRow key={row.title} title={row.title} movies={row.movies} />
        ))}
      </div>
    </div>
  );
}
