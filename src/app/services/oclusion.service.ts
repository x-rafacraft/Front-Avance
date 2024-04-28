import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Oclusion } from '../models/examenestomatologico';

@Injectable({
  providedIn: 'root'
})
export class OclusionService {
  apiUrl = this.global.apiUrlGlobal + '/oclusion';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getoclusions() {
    return this.http.get(`${this.apiUrl}`);
  }

  getoclusionsbyexamenextomatologico(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/examenestomatologico/${codigo}`);
  }

  getoclusion(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveoclusion(oclusion: Oclusion) {
    return this.http.post(`${this.apiUrl}/create`, oclusion);
  }

  deleteoclusion(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateoclusion(id: string | number, updated: Oclusion): Observable<Oclusion> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
