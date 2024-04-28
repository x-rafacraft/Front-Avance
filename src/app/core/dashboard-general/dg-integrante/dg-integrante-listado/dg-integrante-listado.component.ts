import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../../models/usuario';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { ClaseService } from '../../../../services/clase.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { IntegranteService } from '../../../../services/integrante.service';
import { PeriodoService } from '../../../../services/periodo.service';
import { SedeService } from '../../../../services/sede.service';

@Component({
  selector: 'app-dg-integrante-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-integrante-listado.component.html',
  styleUrl: './dg-integrante-listado.component.css'
})
export default class DgIntegranteListadoComponent implements OnInit {
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
  integrantes: any = [];
  clases: any = [];
  empresas: any = [];
  sedes: any = [];
  periodos: any = [];
  bandera = false;
  empresaelegida = 0;
  sedeelegida = 0;
  periodoelgido = 0;
  cursoelegido = 0;
  docenteelegido = 0;
  // theuser: Usuario = {
  //   Nombre: '',
  //   Apellido: '',
  //   Celular: '',
  //   Correo: '',
  //   NumDoc: '',
  //   Contra: '',
  //   Foto: '',
  //   Codigo: '',
  //   Activo: false,
  //   Genero: '',
  //   TipoDocumento: '',
  //   RestablecerContra: '',
  //   Rol: '',
  //   SedeId: 0
  // };
  // clases: any = [];
  // empresas: any = [];
  // sedes: any = [];
  // periodos: any = [];
  // bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private claseService: ClaseService,
    private periodoService: PeriodoService,
    private empresaService: EmpresaService,
    private auditoriaService: AuditoriaService,
    private integranteService: IntegranteService,
  ) {  }
  getempresas() {
    this.empresaService.getempresas().subscribe(
      res => {
        this.empresas = res;
      }, err => {
        this.toastr.error('No se pueden traer las empresas');
      }
    );
  }
  onempresaSelected(event: any) {
    const value = event.target.value;
    this.sedeService.getsedesbyempresa(value).subscribe(
      res => {
        this.toastr.info('Empresa Elegida');
        this.sedes = res;
      }, err => {
        this.toastr.error('Error al obtener las sedes de la empresa elegida');
      }
    );
  }
  onsedeSelected(event: any) {
    const value = event.target.value;
    this.toastr.info('Sede Elegida');
    this.periodoService.getperiodobysede(value).subscribe(
      res => {
        this.periodos = res;
      }, err => {
        this.toastr.error('Error al obtener peridos de la sede');
      }
    );
  }
  onperiodoSelected(event: any) {
    const value = event.target.value;
    this.claseService.getclasebyperiodo(value).subscribe(
      res => {
        this.clases = res;
      }, err => {
        this.toastr.error('Error al obtener peridos de la sede');
      }
    );
    this.toastr.info('Periodo Elegido');
  }
  ver(codigo: any) {
    this.integranteService.getintegrantebyclase(codigo).subscribe(
      res => {
        console.log(res);
        this.integrantes = res;
      }, err => {
        console.log(err);
        this.toastr.error('Error al obtener los integrantes por clase');
      }
    );

  }
  ngOnInit(): void {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    this.theuser = client;
    const mirol = this.theuser.Rol;
    if (mirol === 'god') {
      this.getempresas();
      this.bandera = true;
    } else if (mirol === 'administrador') {
      const parametro: any = this.theuser.SedeId;
      // los periodos de la sede
      this.periodoService.getperiodobysede(parametro).subscribe(
        res => {
          this.periodos = res;
        }, err => {
          this.toastr.error('Error al obtener peridos de la sede');
        }
      );
    }
  }
  // // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'integrante',
        'creacion'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar clase');
    this.router.navigate(
      [
        'dashboard-principal',
        'integrante',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
