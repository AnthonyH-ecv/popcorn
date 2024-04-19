import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { GenresResponse } from './models/genre.model';
import { MovieApiResponse, MovieImageSize } from './models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class TmdbService {
    http: HttpClient = inject(HttpClient);
    apiToken: string = environment.TMDB_API_TOKEN;
    baseUrl: string = environment.TMDB_API_BASE_URL;
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.apiToken });

    private _fetchTrendMovies: WritableSignal<MovieApiResponse> = signal({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        genreId: 0
    });
    fetchTrendMovies = computed(() => this._fetchTrendMovies());

    private _fetchGenres: WritableSignal<GenresResponse> = signal({
        genres: [],
    });
    fetchGenres = computed(() => this._fetchGenres());

    private _fetchMovieByGenre: WritableSignal<MovieApiResponse> = signal({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        genreId: 0
    });
    fetchMovieByGenre = computed(() => this._fetchMovieByGenre());

    getTrendMovies(): void {
        this.http.get<MovieApiResponse>(this.baseUrl + '/trending/movie/day', { headers: this.headers })
            .subscribe({
                next: movieResponse => this._fetchTrendMovies.set(movieResponse),
                error: error => console.log(error),
            });
    }

    getAllGenre(): void {
        this.http.get<GenresResponse>(this.baseUrl + '/genre/movie/list', { headers: this.headers })
            .subscribe({
                next: genresResponse => this._fetchGenres.set(genresResponse),
                error: error => console.log(error),
            });
    }

    getMoviesByGenre(genreId: number): void {
        let queryParam = new HttpParams();
        queryParam = queryParam.set('language', 'en-US');
        queryParam = queryParam.set('with_genres', genreId);

        this.http.get<MovieApiResponse>(this.baseUrl + '/discover/movie', {
            headers: this.headers,
            params: queryParam
        })
            .subscribe({
                next: movieByGenreResponse => {
                    movieByGenreResponse.genreId = genreId;
                    this._fetchMovieByGenre.set(movieByGenreResponse);
                },
                error: error => console.log(error),
            });
    }

    getImageUrl(id: string, size: MovieImageSize): string {
        return `https://image.tmdb.org/t/p/${size}${id}`;
    }

    constructor() {
    }
}
