import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';
  students: string[] = [];
  totalSeats = 30;
  dark = false;
  join() {
    if (this.name.trim() !== '') {
      this.students.push(this.name);
      this.name = '';
    }
  }
  changeTheme() {
    this.dark = !this.dark;
  }
  getSeats() {
    return '🟩'.repeat(this.students.length) +
           '⬜'.repeat(this.totalSeats - this.students.length);
  }
}
