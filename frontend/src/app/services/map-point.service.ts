
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapPointService {
  private apiUrl = 'http://localhost:3000/api/mapPoints'; // URL de la API del backend

  constructor(private http: HttpClient) { }


  getMapPoints(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }


  getMapPoint(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  addMapPoint(point: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, point);
  }


  updateMapPoint(id: number, point: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, point);
  }


  deleteMapPoint(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
