import { Component } from '@angular/core';
import { MovieSelectorComponent } from './components/movie-selector/movie-selector.component';
import { TrendMovieComponent } from './components/trend-movie/trend-movie.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        TrendMovieComponent,
        MovieSelectorComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
