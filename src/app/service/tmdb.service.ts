import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieApiResponse } from './models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  http: HttpClient = inject(HttpClient)
  baseUrl: string = environment.TMDB_API_BASE_URL;
  headers = new HttpHeaders({'Authorization': 'Bearer ' + environment.TMDB_API_TOKEN});

  private _fetchTrendMovie: WritableSignal<MovieApiResponse> = signal({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  });
  fetchTrendMovie = computed(() => this._fetchTrendMovie())

  getTrendMovie(): void{
    this.http.get<MovieApiResponse>(environment.TMDB_API_BASE_URL + '/trending/movie/day', {headers:this.headers})
        .subscribe({
          next: tmdbResponse => this._fetchTrendMovie.set(tmdbResponse),
          error: error => console.log(error),
        })
  }

  constructor() { }
}
