import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgFor, TitleCasePipe],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage {
  selectedRegion = '';

  posts = [
    { name: 'Fix Street Lights', tags: ['infrastructure'], image: 'https://placehold.co/400x400', region: 'north' },
    { name: 'Repaint Crosswalks', tags: ['safety'], image: 'https://placehold.co/400x400', region: 'north' },
    { name: 'Clean the Park', tags: ['environment'], image: 'https://placehold.co/400x400', region: 'south' },
    { name: 'Plant More Trees', tags: ['eco', 'community'], image: 'https://placehold.co/400x400', region: 'south' },
    { name: 'Repair Water Pipes', tags: ['infrastructure'], image: 'https://placehold.co/400x400', region: 'east' },
    { name: 'Build a Playground', tags: ['community'], image: 'https://placehold.co/400x400', region: 'east' },
    { name: 'Install Benches', tags: ['comfort'], image: 'https://placehold.co/400x400', region: 'west' },
    { name: 'Add Bicycle Lanes', tags: ['mobility'], image: 'https://placehold.co/400x400', region: 'west' },
  ];

  get filteredPosts() {
    return this.posts.filter(post => post.region === this.selectedRegion);
  }
}
