import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-dg-clase-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-clase-modificacion.component.html',
  styleUrl: './dg-clase-modificacion.component.css'
})
export default class DgClaseModificacionComponent implements OnInit {
  clase: Clase = {
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
    Accion: 'actualizacion',
    Tabla: 'clase',
    Resumen: 'modificar datos del clase',
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
  mensaje: any;
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
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    private periodoService: PeriodoService,
    private usuarioService: UsuarioService,
    private profesorService: ProfesorService,
    private auditoriaService: AuditoriaService,
  ) { }
  getempresas() {
    this.empresaService.getempresas().subscribe(
      res => {
        this.empresas = res;
      }, err => {
        this.toastr.error('No se pueden traer las empresas');
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
        this.toastr.error('Error al obtener docentes de la sede');
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
    this.toastr.info('Periodo Elegido');
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
  ngOnInit(): void {
    this.getcursos();
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    const params = this.activatedRoute.snapshot.params;
    this.theuser = client;
    const mirol = this.theuser.Rol;
    const misedee: any = this.theuser.SedeId;
    this.claseService.getclase(params['id']).subscribe(
      resdata => {
        console.log(resdata);
        this.clase = resdata;
        if (mirol === 'god') {
          this.getempresas();
          this.bandera = true;
        } else if (mirol === 'administrador') {
          if (params['id'] !== null) {
            this.usuarioService.getSearchDocentesbySede(misedee).subscribe(
              res => {
                this.docentes = res;
              }, err => {
                this.toastr.error('Error al obtener docentes de la sede');
              }
            );
            this.periodoService.getperiodobysede(misedee).subscribe(
              res => {
                this.periodos = res;
                let array: any = [];
                array = this.periodos;
                let bandera = false;
                for (const item of array) {
                  if (params['id'] === item.id) {
                    bandera = true;
                  }
                }
                // if (bandera === false) {
                //   this.router.navigate( [ 'dashboard-principal' ] );
                // }
              }, err => {
                this.toastr.error('Error al obtener peridos de la sede');
              }
              );
            }
          }
      }, err => {
        this.toastr.error('Error al obtener datos');
      }
    );
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'clase'
      ]
    );
  }
  updateclase() {
    const parametro: any = this.clase.id;
    delete this.clase.id;
    console.log(this.clase);
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.claseService.updateclase(parametro, this.clase).subscribe(
      res => {
        console.log(res);
        this.mensaje = res;
        this.toastr.success('Datos actualizados');
        this.volver();
        // this.auditoria.Registroid = parametro;
        // this.auditoria.Interaccion = new Date();
        // this.auditoria.UsuarioId = 1;
        // this.auditoria.Resumen = '';
        // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
        //   ress => {
        //     this.auditoria1 = ress;
        //     this.toastr.info('Accion registrada');
        //   }, err => {
        //     this.toastr.error('no se pudo registrar la accion');
        //   }
        // );
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo clase');
      }
    );
  }
}
