import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { ManifestacionEndodoncia } from '../models/endodoncia';

@Injectable({
  providedIn: 'root'
})
export class ManifestacionEndodonciaService {
  apiUrl = this.global.apiUrlGlobal + '/manifestacionendodoncia';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getrmanifestacionendodoncias() {
    return this.http.get(`${this.apiUrl}`);
  }

  getrmanifestacionendodonciasbyendodoncia(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/search/endodoncia/${codigo}`);
  }

  getrmanifestacionendodoncia(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savermanifestacionendodoncia(manifestacionendodoncia: ManifestacionEndodoncia) {
    return this.http.post(`${this.apiUrl}/create`, manifestacionendodoncia);
  }

  deletermanifestacionendodoncia(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatermanifestacionendodoncia(id: string | number, updated: ManifestacionEndodoncia): Observable<ManifestacionEndodoncia> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
