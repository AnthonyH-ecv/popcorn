import { DatePipe } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../../../service/models/movie.model';
import { TmdbService } from '../../../service/tmdb.service';
import { getImageUrl } from '../../../utils';

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
    activeModal: NgbActiveModal = inject(NgbActiveModal);
    movie: Movie | undefined;

    constructor() {
        effect(() => {
            const moviesResponse = this.tmdbService.movie();
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

    close() {
        this.activeModal.close();
    }

    protected readonly getImageUrl = getImageUrl;
}
