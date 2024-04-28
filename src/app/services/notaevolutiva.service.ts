import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotasEvolutivas } from '../models/historiaclinica';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class NotasEvolutivasService {
  apiUrl = this.global.apiUrlGlobal + '/notaevolutiva';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getnotaevolutivas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getnotaevolutivasbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getnotaevolutiva(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savenotaevolutiva(notasevolutivas: NotasEvolutivas) {
    return this.http.post(`${this.apiUrl}/create`, notasevolutivas);
  }

  deletenotaevolutiva(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatenotaevolutiva(id: string | number, updated: NotasEvolutivas): Observable<NotasEvolutivas> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
