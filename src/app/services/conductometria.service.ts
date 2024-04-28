import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Conductometria } from '../models/endodoncia';

@Injectable({
  providedIn: 'root'
})
export class ConductometriaService {
  apiUrl = this.global.apiUrlGlobal + '/conductometria';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrconductometrias() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrconductometriasbyendodoncia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/endodoncia/${codigo}`);
  }

  getrconductometria(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverconductometria(conductometria: Conductometria) {
    return this.http.post(`${this.apiUrl}/create`, conductometria);
  }

  deleterconductometria(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterconductometria(id: string | number, updated: Conductometria): Observable<Conductometria> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
