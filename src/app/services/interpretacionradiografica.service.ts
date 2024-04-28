import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { InterpretacionRadiografica } from '../models/cirugia';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class InterpretacionRadiograficaService {
  apiUrl = this.global.apiUrlGlobal + '/interpretacionradiografica';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrinterpretacionradiograficas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrinterpretacionradiograficasbycirugia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/cirugia/${codigo}`);
  }

  getrinterpretacionradiografica(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  // saverinterpretacionradiografica(rinterpretacionradiografica: InterpretacionRadiografica) {
  //   return this.http.post(`${this.apiUrl}/create`, rinterpretacionradiografica);
  // }

  deleterinterpretacionradiografica(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // updaterinterpretacionradiografica(id: string | number, updated: InterpretacionRadiografica): Observable<InterpretacionRadiografica> {
  //   return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  // }
}
