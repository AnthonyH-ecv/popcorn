import { Component } from '@angular/core';
import { TrendMovieComponent } from './components/trend-movie/trend-movie.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        TrendMovieComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
