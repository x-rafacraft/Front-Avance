import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  clientpaciente = new BehaviorSubject<any>(0);
  clientpaciente$ = this.clientpaciente.asObservable();
  apiUrl = this.global.apiUrlGlobal + '/paciente';
  lasrutas: any = [
    { Nombre: 'Anamnesis', Ruta: 'anamnesis' },
    { Nombre: 'Examen Clínico General', Ruta: 'examen-general' },
    { Nombre: 'Examen Clínico Estomatológico', Ruta: 'examen-estomatologico' },
    { Nombre: 'Resumen Anamnesis', Ruta: 'resumen-anamnesis' },
    { Nombre: 'Diagnóstico Presuntivo - CIE 11', Ruta: 'diagnostico-presuntivo' },
    { Nombre: 'Exámenes Auxiliares', Ruta: 'examenes-auxiliares' },
    { Nombre: 'Diagnóstico Definitivo - CIE 11', Ruta: 'diagnostico-definitivo' },
    { Nombre: 'Plan y Cronograma de Tratamiento', Ruta: 'plan-y-cronograma-de-tratamiento' },
    { Nombre: 'Notas Evolutivas - Epicrisis', Ruta: 'notas-evolutivas' },
    { Nombre: 'Interpretación Exámenes Auxiliares', Ruta: 'interpretacion' }
  ];
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
  logginpaciente(clientpaciente: any) {
    const clipaciente = JSON.stringify(clientpaciente);
    this.clientpaciente.next(clientpaciente);
    localStorage.setItem('elpaciente', clipaciente);
  }
  loggoutpaciente() {
    this.clientpaciente.next(0);
    localStorage.removeItem('elpaciente');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('elpaciente')) {
      console.log('hay paciente');
      return true;
    } else {
      console.log('¿no hay paciente');
      return false;
    }
  }

  getpacientes() {
    return this.http.get(`${this.apiUrl}`);
  }

  getpacientebyuser(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/usuario/${parametro}`);
  }

  getpacientebysede(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/sede/${parametro}`);
  }

  getpacientebyhistoria(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/historiaclinica/${parametro}`);
  }

  getpaciente(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savepaciente(paciente: Paciente) {
    return this.http.post(`${this.apiUrl}/create`, paciente);
  }

  deletepaciente(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatepaciente(id: string | number, updated: Paciente): Observable<Paciente> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
