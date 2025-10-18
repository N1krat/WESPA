import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `
    <div class="map-wrapper">
      <div id="map" class="map"></div>

      <!-- Popup pentru markere -->
      <div id="popup" class="ol-popup" #popup>
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
  `,
  styles: [`
    .map-wrapper {
      position: relative;
      width: 100%;
      height: 400px;
    }

    .map {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }

    .ol-popup {
      position: absolute;
      background-color: white;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #cccccc;
      bottom: 12px;
      left: -50px;
      min-width: 120px;
    }

    .ol-popup:after, .ol-popup:before {
      top: 100%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    .ol-popup:after {
      border-top-color: white;
      border-width: 10px;
      left: 48px;
      margin-left: -10px;
    }

    .ol-popup:before {
      border-top-color: #cccccc;
      border-width: 11px;
      left: 48px;
      margin-left: -11px;
    }

    .ol-popup-closer {
      text-decoration: none;
      position: absolute;
      top: 2px;
      right: 8px;
    }

    .ol-popup-closer:after {
      content: "✖";
    }
  `]
})
export class MapComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const locations = [
      { name: 'Centrul orașului', coords: [28.8638, 47.0105] },
      { name: 'Parcul Central', coords: [28.8305, 47.025] },
      { name: 'Primăria', coords: [28.8701, 47.008] },
      { name: 'Școala Nr. 3', coords: [28.854, 47.020] }
    ];

    const markerStyle = new Style({
      image: new Icon({
        src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        scale: 0.05,
        anchor: [0.5, 1]
      })
    });

    const markerFeatures = locations.map(loc => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(loc.coords)),
        name: loc.name
      });
      feature.setStyle(markerStyle);
      return feature;
    });

    const vectorSource = new VectorSource({ features: markerFeatures });
    const markerLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() }),
        markerLayer
      ],
      view: new View({
        center: fromLonLat([28.8638, 47.0105]),
        zoom: 13
      })
    });

    // Popup elements
    const container = document.getElementById('popup')!;
    const content = document.getElementById('popup-content')!;
    const closer = document.getElementById('popup-closer')!;

    const overlay = new Overlay({
      element: container,
      autoPan: true,
      
    });
    map.addOverlay(overlay);

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    // Când dai click pe marker → arată popup cu numele
    map.on('singleclick', evt => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
      if (feature) {
        const coord = (feature.getGeometry() as Point).getCoordinates();
        const name = feature.get('name');
        content.innerHTML = `<b>${name}</b>`;
        overlay.setPosition(coord);
      } else {
        overlay.setPosition(undefined);
      }
    });
  }
}
