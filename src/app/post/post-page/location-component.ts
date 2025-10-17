import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height:350px"></div>`,
  imports: [HttpClientModule]
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();

    // Fetch issues from backend
    this.http.get<any[]>('http://localhost:3000/issues').subscribe(issues => {
      issues.forEach(issue => {
        if (issue.latitude && issue.longitude) {
          L.marker([issue.latitude, issue.longitude])
            .addTo(this.map)
            .bindPopup(`<b>${issue.title}</b><br>${issue.description}`);
        }
      });
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([47.0105, 28.8638], 13); // default centrul Chișinăului

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }
}
