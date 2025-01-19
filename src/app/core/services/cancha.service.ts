import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cancha from '../models/cancha';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  url: string = environment.url + environment.prefix + environment.canchas;
  urlCanchasActivas: string = environment.url + environment.prefix + environment.canchasActivas;

  constructor(private http: HttpClient) { }

  getCanchas(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(this.url);
  }

  getCanchasActivas(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(this.urlCanchasActivas);
  }

  getCancha(id: number): Observable<Cancha> {
    return this.http.get<Cancha>(this.url + '/' + id);
  }

  crearCancha(cancha: Cancha): Observable<Cancha> {
    return this.http.post<Cancha>(this.url, cancha);
  }

  modificarCancha(cancha: Cancha): Observable<Cancha> {
    return this.http.put<Cancha>(`${this.url}/${cancha.idCancha}`, cancha);
  }

  eliminarCancha(idCancha: number): Observable<Cancha> {
    return this.http.delete<Cancha>(`${this.url}/${idCancha}`);
  }
}
