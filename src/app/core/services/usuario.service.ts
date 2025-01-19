import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Usuario from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    url: string = environment.url + environment.prefix + environment.usuarios;

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  borrarUsuario(idUsuario: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${idUsuario}`);
  }
}
