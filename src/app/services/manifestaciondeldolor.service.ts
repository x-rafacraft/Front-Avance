import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { ManifestaciondelDolor } from '../models/endodoncia';

@Injectable({
  providedIn: 'root'
})
export class ManifestaciondelDolorService {
  apiUrl = this.global.apiUrlGlobal + '/manifestaciondeldolor';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getmanifestaciondeldolors() {
    return this.http.get(`${this.apiUrl}`);
  }

  getmanifestaciondeldolor(id: string | number) {
    return this.http.get(`${this.apiUrl}/search/id/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savemanifestaciondeldolor(manifestaciondeldolor: ManifestaciondelDolor) {
    return this.http.post(`${this.apiUrl}/create`, manifestaciondeldolor);
  }

  deletemanifestaciondeldolor(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatemanifestaciondeldolor(id: string | number, updated: ManifestaciondelDolor): Observable<ManifestaciondelDolor> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updated);
  }
}
