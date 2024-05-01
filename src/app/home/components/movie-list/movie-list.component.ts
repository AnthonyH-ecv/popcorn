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
                const allMoviesListByGenreResponse = this.tmdbService.allMoviesListByGenre() ?? {} as MovieApiResponse;
                if (allMoviesListByGenreResponse) {
                    const moviesByGenre = allMoviesListByGenreResponse.find(list => list.genreId === this.genreId);
                    this.moviesByGenre = moviesByGenre ? moviesByGenre.moviesResponse.results : [];
                }
            } else if (this.movieListType === 'TREND') {
                const trendMoviesResponse = this.tmdbService.trendMovies();
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
