import { Observable } from 'rxjs';
import { Cita } from '../models/cita';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  apiUrl = this.global.apiUrlGlobal + '/cita';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getcitas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getcitabysede(sede: string | number) {
    return this.http.get(`${this.apiUrl}/search/sede/${sede}`);
  }

  getcitabyuser(usuario: string | number) {
    return this.http.get(`${this.apiUrl}/search/usuario/${usuario}`);
  }

  getcitabypaciente(paciente: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${paciente}`);
  }

  getcitabyfechasandsede(fecha: Date, sede: string | number) {
    return this.http.get(`${this.apiUrl}/search/fecha/${fecha}/${sede}`);
  }

  getcita(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savecita(cita: Cita) {
    return this.http.post(`${this.apiUrl}/create`, cita);
  }

  deletecita(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatecita(id: string | number, updated: Cita): Observable<Cita> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
