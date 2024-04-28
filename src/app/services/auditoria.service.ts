import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Auditoria } from '../models/auditoria';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  apiUrl = this.global.apiUrlGlobal + '/auditoria';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getauditorias() {
    return this.http.get(`${this.apiUrl}`);
  }

  getauditoriabyuser(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/usuario/${parametro}`);
  }

  getauditoriabycodigo(parametro: string | number) {
    return this.http.get(`${this.apiUrl}/search/codigo/${parametro}`);
  }

  getauditoria(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveauditoria(auditoria: Auditoria) {
    return this.http.post(`${this.apiUrl}/create`, auditoria);
  }

  deleteauditoria(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateUsuario(id: string | number, updatedAuditoria: Auditoria): Observable<Auditoria> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedAuditoria);
  }
}
