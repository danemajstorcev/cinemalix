export interface Movie {
  id:                number;
  title:             string;
  name?:             string;
  original_title?:   string;
  overview:          string;
  poster_path:       string | null;
  backdrop_path:     string | null;
  vote_average:      number;
  vote_count:        number;
  release_date?:     string;
  first_air_date?:   string;
  genre_ids:         number[];
  media_type?:       'movie' | 'tv';
  adult:             boolean;
  popularity:        number;
}

export interface MovieDetail extends Movie {
  genres:             Genre[];
  runtime?:           number;
  number_of_seasons?: number;
  tagline?:           string;
  status:             string;
  budget?:            number;
  revenue?:           number;
  homepage?:          string;
  production_companies?: { id: number; name: string; logo_path: string | null }[];
  videos?:            { results: Video[] };
  credits?:           { cast: CastMember[]; crew: CrewMember[] };
  similar?:           { results: Movie[] };
}

export interface Genre   { id: number; name: string }
export interface Video   { id: string; key: string; name: string; type: string; site: string }
export interface CastMember { id: number; name: string; character: string; profile_path: string | null; order: number }
export interface CrewMember { id: number; name: string; job: string; department: string }

export interface MovieRow {
  title:   string;
  movies:  Movie[];
  genre?:  string;
}
