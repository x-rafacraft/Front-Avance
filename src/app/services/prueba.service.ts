import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Prueba } from '../models/operatorio';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
  apiUrl = this.global.apiUrlGlobal + '/pruebas';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getpruebas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getprueba(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveprueba(prueba: Prueba) {
    return this.http.post(`${this.apiUrl}/create`, prueba);
  }

  deleteprueba(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateprueba(id: string | number, updated: Prueba): Observable<Prueba> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
