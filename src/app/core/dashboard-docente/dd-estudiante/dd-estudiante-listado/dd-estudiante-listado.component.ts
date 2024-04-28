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
  selector: 'app-dd-estudiante-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-estudiante-listado.component.html',
  styleUrl: './dd-estudiante-listado.component.css'
})
export default class DdEstudianteListadoComponent implements OnInit {
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
    console.log(this.theuser);
    const parametro: any = this.theuser.SedeId;
    console.log(parametro);
    this.periodoService.getperiodobysede(parametro).subscribe(
      res => {
        console.log(res);
        this.periodos = res;
      }, err => {
        console.log(err);
        this.toastr.error('Error al obtener peridos de la sede');
      }
    );
  }
  // // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'dashboard-docente',
        'estudiante',
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
        'dashboard-docente',
        'estudiante',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
