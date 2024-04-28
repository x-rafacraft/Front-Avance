import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { CasoClinico } from '../models/odontograma';

@Injectable({
  providedIn: 'root'
})
export class CasoclinicoService {
  apiUrl = this.global.apiUrlGlobal + '/casoclinico';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getcasoclinicos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getcasoclinico(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savecasoclinico(casoclinico: CasoClinico) {
    return this.http.post(`${this.apiUrl}/create`, casoclinico);
  }

  deletecasoclinico(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatecasoclinico(id: string | number, updated: CasoClinico): Observable<CasoClinico> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
