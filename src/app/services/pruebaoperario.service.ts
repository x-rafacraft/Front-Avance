import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { PruebaOperaria } from '../models/operatorio';

@Injectable({
  providedIn: 'root'
})
export class PruebaOperariaService {
  apiUrl = this.global.apiUrlGlobal + '/pruebaoperaria';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrpruebaoperarias() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrpruebaoperariasbyoperaria(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/operatorio/${codigo}`);
  }

  getrpruebaoperaria(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverpruebaoperaria(pruebaoperaria: PruebaOperaria) {
    return this.http.post(`${this.apiUrl}/create`, pruebaoperaria);
  }

  deleterpruebaoperaria(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterpruebaoperaria(id: string | number, updated: PruebaOperaria): Observable<PruebaOperaria> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
