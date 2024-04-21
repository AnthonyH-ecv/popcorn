import { Component, effect, inject, OnInit } from '@angular/core';
import { Movie } from '../../../service/models/movie.model';
import { TmdbService } from '../../../service/tmdb.service';

@Component({
    selector: 'app-trend-movie',
    standalone: true,
    imports: [],
    templateUrl: './trend-movie.component.html',
    styleUrl: './trend-movie.component.scss'
})
export class TrendMovieComponent implements OnInit {
    tmdbService = inject(TmdbService);
    trendMovie: Movie | undefined;

    constructor() {
        effect(() => {
            const trendMoviesResponse = this.tmdbService.trendMovies();

            if (trendMoviesResponse) {
                this.trendMovie = trendMoviesResponse.results[0];
            }
        });
    }

    ngOnInit() {
        this.tmdbService.getTrendMovies();
    }
}
