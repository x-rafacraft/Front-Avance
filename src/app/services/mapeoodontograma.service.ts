import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { MapeoOdontograma } from '../models/odontograma';

@Injectable({
  providedIn: 'root'
})
export class MapeoodontogramaService {
  apiUrl = this.global.apiUrlGlobal + '/mapeoodontograma';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getmapeoodontogramas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getmapeoodontograma(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savemapeoodontograma(mapeoodontograma: MapeoOdontograma) {
    return this.http.post(`${this.apiUrl}/create`, mapeoodontograma);
  }

  deletemapeoodontograma(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatemapeoodontograma(id: string | number, updated: MapeoOdontograma): Observable<MapeoOdontograma> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
