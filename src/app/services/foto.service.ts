import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  urlradiografia = this.global.urlgeneral + '/radiografia';
  URLfoto = this.global.urlgeneral + '/foto';
  urlrpdf = this.global.urlgeneral + '/pdf';

  constructor(
    private http: HttpClient,
    private global: GlobalService
    ) { }

  uploadfoto(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.URLfoto}`, formData);
  }
  uploadradiografia(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlradiografia}`, formData);
  }
  uploadpdf(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlrpdf}`, formData);
  }

  uploadradiografiabase(data: FormData) {
    return this.http.post(
      `${this.urlradiografia}/depurado`,
      data
    )
  }
}
