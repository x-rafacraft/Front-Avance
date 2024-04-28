import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Docente } from '../models/docente';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  apiUrl = this.global.apiUrlGlobal + '/docente';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getdocentes() {
    return this.http.get(`${this.apiUrl}`);
  }

  getdocenteseliminados() {
    return this.http.get(`${this.apiUrl}/eliminados`);
  }

  getdocente(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // getdocentebyusuario(codigo: string | number) {
  //   return this.http.get(`${this.apiUrl}/usuario/${codigo}`);
  // }

  getdocentebyusuario(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/usuario/${codigo}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savedocente(docente: Docente) {
    return this.http.post(`${this.apiUrl}/create`, docente);
  }

  deletedocente(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatedocente(id: string | number, updated: Docente): Observable<Docente> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
