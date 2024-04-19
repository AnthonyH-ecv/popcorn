import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        total_results: 0
    });
    fetchTrendMovies = computed(() => this._fetchTrendMovies());

    private _fetchGenres: WritableSignal<GenresResponse> = signal({
        genres: [],
    });
    fetchGenres = computed(() => this._fetchGenres());

    getTrendMovies(): void {
        this.http.get<MovieApiResponse>(this.baseUrl + '/trending/movie/day', { headers: this.headers })
            .subscribe({
                next: tmdbResponse => this._fetchTrendMovies.set(tmdbResponse),
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

    getImageUrl(id: string, size: MovieImageSize): string {
        return `https://image.tmdb.org/t/p/${size}/${id}`;
    }

    constructor() {
    }
}
