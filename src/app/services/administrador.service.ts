import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Administrador } from '../models/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  apiUrl = this.global.apiUrlGlobal + '/administrador';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getadministradors() {
    return this.http.get(`${this.apiUrl}`);
  }

  getadministradoreseliminados() {
    return this.http.get(`${this.apiUrl}/eliminados`);
  }

  getadministrador(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // getadministradorbyuser(codigo: string | number) {
  //   return this.http.get(`${this.apiUrl}/usuario/${codigo}`);
  // }

  getadministradorbyuser(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/usuario/${codigo}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveadministrador(administrador: Administrador) {
    return this.http.post(`${this.apiUrl}/create`, administrador);
  }

  deleteadministrador(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateadministrador(id: string | number, updated: Administrador): Observable<Administrador> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
