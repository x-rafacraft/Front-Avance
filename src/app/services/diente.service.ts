import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Diente } from '../models/odontograma';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DienteService {
  apiUrl = this.global.apiUrlGlobal + '/diente';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getdientes() {
    return this.http.get(`${this.apiUrl}`);
  }

  getdiente(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savediente(diente: Diente) {
    return this.http.post(`${this.apiUrl}/create`, diente);
  }

  deletediente(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatediente(id: string | number, updated: Diente): Observable<Diente> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
