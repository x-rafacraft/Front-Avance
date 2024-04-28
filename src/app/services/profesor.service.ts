import { Injectable } from '@angular/core';
import { Profesor } from '../models/profesor';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  apiUrl = this.global.apiUrlGlobal + '/docente';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getprofesors() {
    return this.http.get(`${this.apiUrl}`);
  }

  getprofesorbyuser(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/usuario/${parametro}`);
  }

  getprofesorbycodigo(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/codigo/${parametro}`);
  }

  getprofesor(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveprofesor(profesor: Profesor) {
    return this.http.post(`${this.apiUrl}/create`, profesor);
  }

  deleteprofesor(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
