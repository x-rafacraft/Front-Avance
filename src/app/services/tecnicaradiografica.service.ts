import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { TecnicaRadiografica } from '../models/operatorio';

@Injectable({
  providedIn: 'root'
})
export class TecnicaRadiograficaService {
  apiUrl = this.global.apiUrlGlobal + '/tecnicaradiografica';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrtecnicaradiograficas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrtecnicaradiograficasbyoperaria(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/operatorio/${codigo}`);
  }

  getrtecnicaradiografica(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savertecnicaradiografica(tecnicaradiografica: TecnicaRadiografica) {
    return this.http.post(`${this.apiUrl}/create`, tecnicaradiografica);
  }

  deletertecnicaradiografica(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatertecnicaradiografica(id: string | number, updated: TecnicaRadiografica): Observable<TecnicaRadiografica> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
