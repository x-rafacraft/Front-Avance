import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { ResumenAnamnesis } from '../models/historiaclinica';

@Injectable({
  providedIn: 'root'
})
export class ResumenAnamnesisService {
  apiUrl = this.global.apiUrlGlobal + '/anamnesis';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getresumenanamnesiss() {
    return this.http.get(`${this.apiUrl}`);
  }

  getresumenanamnesissbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getresumenanamnesis(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveresumenanamnesis(resumenanamnesis: ResumenAnamnesis) {
    return this.http.post(`${this.apiUrl}/create`, resumenanamnesis);
  }

  deleteresumenanamnesis(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateresumenanamnesis(id: string | number, updated: ResumenAnamnesis): Observable<ResumenAnamnesis> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
