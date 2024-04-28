import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { ExamenIntraBucal } from '../models/examenestomatologico';

@Injectable({
  providedIn: 'root'
})
export class ExamenIntrabucalService {
  apiUrl = this.global.apiUrlGlobal + '/examenintrabucal';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getexamenintrabucals() {
    return this.http.get(`${this.apiUrl}`);
  }

  getexamenintrabucalsbyexamenextomatologico(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/examenestomatologico/${codigo}`);
  }

  getexamenintrabucal(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveexamenintrabucal(examenintrabucal: ExamenIntraBucal) {
    return this.http.post(`${this.apiUrl}/create`, examenintrabucal);
  }

  deleteexamenintrabucal(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateexamenintrabucal(id: string | number, updated: ExamenIntraBucal): Observable<ExamenIntraBucal> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
