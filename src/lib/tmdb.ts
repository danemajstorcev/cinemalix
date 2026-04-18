import type { Movie, MovieDetail, MovieRow } from '@/types';
import { getMockRows, mockMovies } from '@/data/mockData';

const BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY || '';

export const IMG_BASE = 'https://image.tmdb.org/t/p';
export const posterUrl = (path: string | null, size = 'w342') =>
  path ? `${IMG_BASE}/${size}${path}` : null;
export const backdropUrl = (path: string | null, size = 'original') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

const buildUrl = (endpoint: string): string => {
  const separator = endpoint.includes('?') ? '&' : '?';
  return `${BASE}${endpoint}${separator}api_key=${API_KEY}&language=en-US`;
};

const get = async <T>(endpoint: string): Promise<T | null> => {
  if (!API_KEY) return null;
  try {
    const res = await fetch(buildUrl(endpoint), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`TMDB ${endpoint} → ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    console.error(`TMDB fetch error for ${endpoint}:`, err);
    return null;
  }
};

export async function getHomeRows(): Promise<MovieRow[]> {
  if (!API_KEY) return getMockRows();

  const [trending, topRated, action, scifi, drama, thriller, comedy] = await Promise.all([
    get<{ results: Movie[] }>('/trending/all/week'),
    get<{ results: Movie[] }>('/movie/top_rated'),
    get<{ results: Movie[] }>('/discover/movie?with_genres=28&sort_by=popularity.desc'),
    get<{ results: Movie[] }>('/discover/movie?with_genres=878&sort_by=popularity.desc'),
    get<{ results: Movie[] }>(
      '/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=1000'
    ),
    get<{ results: Movie[] }>('/discover/movie?with_genres=53&sort_by=popularity.desc'),
    get<{ results: Movie[] }>('/discover/movie?with_genres=35&sort_by=popularity.desc'),
  ]);

  return [
    { title: '🔥 Trending Now', movies: trending?.results ?? [] },
    { title: '⭐ Top Rated', movies: topRated?.results ?? [] },
    { title: '🎬 Action & Adventure', movies: action?.results ?? [] },
    { title: '🚀 Sci-Fi', movies: scifi?.results ?? [] },
    { title: '🎭 Drama', movies: drama?.results ?? [] },
    { title: '😱 Thrillers', movies: thriller?.results ?? [] },
    { title: '😂 Comedy', movies: comedy?.results ?? [] },
  ].filter((r) => r.movies.length > 0);
}

export async function getHeroMovie(): Promise<Movie> {
  if (!API_KEY) return mockMovies[0];
  const data = await get<{ results: Movie[] }>('/trending/movie/day');
  const movies = data?.results ?? [];
  const pick = movies[Math.floor(Math.random() * Math.min(5, movies.length))];
  return pick ?? mockMovies[0];
}

export async function getMovieDetail(id: string): Promise<MovieDetail | null> {
  if (!API_KEY) {
    const movieId = parseInt(id);
    const movie = mockMovies.find((m) => m.id === movieId);
    if (!movie) return null;
    return {
      ...movie,
      genres: [
        { id: 28, name: 'Action' },
        { id: 878, name: 'Science Fiction' },
      ],
      runtime: 148,
      tagline: 'Demo mode',
      status: 'Released',
      videos: {
        results: [
          { id: 'v1', key: 'YoHD9XEInc0', name: 'Trailer', type: 'Trailer', site: 'YouTube' },
        ],
      },
      credits: {
        cast: [{ id: 101, name: 'Actor Name', character: 'Role', profile_path: null, order: 0 }],
        crew: [{ id: 200, name: 'Director Name', job: 'Director', department: 'Directing' }],
      },
      similar: { results: mockMovies.filter((m) => m.id !== movieId).slice(0, 6) },
    };
  }

  const data = await get<MovieDetail>(
    `/movie/${id}?append_to_response=videos,credits,similar,recommendations`
  );

  if (!data) {
    const tvData = await get<MovieDetail>(
      `/tv/${id}?append_to_response=videos,credits,similar,recommendations`
    );
    return tvData;
  }

  return data;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!API_KEY) {
    return mockMovies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
  }
  const data = await get<{ results: Movie[] }>(
    `/search/multi?query=${encodeURIComponent(query)}&include_adult=false`
  );
  return (data?.results ?? []).filter(
    (r: any) => r.media_type === 'movie' || r.media_type === 'tv'
  );
}
