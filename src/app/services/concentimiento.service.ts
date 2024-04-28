import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Concentimiento } from '../models/concentimiento';

@Injectable({
  providedIn: 'root'
})
export class ConcentimientoService {
  apiUrl = this.global.apiUrlGlobal + '/concentimiento';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getConcentimientos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getConcentimientobycirugia(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/cirugia/${parametro}`);
  }


  getConcentimiento(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveConcentimiento(Concentimiento: Concentimiento) {
    return this.http.post(`${this.apiUrl}/create`, Concentimiento);
  }

  deleteConcentimiento(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateaConcentimiento(id: string | number, updated: Concentimiento): Observable<Concentimiento> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
