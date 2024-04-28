import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cirugia } from '../models/cirugia';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CirugiaService {
  apiUrl = this.global.apiUrlGlobal + '/cirugia';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrcirugias() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrcirugiasbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getrcirugia(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savercirugia(rcirugia: Cirugia) {
    return this.http.post(`${this.apiUrl}/create`, rcirugia);
  }

  deletercirugia(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatercirugia(id: string | number, updated: Cirugia): Observable<Cirugia> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
