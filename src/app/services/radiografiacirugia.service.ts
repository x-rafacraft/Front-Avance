import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RadiografiaCirugia } from '../models/cirugia';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RadiografiaCirugiaService {
  apiUrl = this.global.apiUrlGlobal + '/radiografiacirugia';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrradiografiacirugias() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrradiografiacirugiasbycirugia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/cirugia/${codigo}`);
  }

  getrradiografiacirugia(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverradiografiacirugia(rradiografiacirugia: RadiografiaCirugia) {
    return this.http.post(`${this.apiUrl}/create`, rradiografiacirugia);
  }

  deleterradiografiacirugia(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterradiografiacirugia(id: string | number, updated: RadiografiaCirugia): Observable<RadiografiaCirugia> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
