import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { PlandeTrabajo } from '../models/operatorio';

@Injectable({
  providedIn: 'root'
})
export class PlandeTrabajoService {
  apiUrl = this.global.apiUrlGlobal + '/plandetrabajo';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrplandetrabajos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrplandetrabajosbyoperaria(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/operatorio/${codigo}`);
  }

  getrplandetrabajo(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverplandetrabajo(plandetrabajo: PlandeTrabajo) {
    return this.http.post(`${this.apiUrl}/create`, plandetrabajo);
  }

  deleterplandetrabajo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterplandetrabajo(id: string | number, updated: PlandeTrabajo): Observable<PlandeTrabajo> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
