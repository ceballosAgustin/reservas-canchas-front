import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import Usuario from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.url + environment.prefixAuth;
  private loginUrl: string = environment.login;
  private registroUrl: string = environment.registro;
  private userData = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.userData.next(localStorage.getItem('authToken') || '');
  }

  login(email: string, clave: string): Observable<{token: string, email: string, nombre: string}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {email, clave};

    return this.http.post<{token: string, email: string, nombre: string}>
    (this.url + this.loginUrl, body, {headers})
    .pipe(map(response => {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('email', response.email);
      localStorage.setItem('nombre', response.nombre);
      return response;
    }))
  }

  registro(usuario: {email: string, clave: string, nombre: string, apellido: string}): Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Usuario>(this.url + this.registroUrl, usuario, {headers});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getUserRole(): string[] {
    const token = localStorage.getItem('authToken');
    if(token) {
      const decodedToken = this.jwtHelper.decodeToken(token);

      // authorities del Claims en JwtAuthenticationFilter (back)
      if(decodedToken && decodedToken.authorities) {
        return decodedToken.authorities;
      }
    }

    return [];
  }

  logout(): void {
    localStorage.clear();
  }
}
