// src/app/services/map-point.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapPointService {
  private apiUrl = 'http://localhost:3000/api/mapPoints'; // URL de la API del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los puntos del mapa
  getMapPoints(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener un punto del mapa por ID
  getMapPoint(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo punto del mapa
  addMapPoint(point: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, point);
  }

  // Actualizar un punto del mapa
  updateMapPoint(id: number, point: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, point);
  }

  // Eliminar un punto del mapa
  deleteMapPoint(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
