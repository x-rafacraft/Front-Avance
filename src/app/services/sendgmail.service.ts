import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { RecordatorioWhatsapp } from '../models/recordatorio';

@Injectable({
  providedIn: 'root'
})
export class SendgmailService {
  apiUrl = this.global.apiUrlGlobal_servicio + '/email';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getsendgmailcode(
    correo: string,
    codigo: string,
    empresa: string,
    sistema: string,
    url: string) {
    return this.http.get(
      `${this.apiUrl}/otherproyects/sendcode/${correo}/${codigo}/${empresa}/${sistema}/${url}`
    );
  }

  getsendgmailcreatepass(
    correo: string,
    empresa: string,
    sistema: string,
    url: string) {
    return this.http.get(
      `${this.apiUrl}/otherproyects/createpass/${correo}/${empresa}/${sistema}/${url}`
    );
  }

  sendrecordatorio(recordatorio: RecordatorioWhatsapp) {
    return this.http.post(`${this.apiUrl}/otherproyects/recordatorio`, recordatorio);
  }
}
