import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operatorio } from '../models/operatorio';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class OperarioService {
  apiUrl = this.global.apiUrlGlobal + '/operatorio';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getroperatorios() {
    return this.http.get(`${this.apiUrl}`);
  }

  getroperatoriosbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getroperatorio(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveroperatorio(roperatorio: Operatorio) {
    return this.http.post(`${this.apiUrl}/create`, roperatorio);
  }

  deleteroperatorio(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateroperatorio(id: string | number, updated: Operatorio): Observable<Operatorio> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
