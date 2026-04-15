import type { Movie, MovieDetail } from '@/types';

export const mockMovies: Movie[] = [
  { id: 1, title: 'Inception', overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', poster_path: null, backdrop_path: null, vote_average: 8.8, vote_count: 34000, release_date: '2010-07-16', genre_ids: [28, 878, 12], adult: false, popularity: 90 },
  { id: 2, title: 'The Dark Knight', overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', poster_path: null, backdrop_path: null, vote_average: 9.0, vote_count: 31000, release_date: '2008-07-18', genre_ids: [28, 80, 18], adult: false, popularity: 95 },
  { id: 3, title: 'Interstellar', overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', poster_path: null, backdrop_path: null, vote_average: 8.6, vote_count: 33000, release_date: '2014-11-07', genre_ids: [878, 12, 18], adult: false, popularity: 88 },
  { id: 4, title: 'Parasite', overview: 'All unemployed, Ki-taek\'s family take peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.', poster_path: null, backdrop_path: null, vote_average: 8.5, vote_count: 17000, release_date: '2019-11-08', genre_ids: [35, 53, 18], adult: false, popularity: 80 },
  { id: 5, title: 'The Shawshank Redemption', overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', poster_path: null, backdrop_path: null, vote_average: 9.3, vote_count: 26000, release_date: '1994-09-23', genre_ids: [18, 80], adult: false, popularity: 85 },
  { id: 6, title: 'Dune', overview: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.', poster_path: null, backdrop_path: null, vote_average: 8.0, vote_count: 11000, release_date: '2021-10-22', genre_ids: [878, 12], adult: false, popularity: 82 },
  { id: 7, title: 'Oppenheimer', overview: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.', poster_path: null, backdrop_path: null, vote_average: 8.6, vote_count: 15000, release_date: '2023-07-21', genre_ids: [18, 36], adult: false, popularity: 91 },
  { id: 8, title: 'Barbie', overview: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.', poster_path: null, backdrop_path: null, vote_average: 7.1, vote_count: 8500, release_date: '2023-07-21', genre_ids: [35, 12], adult: false, popularity: 79 },
  { id: 9, title: 'The Batman', overview: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.', poster_path: null, backdrop_path: null, vote_average: 7.8, vote_count: 9000, release_date: '2022-03-04', genre_ids: [28, 80, 18], adult: false, popularity: 78 },
  { id: 10, title: 'Avatar: The Way of Water', overview: 'Jake Sully lives with his newfound family formed on the planet of Pandora.', poster_path: null, backdrop_path: null, vote_average: 7.7, vote_count: 7500, release_date: '2022-12-16', genre_ids: [878, 12, 28], adult: false, popularity: 77 },
  { id: 11, title: 'John Wick: Chapter 4', overview: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.', poster_path: null, backdrop_path: null, vote_average: 7.8, vote_count: 6000, release_date: '2023-03-24', genre_ids: [28, 53], adult: false, popularity: 76 },
  { id: 12, title: 'Spider-Man: No Way Home', overview: 'Peter Parker\'s secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange.', poster_path: null, backdrop_path: null, vote_average: 8.3, vote_count: 20000, release_date: '2021-12-17', genre_ids: [28, 12, 878], adult: false, popularity: 89 },
  { id: 13, title: 'Everything Everywhere All at Once', overview: 'An aging Chinese immigrant is swept up in an insane adventure in which she alone can save existence by exploring other universes.', poster_path: null, backdrop_path: null, vote_average: 8.0, vote_count: 8000, release_date: '2022-03-25', genre_ids: [28, 12, 35], adult: false, popularity: 75 },
  { id: 14, title: 'Top Gun: Maverick', overview: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.', poster_path: null, backdrop_path: null, vote_average: 8.3, vote_count: 10000, release_date: '2022-05-27', genre_ids: [28, 18], adult: false, popularity: 87 },
  { id: 15, title: 'The Godfather', overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', poster_path: null, backdrop_path: null, vote_average: 9.2, vote_count: 18000, release_date: '1972-03-24', genre_ids: [18, 80], adult: false, popularity: 84 },
  { id: 16, title: 'Joker', overview: 'A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain.', poster_path: null, backdrop_path: null, vote_average: 8.4, vote_count: 22000, release_date: '2019-10-04', genre_ids: [80, 18, 53], adult: false, popularity: 83 },
  { id: 17, title: 'Mad Max: Fury Road', overview: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.', poster_path: null, backdrop_path: null, vote_average: 8.1, vote_count: 23000, release_date: '2015-05-15', genre_ids: [28, 12, 878], adult: false, popularity: 81 },
  { id: 18, title: 'Poor Things', overview: 'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.', poster_path: null, backdrop_path: null, vote_average: 8.0, vote_count: 5000, release_date: '2023-12-08', genre_ids: [35, 18, 10749], adult: false, popularity: 72 },
];

export const mockMovieDetail: MovieDetail = {
  ...mockMovies[0],
  genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }, { id: 12, name: 'Adventure' }],
  runtime: 148,
  tagline: 'Your mind is the scene of the crime.',
  status: 'Released',
  budget: 160000000,
  revenue: 836836967,
  videos: {
    results: [{ id: 'v1', key: 'YoHD9XEInc0', name: 'Inception Trailer', type: 'Trailer', site: 'YouTube' }],
  },
  credits: {
    cast: [
      { id: 101, name: 'Leonardo DiCaprio',  character: 'Cobb',        profile_path: null, order: 0 },
      { id: 102, name: 'Joseph Gordon-Levitt', character: 'Arthur',   profile_path: null, order: 1 },
      { id: 103, name: 'Ellen Page',          character: 'Ariadne',    profile_path: null, order: 2 },
      { id: 104, name: 'Tom Hardy',           character: 'Eames',      profile_path: null, order: 3 },
      { id: 105, name: 'Ken Watanabe',        character: 'Saito',      profile_path: null, order: 4 },
      { id: 106, name: 'Cillian Murphy',      character: 'Fischer',    profile_path: null, order: 5 },
    ],
    crew: [{ id: 200, name: 'Christopher Nolan', job: 'Director', department: 'Directing' }],
  },
  similar: { results: mockMovies.slice(2, 7) },
};

export const getMockRows = () => [
  { title: '🔥 Trending Now',      movies: mockMovies.slice(0, 8)  },
  { title: '⭐ Top Rated',          movies: mockMovies.slice(3, 12) },
  { title: '🎬 Action & Adventure', movies: mockMovies.filter(m => m.genre_ids.includes(28)).slice(0, 8) },
  { title: '🚀 Sci-Fi',             movies: mockMovies.filter(m => m.genre_ids.includes(878)).slice(0, 8) },
  { title: '🎭 Drama',              movies: mockMovies.filter(m => m.genre_ids.includes(18)).slice(0, 8) },
];
