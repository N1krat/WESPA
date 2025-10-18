import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './signin-page.html',
  styleUrl: './signin-page.css'
})
export class SigninPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private http: HttpClient) {}

  register() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Completează toate câmpurile!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Parolele nu coincid!');
      return;
    }

    this.http.post('http://localhost:3000/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => alert('Înregistrare reușită!'),
      error: err => {
        console.error(err);
        alert('Eroare la înregistrare!');
      }
    });
  }
}