import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { SedeService } from '../../../../services/sede.service';
import { ClaseService } from '../../../../services/clase.service';
import { CursoService } from '../../../../services/curso.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { PeriodoService } from '../../../../services/periodo.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dg-clase-listado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-clase-listado.component.html',
  styleUrl: './dg-clase-listado.component.css'
})
export default class DgClaseListadoComponent implements OnInit {
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
  clases: any = [];
  empresas: any = [];
  sedes: any = [];
  periodos: any = [];
  docentes: any = [];
  cursos: any = [];
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
    private cursoService: CursoService,
    private claseService: ClaseService,
    private periodoService: PeriodoService,
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService,
    private auditoriaService: AuditoriaService,
  ) {  }
  getdata() {
    this.sedeService.getsedesbyempresa(1).subscribe(
      res => {
        const ladata: any = res;
        this.sedes = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener las sedes de la empresa');
      }
    );
    this.cursoService.getcursos().subscribe(
      res => {
        const ladata: any = res;
        this.cursos = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener cursos');
      }
    );
  }
  onsedeSelected(event: any) {
    const value = event.target.value;
    this.toastr.info('Sede Elegida');
    this.periodoService.getperiodobysede(value).subscribe(
      res => {
        const ladata: any = res;
        this.periodos = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener peridos de la sede');
      }
    );
    this.usuarioService.getSearchDocentesbySede(value).subscribe(
      res => {
        const ladata: any = res;
        this.docentes = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener docentes de la sede');
      }
    );
  }
  onperiodoSelected(event: any) {
    const value = event.target.value;
    this.periodoelgido = value;
    this.toastr.info('Periodo Elegido');
    this.claseService.getclasebyperiodo(value).subscribe(
      res => {
        const ladata: any = res;
        this.clases = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener clases del periodo elegido');
      }
    );
  }
  onprofesorSelected(event: any) {
    const value = event.target.value;
    this.docenteelegido = value;
    this.claseService.getclasebydocenteyperiodo(this.docenteelegido, this.periodoelgido).subscribe(
      res => {
        const ladata: any = res;
        this.clases = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener clases del periodo y docente elegido');
      }
    );
    this.toastr.info('Periodo Elegido');
  }
  oncursoSelected(event: any) {
    const value = event.target.value;
    this.cursoelegido = value;
    this.claseService.getclasebydocenteperiodocurso(this.docenteelegido, this.periodoelgido, this.cursoelegido).subscribe(
      res => {
        const ladata: any = res;
        this.clases = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener clases del periodo, docente y curso elegido');
      }
    );
    this.toastr.info('Periodo Elegido');
  }

  ngOnInit(): void {
    this.getdata();
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    // const mirol = this.theuser.Rol;
    // if (mirol === 'god') {
    //   this.getempresas();
    //   this.bandera = true;
    // } else if (mirol === 'administrador') {
    //   const parametro: any = this.theuser.SedeId;
    //   // los periodos de la sede
    //   this.periodoService.getperiodobysede(parametro).subscribe(
    //     res => {
    //       this.periodos = res;
    //       this.bandera = false;
    //     }, err => {
    //       this.toastr.error('Error al obtener peridos de la sede');
    //     }
    //   );
    // }
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'clase',
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
        'clase',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
