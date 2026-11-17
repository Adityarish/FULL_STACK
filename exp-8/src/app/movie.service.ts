import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies: any[] = [];

  addMovie(movie: any) {
    this.movies.push(movie);
  }

  getMovies() {
    return this.movies;
  }
}
