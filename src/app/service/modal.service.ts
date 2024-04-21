import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetailComponent } from '../home/components/movie-detail/movie-detail.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(private modalService: NgbModal) {
    }

    openMovieDetail(movieId: number): void {
        const movieDetailModal = this.modalService.open(MovieDetailComponent);
        movieDetailModal.componentInstance.movieId = movieId;
    }
}
