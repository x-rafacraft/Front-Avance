import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { TejidosDuros } from '../models/examenestomatologico';

@Injectable({
  providedIn: 'root'
})
export class TejidosDurosService {
  apiUrl = this.global.apiUrlGlobal + '/tejidosduros';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  gettejidosduross() {
    return this.http.get(`${this.apiUrl}`);
  }

  gettejidosdurossbyexamenextomatologico(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/examenestomatologico/${codigo}`);
  }

  gettejidosduros(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savetejidosduros(tejidosduros: TejidosDuros) {
    return this.http.post(`${this.apiUrl}/create`, tejidosduros);
  }

  deletetejidosduros(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatetejidosduros(id: string | number, updated: TejidosDuros): Observable<TejidosDuros> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
