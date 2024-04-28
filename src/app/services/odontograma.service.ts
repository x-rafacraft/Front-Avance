import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Odontograma } from '../models/odontograma';

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {
  apiUrl = this.global.apiUrlGlobal + '/odontograma';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getodontogramas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getodontograma(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveodontograma(odontograma: Odontograma) {
    return this.http.post(`${this.apiUrl}/create`, odontograma);
  }

  deleteodontograma(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateodontograma(id: string | number, updated: Odontograma): Observable<Odontograma> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
