import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  apiUrl = this.global.apiUrlGlobal + '/empresas';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getempresas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getempresa(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveempresa(empresa: Empresa) {
    return this.http.post(`${this.apiUrl}/create`, empresa);
  }

  deleteempresa(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateempresa(id: string | number, updated: Empresa): Observable<Empresa> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
