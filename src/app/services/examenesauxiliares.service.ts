import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamenesAuxiliares } from '../models/historiaclinica';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenesAuxiliaresService {
  apiUrl = this.global.apiUrlGlobal + '/examenesauxiliares';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getexamenesauxiliaress() {
    return this.http.get(`${this.apiUrl}`);
  }

  getexamenesauxiliaressbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getexamenesauxiliares(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveexamenesauxiliares(examenesauxiliares: ExamenesAuxiliares) {
    return this.http.post(`${this.apiUrl}/create`, examenesauxiliares);
  }

  deleteexamenesauxiliares(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateexamenesauxiliares(id: string | number, updated: ExamenesAuxiliares): Observable<ExamenesAuxiliares> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
