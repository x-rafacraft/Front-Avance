import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Epicrisis } from '../models/historiaclinica';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EpicrisisService {
  apiUrl = this.global.apiUrlGlobal + '/epicrisis';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getepicrisiss() {
    return this.http.get(`${this.apiUrl}`);
  }

  getepicrisissbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getepicrisis(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveepicrisis(notasevolutivas: Epicrisis) {
    return this.http.post(`${this.apiUrl}/create`, notasevolutivas);
  }

  deleteepicrisis(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateepicrisis(id: string | number, updated: Epicrisis): Observable<Epicrisis> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
