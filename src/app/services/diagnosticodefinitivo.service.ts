import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiagnosticoDefinitivo } from '../models/historiaclinica';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoDefinitivoService {
  apiUrl = this.global.apiUrlGlobal + '/diagnosticodefinitivo';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getdiagnosticodefinitivos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getdiagnosticodefinitivosbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getdiagnosticodefinitivo(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savediagnosticodefinitivo(diagnosticodefinitivo: DiagnosticoDefinitivo) {
    return this.http.post(`${this.apiUrl}/create`, diagnosticodefinitivo);
  }

  deletediagnosticodefinitivo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatediagnosticodefinitivo(id: string | number, updated: DiagnosticoDefinitivo): Observable<DiagnosticoDefinitivo> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
