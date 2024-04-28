import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Integrante } from '../models/integrante';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IntegranteService {
  apiUrl = this.global.apiUrlGlobal + '/integrante';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getintegrantes() {
    return this.http.get(`${this.apiUrl}`);
  }

  // lo estudiantes de tal clase
  getintegrantebyclase(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/clase/${codigo}`);
  }

  // las clases del estudiante
  getintegrantebydocente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/estudiante/${codigo}`);
  }

  getintegrante(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveintegrante(integrante: Integrante) {
    return this.http.post(`${this.apiUrl}/create`, integrante);
  }

  deleteintegrante(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateintegrante(id: string | number, updated: Integrante): Observable<Integrante> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
