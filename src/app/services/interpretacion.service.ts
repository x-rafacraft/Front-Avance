import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Interpretacion } from '../models/historiaclinica';

@Injectable({
  providedIn: 'root'
})
export class InterpretacionService {
  apiUrl = this.global.apiUrlGlobal + '/interpretacion';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getinterpretacions() {
    return this.http.get(`${this.apiUrl}`);
  }

  getinterpretacionsbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getinterpretacion(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveinterpretacion(interpretacion: Interpretacion) {
    return this.http.post(`${this.apiUrl}/create`, interpretacion);
  }

  deleteinterpretacion(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateinterpretacion(id: string | number, updated: Interpretacion): Observable<Interpretacion> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
