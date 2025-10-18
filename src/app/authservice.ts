import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/register', { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, name: string, email: string }>('http://localhost:3000/login', { email, password })
      .pipe(
        tap(res => {
          if (isPlatformBrowser(this.platformId) && res.token) {
            localStorage.setItem(this.tokenKey, res.token);
          }
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
