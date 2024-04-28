import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { InformeQuirurgico } from '../models/cirugia';

@Injectable({
  providedIn: 'root'
})
export class InformeQuirurgicoService {
  apiUrl = this.global.apiUrlGlobal + '/informequirurgico';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrinformequirurgicos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrinformequirurgicosbycirugia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/cirugia/${codigo}`);
  }

  getrinformequirurgico(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverinformequirurgico(informequirurgico: InformeQuirurgico) {
    return this.http.post(`${this.apiUrl}/create`, informequirurgico);
  }

  deleterinformequirurgico(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterinformequirurgico(id: string | number, updated: InformeQuirurgico): Observable<InformeQuirurgico> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
