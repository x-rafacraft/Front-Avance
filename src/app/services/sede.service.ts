import { Observable } from 'rxjs';
import { Sede } from '../models/sede';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  apiUrl = this.global.apiUrlGlobal + '/sedes';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getsedes() {
    return this.http.get(`${this.apiUrl}`);
  }

  getsedesbyempresa(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/empresa/${codigo}`);
  }

  getsede(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savesede(sede: Sede) {
    return this.http.post(`${this.apiUrl}/create`, sede);
  }

  deletesede(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatesede(id: string | number, updated: Sede): Observable<Sede> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
