import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ReactiveFormsModule } from '@angular/forms';
import { MapPointService } from '../../services/map-point.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: L.Map | undefined;
  mapPoints: any[] = [];
  markers: L.Marker[] = []; // Para almacenar los marcadores en el mapa

  newPointForm: FormGroup;

  constructor(private mapPointService: MapPointService, private fb: FormBuilder) {
    this.newPointForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.initMap();
    this.loadMapPoints();
  }

  // Inicializar el mapa
  initMap(): void {
    this.map = L.map('map').setView([41.402525433669396, 2.1942883729934697], 13); // Latitud y Longitud iniciales

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      this.newPointForm.patchValue({
        latitude: lat,
        longitude: lng
      });
    });
  }

loadMapPoints(): void {
  this.mapPointService.getMapPoints().subscribe({
    next: (points) => {
      this.mapPoints = points;
      this.addPointsToMap(); 
    },
    error: (err) => {
      console.error('Error al cargar los puntos del mapa:', err);
    },
    complete: () => {
      console.log('Carga de puntos completa');
    }
  });
}

  addPointsToMap(): void {
    if (!this.map) return;

    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    this.mapPoints.forEach(point => {
      this.addPointToMap(point);
    });
  }

  addPointToMap(point: any): void {
    if (!this.map) return;

    const marker = L.marker([point.latitude, point.longitude]).addTo(this.map!);
    marker.bindPopup(`<b>${point.name}</b><br>${point.description}`).openPopup();
    this.markers.push(marker);
  }

  onSubmit(): void {
    if (this.newPointForm.invalid) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.addMapPoint();
  }

addMapPoint(): void {
  const point = this.newPointForm.value;

  this.mapPointService.addMapPoint(point).subscribe({
    next: (response) => {
      const newPoint = response.newPoint || response; 
      console.log('Punto agregado:', newPoint);

      this.addPointToMap(newPoint);

      this.newPointForm.reset();

      this.mapPoints.push(newPoint);
      this.addPointsToMap(); 
    },
    error: (err) => {
      console.error('Error al agregar el punto:', err);
    },
    complete: () => {
      console.log('Punto agregado correctamente');
    }
  });
}

deleteMapPoint(id: number): void {
  this.mapPointService.deleteMapPoint(id).subscribe({
    next: () => {
      console.log('Punto eliminado:', id);
      this.loadMapPoints();
    },
    error: (err) => {
      console.error('Error al eliminar el punto:', err);
    },
    complete: () => {
      console.log('Eliminación de punto completa');
    }
  });
}
}
