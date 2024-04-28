import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Seguimiento } from '../models/seguimiento';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  apiUrl = this.global.apiUrlGlobal + '/seguimiento';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getseguimientos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getseguimientobyuser(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/usuario/${parametro}`);
  }

  getseguimientobycodigo(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/codigo/${parametro}`);
  }

  getseguimiento(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveseguimiento(seguimiento: Seguimiento) {
    return this.http.post(`${this.apiUrl}/create`, seguimiento);
  }

  deleteseguimiento(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
