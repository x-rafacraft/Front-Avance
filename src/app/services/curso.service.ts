import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  apiUrl = this.global.apiUrlGlobal + '/cursos';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getcursos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getcurso(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savecurso(curso: Curso) {
    return this.http.post(`${this.apiUrl}/create`, curso);
  }

  deletecurso(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatecurso(id: string | number, updated: Curso): Observable<Curso> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
