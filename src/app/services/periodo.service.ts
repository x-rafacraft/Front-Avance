import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Periodo } from '../models/periodo';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  apiUrl = this.global.apiUrlGlobal + '/periodos';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getperiodos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getperiodobysede(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/sede/${codigo}`);
  }

  getperiodo(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveperiodo(periodo: Periodo) {
    return this.http.post(`${this.apiUrl}/create`, periodo);
  }

  deleteperiodo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateperiodo(id: string | number, updated: Periodo): Observable<Periodo> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
