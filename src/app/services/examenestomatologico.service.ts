import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamenEstomatologico } from '../models/examenestomatologico';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenEstomatologicoService {
  apiUrl = this.global.apiUrlGlobal + '/examenestomatologico';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getexamenestomatologicos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getexamenestomatologicosbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getexamenestomatologico(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveexamenestomatologico(examenestomatologico: ExamenEstomatologico) {
    return this.http.post(`${this.apiUrl}/create`, examenestomatologico);
  }

  deleteexamenestomatologico(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateexamenestomatologico(id: string | number, updated: ExamenEstomatologico): Observable<ExamenEstomatologico> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
