import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Dolor } from '../models/examenestomatologico';

@Injectable({
  providedIn: 'root'
})
export class DolorService {
  apiUrl = this.global.apiUrlGlobal + '/dolor';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getdolors() {
    return this.http.get(`${this.apiUrl}`);
  }

  getdolorsbyexamenextomatologico(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/examenestomatologico/${codigo}`);
  }

  getdolor(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savedolor(dolor: Dolor) {
    return this.http.post(`${this.apiUrl}/create`, dolor);
  }

  deletedolor(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatedolor(id: string | number, updated: Dolor): Observable<Dolor> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
