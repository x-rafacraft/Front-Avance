import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiagnosticoPresuntivo } from '../models/historiaclinica';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticopresuntivoService {
  apiUrl = this.global.apiUrlGlobal + '/diagnosticopresuntivo';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getdiagnosticopresuntivos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getdiagnosticopresuntivosbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getdiagnosticopresuntivo(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savediagnosticopresuntivo(diagnosticopresuntivo: DiagnosticoPresuntivo) {
    return this.http.post(`${this.apiUrl}/create`, diagnosticopresuntivo);
  }

  deletediagnosticopresuntivo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatediagnosticopresuntivo(id: string | number, updated: DiagnosticoPresuntivo): Observable<DiagnosticoPresuntivo> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
