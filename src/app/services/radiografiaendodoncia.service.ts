import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { RadiografiaEndodoncia } from '../models/endodoncia';

@Injectable({
  providedIn: 'root'
})
export class RadiografiaEndodonciaService {
  apiUrl = this.global.apiUrlGlobal + '/radiografiaendodoncia';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrradiografiaendodoncias() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrradiografiaendodonciasbyendodoncia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/endodoncia/${codigo}`);
  }

  getrradiografiaendodoncia(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverradiografiaendodoncia(radiografiaendodoncia: RadiografiaEndodoncia) {
    return this.http.post(`${this.apiUrl}/create`, radiografiaendodoncia);
  }

  deleterradiografiaendodoncia(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterradiografiaendodoncia(id: string | number, updated: RadiografiaEndodoncia): Observable<RadiografiaEndodoncia> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
