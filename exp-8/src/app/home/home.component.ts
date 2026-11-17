import { Component } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  name = '';
  rating = 0;
  review = '';

  constructor(private service: MovieService) {}

  addReview() {

    if (this.name && this.rating >= 1 &&
        this.rating <= 5 && this.review) {

      this.service.addMovie({
        name: this.name,
        rating: this.rating,
        review: this.review
      });

      this.name = '';
      this.rating = 0;
      this.review = '';
    }
  }

  get movies() {
    return this.service.getMovies();
  }
}
