import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Diagnostico } from '../models/diagnostico';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  apiUrl = this.global.apiUrlGlobal + '/diagnostico';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getdiagnosticos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getdiagnosticobytipo(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/tipo/${parametro}`);
  }

  getdiagnostico(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savediagnostico(diagnostico: Diagnostico) {
    return this.http.post(`${this.apiUrl}/create`, diagnostico);
  }

  deletediagnostico(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatediagnostico(id: string | number, updated: Diagnostico): Observable<Diagnostico> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
