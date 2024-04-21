import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, filter, map } from 'rxjs';
import { MovieCardComponent } from '../home/components/movie-card/movie-card.component';
import { Movie } from '../service/models/movie.model';
import { TmdbService } from '../service/tmdb.service';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        MovieCardComponent
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
    activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    tmdbService: TmdbService = inject(TmdbService);
    movies: Movie[] | undefined;

    constructor() {
        effect(() => {
            const moviesResponse = this.tmdbService.moviesBySearch();
            if (moviesResponse) {
                this.movies = moviesResponse.results;
            }
        });
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.pipe(
            filter(queryParams => queryParams['q']),
            debounceTime(500),
            map(queryParams => queryParams['q']),
        ).subscribe((term) => this.tmdbService.searchByTerm(term));

    }
}
