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

  // Formulario reactivo para añadir un nuevo punto
  newPointForm: FormGroup;

  constructor(private mapPointService: MapPointService, private fb: FormBuilder) {
    // Inicializar el formulario reactivo
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
    this.map = L.map('map').setView([40.712776, -74.005974], 13); // Latitud y Longitud iniciales

    // Añadir un tile layer al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Manejar clic en el mapa para establecer coordenadas en el formulario
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      this.newPointForm.patchValue({
        latitude: lat,
        longitude: lng
      });
    });
  }

  // Cargar puntos del mapa y añadirlos al mapa de Leaflet
  loadMapPoints(): void {
    this.mapPointService.getMapPoints().subscribe(points => {
      this.mapPoints = points;
      this.addPointsToMap(); // Añadir los puntos al mapa
    }, error => {
      console.error('Error al cargar los puntos del mapa:', error);
    });
  }

  // Añadir los puntos al mapa
  addPointsToMap(): void {
    if (!this.map) return;

    // Limpiar los marcadores existentes
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    this.mapPoints.forEach(point => {
      this.addPointToMap(point);
    });
  }

  // Añadir un solo punto al mapa
  addPointToMap(point: any): void {
    if (!this.map) return;

    const marker = L.marker([point.latitude, point.longitude]).addTo(this.map!);
    marker.bindPopup(`<b>${point.name}</b><br>${point.description}`).openPopup();
    this.markers.push(marker);
  }

  // Manejar el envío del formulario
  onSubmit(): void {
    if (this.newPointForm.invalid) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.addMapPoint();
  }

  // Agregar un nuevo punto al mapa y a la base de datos
  addMapPoint(): void {
    const point = this.newPointForm.value;

    this.mapPointService.addMapPoint(point).subscribe(response => {
      console.log('Punto agregado:', response);

      // Añadir el nuevo punto al mapa
      this.addPointToMap(response);

      // Limpiar el formulario
      this.newPointForm.reset();

      // Opcional: Actualizar la lista local de puntos
      this.mapPoints.push(response);

      // Actualizar el mapa con los puntos
      this.addPointsToMap();
    }, error => {
      console.error('Error al agregar el punto:', error);
    });
  }

  // Eliminar un punto por ID y actualizar la lista
  deleteMapPoint(id: number): void {
    this.mapPointService.deleteMapPoint(id).subscribe(() => {
      console.log('Punto eliminado:', id);
      this.loadMapPoints(); // Recargar los puntos del mapa
    }, error => {
      console.error('Error al eliminar el punto:', error);
    });
  }
}
