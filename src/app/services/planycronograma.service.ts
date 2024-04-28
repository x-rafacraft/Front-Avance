import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanyCronograma } from '../models/historiaclinica';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PlanyCronogramaService {
  apiUrl = this.global.apiUrlGlobal + '/planycronograma';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getplanyprogramas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getplanyprogramasbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getplanyprograma(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveplanyprograma(planyprograma: PlanyCronograma) {
    return this.http.post(`${this.apiUrl}/create`, planyprograma);
  }

  deleteplanyprograma(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateplanyprograma(id: string | number, updated: PlanyCronograma): Observable<PlanyCronograma> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
