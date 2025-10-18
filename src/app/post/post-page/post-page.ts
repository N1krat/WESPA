import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapComponent } from './location-component';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MapComponent],
  templateUrl: './post-page.html',
  styleUrls: ['./post-page.css']
})
export class PostPage {
  title = '';
  description = '';
  tag = '';
  imageFile: File | null = null;
  token: string | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    // Verificăm dacă suntem în browser înainte să accesăm localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  submitIssue() {
    if (!this.title || !this.description || !this.tag) {
      alert('Completează toate câmpurile!');
      return;
    }

    if (!this.token) {
      alert('Trebuie să fii autentificat!');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('tag', this.tag);
    if (this.imageFile) formData.append('image', this.imageFile);

    const headers = { Authorization: `Bearer ${this.token}` };

    this.http.post('http://localhost:3000/issues', formData, { headers }).subscribe({
      next: () => {
        alert('Problemă trimisă cu succes!');
        this.title = '';
        this.description = '';
        this.tag = '';
        this.imageFile = null;
      },
      error: (err) => console.error('Eroare la submit:', err)
    });
  }
}
