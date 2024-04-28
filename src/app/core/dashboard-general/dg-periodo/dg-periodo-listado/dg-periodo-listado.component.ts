import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { SedeService } from '../../../../services/sede.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { PeriodoService } from '../../../../services/periodo.service';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { RecursivoService } from '../../../../services/recursivo.service';
@Component({
  selector: 'app-dg-periodo-listado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-periodo-listado.component.html',
  styleUrl: './dg-periodo-listado.component.css'
})
export default class DgPeriodoListadoComponent implements OnInit {
  theuser: Usuario = {
    Nombre: '',
    Apellido: '',
    Celular: '',
    Correo: '',
    NumDoc: '',
    Contra: '',
    Foto: '',
    Codigo: '',
    Activo: false,
    Genero: '',
    TipoDocumento: '',
    RestablecerContra: '',
    Rol: '',
    SedeId: 0
  };
  periodos: any = [];
  empresas: any = [];
  sedes: any = [];
  sedeelegida = 0;
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private empresaService: EmpresaService,
    private periodoService: PeriodoService,
    private getdataService: RecursivoService,
    private auditoriaService: AuditoriaService,
  ) {  }
  onsedeSelected(event: any) {
    const value = event.target.value;
    this.sedeelegida = value;
    this.periodoService.getperiodobysede(value).subscribe(
      res => {
        const ladata: any = res;
        this.periodos = ladata.data;
        this.toastr.info('Los Periodos de la Sede Elegida');
      }, err => {
        this.toastr.error('Error al obtener las sedes de la empresa elegida');
      }
    );
  }
  getdata() {
    this.sedeService.getsedesbyempresa(1).subscribe(
      res => {
        const ladata: any = res;
        this.sedes = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener las sedes de la empresa');
      }
    );
  }
  ngOnInit(): void {
    this.getdata();
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
  }
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'periodo',
        'creacion'
      ]
    );
  }
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar periodo');
    this.router.navigate(
      [
        'dashboard-principal',
        'periodo',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
