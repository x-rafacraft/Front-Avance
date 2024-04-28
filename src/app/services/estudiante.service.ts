import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  apiUrl = this.global.apiUrlGlobal + '/estudiante';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getestudiantes() {
    return this.http.get(`${this.apiUrl}`);
  }

  getestudianteseliminados() {
    return this.http.get(`${this.apiUrl}/eliminados`);
  }

  // getestudiantebyusuario(codigo: string | number) {
  //   return this.http.get(`${this.apiUrl}/usuario/${codigo}`);
  // }

  getestudiantebyusuario(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/usuario/${codigo}`);
  }

  getestudiantebyuser(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/usuario/${parametro}`);
  }

  getestudiantebycodigo(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/codigo/${parametro}`);
  }

  getestudiante(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveestudiante(estudiante: Estudiante) {
    return this.http.post(`${this.apiUrl}/create`, estudiante);
  }

  deleteestudiante(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateestudiante(id: string | number, updated: Estudiante): Observable<Estudiante> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
