import { Injectable } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { SedeService } from './sede.service';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class RecursivoService {
  empresa: Empresa = {
    id: 0,
    Ruc: '',
    RazonSocial: '',
    Representante: ''
  }
  lassedes: any = [];
  constructor(
    private empresaService: EmpresaService,
    private sedeService: SedeService,
  ) { }
  getdatalocalstorage() {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    return client;
  }
  getempresas() {
    this.empresaService.getempresa(1).subscribe(
      res => {
        const ladata: any = res;
        this.empresa = ladata.data;
        return this.empresa;
      }, err => {
        return this.empresa;
      }
    );
  }
  getsedesbyempresa() {
    this.sedeService.getsedesbyempresa(1).subscribe(
      res => {
        console.log(res);
        const ladata: any = res;
        this.lassedes = ladata.data;
        return this.lassedes;
      }, err => {
        return [];
      }
    );
  }

}
