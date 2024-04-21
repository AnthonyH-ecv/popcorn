export interface MovieApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
    genreId: number;
}

export interface Movie {
    backdrop_path: string;
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    title: string;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const INITIAL_MOVIE = {
    backdrop_path: '',
    id: 0,
    original_title: '',
    overview: '',
    poster_path: '',
    media_type: '',
    adult: false,
    title: '',
    original_language: '',
    genre_ids: [],
    popularity: 0,
    release_date: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
};

export type MovieImageSize = 'original' | 'w500' | 'w200';
