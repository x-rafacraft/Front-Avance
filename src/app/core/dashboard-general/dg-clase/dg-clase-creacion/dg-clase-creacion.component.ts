import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auditoria } from '../../../../models/auditoria';
import { Clase } from '../../../../models/clase';
import { Docente } from '../../../../models/docente';
import { Usuario } from '../../../../models/usuario';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { ClaseService } from '../../../../services/clase.service';
import { CursoService } from '../../../../services/curso.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { PeriodoService } from '../../../../services/periodo.service';
import { ProfesorService } from '../../../../services/profesor.service';
import { SedeService } from '../../../../services/sede.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dg-clase-creacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-clase-creacion.component.html',
  styleUrl: './dg-clase-creacion.component.css'
})
export default class DgClaseCreacionComponent implements OnInit {
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
  docente: Docente = {
    id: 0,
    NombreCompleto: '',
    Colegiatura: '',
    FirmaDigital: '',
    UsuarioId: 0
  }
  clase: Clase = {
    Nombre: '',
    Salon: '',
    Horario: '',
    idPeriodo: 0,
    idCurso: 0,
    idDocente: 0
  }
  clase1: Clase = {
    id: 0,
    Nombre: '',
    Salon: '',
    Horario: '',
    idPeriodo: 0,
    idCurso: 0,
    idDocente: 0
  }
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'creacion',
    Tabla: 'clase',
    Resumen: 'crear nueva clase',
    Detalle: '',
    Interaccion: new Date()
  }
  auditoria1: Auditoria = {
    id: 0,
    UsuarioId: 0,
    Registroid: 0,
    Accion: '',
    Tabla: '',
    Resumen: '',
    Detalle: '',
    Interaccion: new Date()
  }
  generos: any = [
    { Name: 'masculino' },
    { Name: 'femenino' },
  ];
  TipoDocumentoumentos: any = [
    { Name: 'dni' },
    { Name: 'pasaporte' },
    { Name: 'carnet extrangeria' }
  ];
  empresas: any = [];
  sedes: any = [];
  periodos: any = [];
  cursos: any = [];
  docentes: any = [];
  periodoelegido = 0;
  empresaelegida = 0;
  sedeelegida = 0;
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private cursoService: CursoService,
    private claseService: ClaseService,
    private empresaService: EmpresaService,
    private periodoService: PeriodoService,
    private usuarioService: UsuarioService,
    private profesorService: ProfesorService,
    private auditoriaService: AuditoriaService,
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
    this.usuarioService.getSearchDocentesbySede(value).subscribe(
      res => {
        this.docentes = res;
      }, err => {
        this.toastr.error('Error al obtener profesores de la sede');
      }
    );
  }
  onperiodoSelected(event: any) {
    const value = event.target.value;
    this.clase.idPeriodo = +value;
    this.toastr.info('Periodo Elegido');
  }
  oncursoSelected(event: any) {
    const value = event.target.value;
    this.clase.idCurso = +value;
    this.toastr.info('Curso Elegido');
  }
  onprofesorSelected(event: any) {
    const value = event.target.value;
    this.toastr.info('Profesor Elegido');
    this.profesorService.getprofesorbyuser(value).subscribe(
      res => {
        this.docente = res;
        this.clase.idDocente = this.docente.id;
      }, err => {
        this.toastr.error('Error al obtener profesor');
      }
    );
  }
  getcursos() {
    this.cursoService.getcursos().subscribe(
      res => {
        this.cursos = res;
      }, err => {
        this.toastr.error('No se pueden traer cursos');
      }
    );
  }
  ngOnInit(): void {
    this.getcursos();
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
      this.usuarioService.getSearchDocentesbySede(parametro).subscribe(
        res => {
          this.docentes = res;
        }, err => {
          this.toastr.error('Error al obtener profesores de la sede');
        }
      );
    }
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'clase'
      ]
    );
  }
  saveclase() {
    console.log(this.clase);
    this.claseService.saveclase(this.clase).subscribe(
      res => {
        this.clase1 = res;
        this.toastr.info('Se creo una nueva clase');
        this.volver();
        // this.auditoria.Interaccion = new Date();
        // this.auditoria.Registroid = this.clase1.id;
        // this.auditoria.UsuarioId = 1;
        // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
        //   ress => {
        //     this.auditoria1 = ress;
        //     this.toastr.info('Accion registrada');

        //   }, err => {
        //     this.toastr.error('Error al registrar accion');
        //   }
        // );
      }, err => {
        this.toastr.error('Error al crear clase');
      }
    );
  }
}
