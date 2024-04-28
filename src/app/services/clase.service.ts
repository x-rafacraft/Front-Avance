import { Observable } from 'rxjs';
import { Clase } from '../models/clase';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  apiUrl = this.global.apiUrlGlobal + '/clase';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getclases() {
    return this.http.get(`${this.apiUrl}`);
  }

  getclasebyperiodo(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/periodo/${codigo}`);
  }

  getclasebydocenteyperiodo(docentecod: string | number, periodocod: string | number) {
    return this.http.get(`${this.apiUrl}/periodo-docente/${docentecod}/${periodocod}`);
  }

  getclasebydocenteperiodocurso(docentecod: string | number, periodocod: string | number, cursocod: string | number) {
    return this.http.get(`${this.apiUrl}/periodo-docente-curso/${docentecod}/${periodocod}/${cursocod}`);
  }

  getclase(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveclase(clase: Clase) {
    return this.http.post(`${this.apiUrl}/create`, clase);
  }

  deleteclase(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateclase(id: string | number, updated: Clase): Observable<Clase> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
