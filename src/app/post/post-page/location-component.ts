import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="width: 100%; height: 500px;"></div>`
})
export class MapComponent implements AfterViewInit {
  map!: Map;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {  // rulează doar în browser
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({ source: new OSM() })
        ],
        view: new View({
          center: fromLonLat([28.8638, 47.0105]),
          zoom: 13
        })
      });
    }
  }
}
