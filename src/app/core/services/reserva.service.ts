import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Reserva from '../models/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
    url: string = environment.url + environment.prefix + environment.reservas;

  constructor(private http: HttpClient) { }

  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.url, reserva);
  }

  getReservas(idCancha: number, fechaInicio: string, fechaFin: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.url}/${idCancha}`, {
      params: { fechaInicio, fechaFin },
    });
  }
}
