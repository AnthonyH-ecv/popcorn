import { Component, effect, inject, OnInit } from '@angular/core';
import { ModalService } from '../../../service/modal.service';
import { Movie } from '../../../service/models/movie.model';
import { TmdbService } from '../../../service/tmdb.service';
import { getImageUrl } from '../../../utils';

@Component({
    selector: 'app-trend-movie',
    standalone: true,
    imports: [],
    templateUrl: './trend-movie.component.html',
    styleUrl: './trend-movie.component.scss'
})
export class TrendMovieComponent implements OnInit {
    tmdbService = inject(TmdbService);
    modalService = inject(ModalService);
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

    protected readonly getImageUrl = getImageUrl;
}
