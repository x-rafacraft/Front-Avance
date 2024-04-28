import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { EstadoPostquirurgico } from '../models/cirugia';

@Injectable({
  providedIn: 'root'
})
export class EstadoPosQuirurgicoService {
  apiUrl = this.global.apiUrlGlobal + '/estadoposquirurgico';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrestadoposquirurgicos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrestadoposquirurgicosbycirugia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/cirugia/${codigo}`);
  }

  getrestadoposquirurgico(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverestadoposquirurgico(estadoposquirurgico: EstadoPostquirurgico) {
    return this.http.post(`${this.apiUrl}/create`, estadoposquirurgico);
  }

  deleterestadoposquirurgico(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterestadoposquirurgico(id: string | number, updated: EstadoPostquirurgico): Observable<EstadoPostquirurgico> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
