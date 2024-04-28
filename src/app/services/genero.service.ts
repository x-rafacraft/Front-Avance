import { Observable } from 'rxjs';
import { Genero } from '../models/genero';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  apiUrl = this.global.apiUrlGlobal + '/genero';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getgeneros() {
    return this.http.get(`${this.apiUrl}`);
  }

  getgenero(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savegenero(genero: Genero) {
    return this.http.post(`${this.apiUrl}/create`, genero);
  }

  deletegenero(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updategenero(id: string | number, updated: Genero): Observable<Genero> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
