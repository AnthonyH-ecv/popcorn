import { DatePipe } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../service/models/movie.model';
import { TmdbService } from '../../../service/tmdb.service';

@Component({
    selector: 'app-movie',
    standalone: true,
    imports: [
        DatePipe
    ],
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit, OnDestroy {
    movieId: number = -1;
    tmdbService: TmdbService = inject(TmdbService);
    movie: Movie | undefined;

    constructor() {
        effect(() => {
            const moviesResponse = this.tmdbService.fetchMovie();
            if (moviesResponse) {
                this.movie = moviesResponse;
            }
        });
    }

    ngOnInit() {
        this.tmdbService.getMovieById(this.movieId);
    }

    ngOnDestroy(): void {
        this.tmdbService.clearMovie();
    }

}
