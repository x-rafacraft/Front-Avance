import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { ANivelPieza } from '../models/examenestomatologico';

@Injectable({
  providedIn: 'root'
})
export class ANivelPiezaService {
  apiUrl = this.global.apiUrlGlobal + '/anivelpieza';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getanivelpiezas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getanivelpiezasbyexamenextomatologico(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/examenestomatologico/${codigo}`);
  }

  getanivelpieza(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveanivelpieza(anivelpieza: ANivelPieza) {
    return this.http.post(`${this.apiUrl}/create`, anivelpieza);
  }

  deleteanivelpieza(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateanivelpieza(id: string | number, updated: ANivelPieza): Observable<ANivelPieza> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
