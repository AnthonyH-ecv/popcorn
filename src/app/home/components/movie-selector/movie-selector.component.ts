import { Component, effect, inject, OnInit } from '@angular/core';
import { Genre } from '../../../service/models/genre.model';
import { TmdbService } from '../../../service/tmdb.service';

@Component({
    selector: 'app-movie-selector',
    standalone: true,
    imports: [],
    templateUrl: './movie-selector.component.html',
    styleUrl: './movie-selector.component.scss'
})
export class MovieSelectorComponent implements OnInit {
    tmdbService = inject(TmdbService);
    genres: Genre[] | undefined;

    constructor() {
        effect(() => {
            const genresResponse = this.tmdbService.fetchGenres();
            if (genresResponse) {
                this.genres = genresResponse.genres;
            }
        });
    }

    ngOnInit() {
        this.tmdbService.fetchGenres();
    }
}
