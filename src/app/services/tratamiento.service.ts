import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Tratamiento } from '../models/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  apiUrl = this.global.apiUrlGlobal + '/tratamiento';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  gettratamientos() {
    return this.http.get(`${this.apiUrl}`);
  }

  gettratamientobyuser(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/usuario/${parametro}`);
  }

  gettratamientobycodigo(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/codigo/${parametro}`);
  }

  gettratamiento(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savetratamiento(tratamiento: Tratamiento) {
    return this.http.post(`${this.apiUrl}/create`, tratamiento);
  }

  deletetratamiento(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
