import { Component, inject, Input } from '@angular/core';
import { ModalService } from '../../../service/modal.service';
import { Movie } from '../../../service/models/movie.model';
import { getImageUrl } from '../../../utils';

@Component({
    selector: 'app-movie-card',
    standalone: true,
    imports: [],
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
    @Input() movie: Movie | undefined;
    modalService = inject(ModalService);
    protected readonly getImageUrl = getImageUrl;
}
