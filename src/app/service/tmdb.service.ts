import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Genre, GenresResponse } from './models/genre.model';
import { INITIAL_MOVIE, Movie, MovieApiResponse } from './models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class TmdbService {
    http: HttpClient = inject(HttpClient);
    apiToken: string = environment.TMDB_API_TOKEN;
    baseUrl: string = environment.TMDB_API_BASE_URL;
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.apiToken });

    private _trendMovies: WritableSignal<MovieApiResponse> = signal({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        genreId: 0
    });
    trendMovies = computed(() => this._trendMovies());

    private _genres: WritableSignal<GenresResponse> = signal({
        genres: [],
    });
    genres = computed(() => this._genres());

    private _allMoviesListByGenre: WritableSignal<{ genreId: number, moviesResponse: MovieApiResponse }[]> = signal([]);
    allMoviesListByGenre = computed(() => this._allMoviesListByGenre());

    private _movie: WritableSignal<Movie> = signal(INITIAL_MOVIE);
    movie = computed(() => this._movie());

    private _moviesBySearch: WritableSignal<MovieApiResponse> = signal({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        genreId: 0
    });
    moviesBySearch = computed(() => this._moviesBySearch());

    getTrendMovies(): void {
        this.http.get<MovieApiResponse>(this.baseUrl + '/trending/movie/day', { headers: this.headers })
            .subscribe({
                next: movieResponse => this._trendMovies.set(movieResponse),
                error: error => console.log(error),
            });
    }

    getAllGenre(): void {
        this.http.get<GenresResponse>(this.baseUrl + '/genre/movie/list', { headers: this.headers })
            .subscribe({
                next: genresResponse => this._genres.set(genresResponse),
                error: error => console.log(error),
            });
    }

    getMoviesByGenre(genreId: number): Observable<{ genreId: number, moviesResponse: MovieApiResponse }> {
        let queryParam = new HttpParams()
            .set('language', 'en-US')
            .set('with_genres', genreId.toString());

        return this.http.get<MovieApiResponse>(`${this.baseUrl}/discover/movie`, {
            headers: this.headers,
            params: queryParam
        }).pipe(
            map(moviesResponse => ({ genreId, moviesResponse }))
        );
    }

    getAllMoviesListByGenre(genres: Genre[] | undefined): void {
        const requests = genres?.map(({ id }) => this.getMoviesByGenre(id));
        forkJoin(requests!)
            .subscribe({
                next: movieResponse => this._allMoviesListByGenre.set(movieResponse),
                error: error => console.log(error),
            });
    }

    getMovieById(id: number): void {
        this.http.get<Movie>(this.baseUrl + `/movie/${id}`, { headers: this.headers })
            .subscribe({
                next: movieResponse => this._movie.set(movieResponse),
                error: error => console.log(error),
            });
    }

    searchByTerm(term: string): void {
        let queryParam = new HttpParams();
        queryParam = queryParam.set('language', 'en-US');
        queryParam = queryParam.set('query', term);

        this.http.get<MovieApiResponse>(this.baseUrl + `/search/movie`, { headers: this.headers, params: queryParam })
            .subscribe({
                next: movieApiResponse => {
                    this._moviesBySearch.set(movieApiResponse);
                },
                error: error => console.log(error),
            });
    }

    clearMovie() {
        this._movie.set(INITIAL_MOVIE);
    }

    constructor() {
    }
}
