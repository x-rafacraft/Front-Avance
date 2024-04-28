import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { ObturaciondeConductos } from '../models/endodoncia';

@Injectable({
  providedIn: 'root'
})
export class ObturaciondeConductosService {
  apiUrl = this.global.apiUrlGlobal + '/obturaciondeconductos';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrobturaciondeconductoss() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrobturaciondeconductossbyendodoncia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/endodoncia/${codigo}`);
  }

  getrobturaciondeconductos(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverobturaciondeconductos(obturaciondeconductos: ObturaciondeConductos) {
    return this.http.post(`${this.apiUrl}/create`, obturaciondeconductos);
  }

  deleterobturaciondeconductos(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterobturaciondeconductos(id: string | number, updated: ObturaciondeConductos): Observable<ObturaciondeConductos> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
