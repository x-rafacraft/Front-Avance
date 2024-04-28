import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamenGeneral } from '../models/historiaclinica';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ExamengeneralService {
  apiUrl = this.global.apiUrlGlobal + '/examengeneral';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getexamengenerals() {
    return this.http.get(`${this.apiUrl}`);
  }

  getexamengeneralsbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getexamengeneral(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveexamengeneral(examengeneral: ExamenGeneral) {
    return this.http.post(`${this.apiUrl}/create`, examengeneral);
  }

  deleteexamengeneral(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateexamengeneral(id: string | number, updated: ExamenGeneral): Observable<ExamenGeneral> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
