import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { PreparacionQuimicoMecanica } from '../models/endodoncia';

@Injectable({
  providedIn: 'root'
})
export class PreparacionQuimicoMecanicaService {
  apiUrl = this.global.apiUrlGlobal + '/preparacionquimicomecanica';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrpreparacionquimicomecanicas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrpreparacionquimicomecanicasbyendodoncia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/endodoncia/${codigo}`);
  }

  getrpreparacionquimicomecanica(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverpreparacionquimicomecanica(preparacionquimicomecanica: PreparacionQuimicoMecanica) {
    return this.http.post(`${this.apiUrl}/create`, preparacionquimicomecanica);
  }

  deleterpreparacionquimicomecanica(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterpreparacionquimicomecanica(id: string | number, updated: PreparacionQuimicoMecanica): Observable<PreparacionQuimicoMecanica> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
