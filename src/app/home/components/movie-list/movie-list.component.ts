import { AfterViewInit, Component, effect, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
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
export class MovieListComponent implements OnInit, AfterViewInit {
    @Input() genreId: number = -1;
    @Input() movieListType: MovieListType = 'GENRE';
    @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;
    private _scrollPosition: number = 0;
    canScrollLeft: boolean = false;
    tmdbService = inject(TmdbService);
    movies: Movie[] | undefined;

    constructor() {
        effect(() => {
            if (this.movieListType === 'GENRE') {
                const allMoviesListByGenreResponse = this.tmdbService.allMoviesListByGenre() ?? {} as MovieApiResponse;
                if (allMoviesListByGenreResponse) {
                    const moviesByGenre = allMoviesListByGenreResponse.find(list => list.genreId === this.genreId);
                    this.movies = moviesByGenre ? moviesByGenre.moviesResponse.results : [];
                }
            } else if (this.movieListType === 'TREND') {
                const trendMoviesResponse = this.tmdbService.trendMovies();
                if (trendMoviesResponse) {
                    this.movies = trendMoviesResponse.results;
                }
            }
        });
    }

    ngOnInit() {
        this.tmdbService.getMoviesByGenre(this.genreId);
    }

    ngAfterViewInit(): void {
        if (this.scrollContainer !== undefined) {
            this.checkScroll();
        }
    }

    onScroll(): void {
        const scrollPosition = this.scrollContainer.nativeElement.scrollLeft;
        this.canScrollLeft = scrollPosition > 0;
    }

    scrollLeft(): void {
        this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
        this.checkScroll();
    }

    scrollRight(): void {
        this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
        this.checkScroll();
    }

    checkScroll(): void {
        const container = this.scrollContainer.nativeElement;
        this.canScrollLeft = container.scrollLeft > 0;
    }
}
