import { Component, effect, inject, OnInit } from '@angular/core';
import { Genre } from '../../../service/models/genre.model';
import { TmdbService } from '../../../service/tmdb.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
    selector: 'app-movie-selector',
    standalone: true,
    imports: [
        MovieListComponent
    ],
    templateUrl: './movie-selector.component.html',
    styleUrl: './movie-selector.component.scss'
})
export class MovieSelectorComponent implements OnInit {
    tmdbService = inject(TmdbService);
    genres: Genre[] | undefined;

    constructor() {
        effect(() => {
            const genresResponse = this.tmdbService.genres();
            if (genresResponse) {
                this.genres = genresResponse.genres;
                this.tmdbService.getAllMoviesListByGenre(this.genres);
            }
        });
    }

    ngOnInit() {
        this.tmdbService.getAllGenre();
    }
}
