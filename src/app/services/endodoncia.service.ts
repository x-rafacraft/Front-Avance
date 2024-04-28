import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Endodoncia } from '../models/endodoncia';

@Injectable({
  providedIn: 'root'
})
export class EndodonciaService {
  apiUrl = this.global.apiUrlGlobal + '/endodoncia';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrendodoncias() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrendodonciasbypaciente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/paciente/${codigo}`);
  }

  getrendodoncia(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saverendodoncia(rendodoncia: Endodoncia) {
    return this.http.post(`${this.apiUrl}/create`, rendodoncia);
  }

  deleterendodoncia(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updaterendodoncia(id: string | number, updated: Endodoncia): Observable<Endodoncia> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
