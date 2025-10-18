import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage {
  email = '';
  password = '';
  tokenKey = 'token';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login() {
    if (!this.email || !this.password) {
      alert('Completează toate câmpurile!');
      return;
    }

    this.http.post<{ token: string }>('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        if (isPlatformBrowser(this.platformId) && res.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }
        alert('Login reușit!');
        this.email = '';
        this.password = '';
      },
      error: err => {
        console.error(err);
        alert('Eroare la login!');
      }
    });
  }
}
