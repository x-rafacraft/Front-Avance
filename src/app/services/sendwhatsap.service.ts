import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { RecordatorioCorreo } from '../models/recordatorio';

@Injectable({
  providedIn: 'root'
})
export class SendwhatsappService {
  apiUrl = this.global.apiUrlGlobal_servicio + '/ultramsg';
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  getsendwhatsappcode(
    celular: string,
    codigo: string,
    empresa: string,
    sistema: string,
    url: string) {
    return this.http.get(
      `${this.apiUrl}/otherproyects/sendcode/${celular}/${codigo}/${empresa}/${sistema}/${url}`
    );
  }

  getsendwhatsappcreatepass(
    celular: string,
    empresa: string,
    sistema: string,
    url: string) {
    return this.http.get(
      `${this.apiUrl}/otherproyects/createpass/${celular}/${empresa}/${sistema}/${url}`
    );
  }
  sendrecordatorio(recordatorio: RecordatorioCorreo) {
    return this.http.post(`${this.apiUrl}/otherproyects/recordatorio`, recordatorio);
  }
}
