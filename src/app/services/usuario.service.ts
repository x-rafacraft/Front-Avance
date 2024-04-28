import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, UsuarioRecover } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  client = new BehaviorSubject<any>(null);
  client$ = this.client.asObservable();
  apiUrl = this.global.apiUrlGlobal + '/usuario';
  apiUrldominio = this.global.apiUrlGlobal + '/live';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  loggin(client: any) {
    const cli = JSON.stringify(client);
    this.client.next(client);
    localStorage.setItem('elusuario', cli);
  }
  loggout() {
    this.client.next(null);
    localStorage.removeItem('elusuario');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('elusuario')) {
      console.log('hay ususario');
      return true;
    } else {
      console.log('¿no hay usuario');
      return false;
    }
  }

  getusuarios() {
    return this.http.get(`${this.apiUrl}`);
  }

  getusuarioseliminados() {
    return this.http.get(`${this.apiUrl}/eliminados`);
  }

  getSearchDocentesbySede(sede: number | string) {
    return this.http.get(`${this.apiUrl}/search/docente/${sede}`);
  }

  getSearchEstudiantesbySede(sede: number | string) {
    return this.http.get(`${this.apiUrl}/search/estudiante/${sede}`);
  }

  getSearchEmail(correo: string) {
    console.log(correo);
    return this.http.get(`${this.apiUrl}/search/correo/${correo}`);
  }

  getSearchPhone(celular: string) {
    console.log(celular);
    return this.http.get(`${this.apiUrl}/search/celu/${celular}`);
  }

  getSearchDoc(documento: string) {
    console.log(documento);
    return this.http.get(`${this.apiUrl}/search/documento/${documento}`);
  }

  getSearchStudentByPhone(celular: string, sede: number) {
    console.log(celular);
    return this.http.get(`${this.apiUrl}/search/estudiante/celu/${celular}/${sede}`);
  }

  getSearchStudentByDoc(documento: string, sede: number) {
    console.log(documento);
    return this.http.get(`${this.apiUrl}/search/estudiante/documento/${documento}/${sede}`);
  }

  getSearchRole(rol: string) {
    return this.http.get(`${this.apiUrl}/search/rol/${rol}`);
  }

  getSearchSede(sede: string) {
    return this.http.get(`${this.apiUrl}/search/sede/${sede}`);
  }

  getSearchStatus(estado: string) {
    return this.http.get(`${this.apiUrl}/search/condicion/${estado}`);
  }

  getlogin(correo: string, contra: string) {
    return this.http.get(`${this.apiUrl}/loginemail/${correo}/${contra}`);
  }

  getloginbycelu(celular: string, contra: string) {
    return this.http.get(`${this.apiUrl}/logincelu/${celular}/${contra}`);
  }

  getrecover(id: string | number) {
    return this.http.get(`${this.apiUrldominio}/recover/${id}`);
  }

  getcofirecover(codigo: string, id: string | number) {
    return this.http.get(`${this.apiUrl}/recover/${codigo}/${id}`);
  }

  getusuario(id: string | number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getrestaurarusuario(id: string | number) {
    return this.http.get(`${this.apiUrl}/restaurar-usuario/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveusuario(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}/create`, usuario);
  }

  deleteusuario(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateusuario(id: string | number, updatedUsuario: Usuario): Observable<Usuario> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedUsuario);
  }

  updateusuariocontra(id: string | number, updatecontra: Usuario): Observable<Usuario> {
    return this.http.put(`${this.apiUrl}/recover-password/${id}`, updatecontra);
  }
}
