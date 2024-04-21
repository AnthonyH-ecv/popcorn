import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { MovieDetailComponent } from '../home/components/movie-detail/movie-detail.component';
import { GenresResponse } from './models/genre.model';
import { INITIAL_MOVIE, Movie, MovieApiResponse, MovieImageSize } from './models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class TmdbService {
    http: HttpClient = inject(HttpClient);
    modalService: NgbModal = inject(NgbModal);
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

    private _fetchMovie: WritableSignal<Movie> = signal(INITIAL_MOVIE);
    fetchMovie = computed(() => this._fetchMovie());

    private _fetchMovieBySearch: WritableSignal<MovieApiResponse> = signal({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        genreId: 0
    });
    fetchMovieBySearch = computed(() => this._fetchMovieBySearch());

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

    getMovieById(id: number): void {
        this.http.get<Movie>(this.baseUrl + `/movie/${id}`, { headers: this.headers })
            .subscribe({
                next: movieResponse => this._fetchMovie.set(movieResponse),
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
                    this._fetchMovieBySearch.set(movieApiResponse);
                },
                error: error => console.log(error),
            });
    }

    clearMovie() {
        this._fetchMovie.set(INITIAL_MOVIE);
    }

    openMovieDetail(movieId: number): void {
        let movieDetailModal = this.modalService.open(MovieDetailComponent);
        movieDetailModal.componentInstance.movieId = movieId;
    };

    getImageUrl(id: string, size: MovieImageSize): string {
        return `https://image.tmdb.org/t/p/${size}${id}`;
    }

    constructor() {
    }
}
