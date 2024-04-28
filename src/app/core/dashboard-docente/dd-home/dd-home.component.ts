import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';
import { AuditoriaService } from '../../../services/auditoria.service';
import { ClaseService } from '../../../services/clase.service';
import { EmpresaService } from '../../../services/empresa.service';
import { IntegranteService } from '../../../services/integrante.service';
import { PacienteService } from '../../../services/paciente.service';
import { PeriodoService } from '../../../services/periodo.service';
import { SedeService } from '../../../services/sede.service';

@Component({
  selector: 'app-dd-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-home.component.html',
  styleUrl: './dd-home.component.css'
})
export default class DdHomeComponent implements OnInit {
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
  pacientes: any = [];
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
    private pacienteService: PacienteService,
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
  verestudiantes(codigo: any) {
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
  verpacientes(codigo: any) {
    console.log(codigo);
    this.pacienteService.getpacientebyuser(codigo).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.pacientes = ladata.data;
          console.log(this.pacientes);
          this.toastr.info('Los pacientes del Estudiante');
        } else {
          console.log(ladata);
          this.toastr.warning('El estdudiante no tiene pacientes');
        }
      }, err => {
        console.log(err);
        this.toastr.error('Error al obtener los pacientes del estudiante');
      }
    );
  }
  verhistoria(codigo: any) {
    this.pacienteService.loggoutpaciente();
    this.pacienteService.logginpaciente(codigo);
    const tokenpacienterepuesto: any = localStorage.getItem('elpaciente');
    console.log(tokenpacienterepuesto);
    this.router.navigate(
      [
        'dashboard-docente',
        'historia-clinica',
        'anamnesis'
      ]
    );
  }
  ngOnInit(): void {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    this.theuser = client;
    const parametro: any = this.theuser.SedeId;
    console.log(parametro);
    this.periodoService.getperiodobysede(parametro).subscribe(
      res => {
        this.periodos = res;
        console.log(this.periodos);
      }, err => {
        this.toastr.error('Error al obtener peridos de la sede');
      }
    );
  }
  // // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'dashboard-docente',
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
        'dashboard-docente',
        'integrante',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}

