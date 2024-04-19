import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { Movie, MovieApiResponse } from '../../../service/models/movie.model';
import { TmdbService } from '../../../service/tmdb.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

export type MovieListType = 'GENRE' | 'TREND';

@Component({
    selector: 'app-movie-list',
    standalone: true,
    imports: [
        MovieCardComponent
    ],
    templateUrl: './movie-list.component.html',
    styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
    @Input() genreId: number = -1;
    @Input() movieListType: MovieListType = 'GENRE';
    tmdbService = inject(TmdbService);
    moviesByGenre: Movie[] | undefined;
    trendMovies: Movie[] | undefined;

    constructor() {
        effect(() => {
            if (this.movieListType === 'GENRE') {
                const movieByGenreResponse = this.tmdbService.fetchMovieByGenre() ?? {} as MovieApiResponse;
                if (movieByGenreResponse.genreId === this.genreId) {
                    this.moviesByGenre = movieByGenreResponse.results;
                }
            } else if (this.movieListType === 'TREND') {
                const trendMoviesResponse = this.tmdbService.fetchTrendMovies();
                if (trendMoviesResponse) {
                    this.trendMovies = trendMoviesResponse.results;
                }
            }
        });
    }

    ngOnInit() {
        this.tmdbService.getMoviesByGenre(this.genreId);
    }
}
