import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auditoria } from '../../../../models/auditoria';
import { Clase } from '../../../../models/clase';
import { Estudiante } from '../../../../models/estudiante';
import { Integrante } from '../../../../models/integrante';
import { Usuario } from '../../../../models/usuario';
import { ClaseService } from '../../../../services/clase.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { EstudianteService } from '../../../../services/estudiante.service';
import { FileService } from '../../../../services/foto.service';
import { IntegranteService } from '../../../../services/integrante.service';
import { PeriodoService } from '../../../../services/periodo.service';
import { SedeService } from '../../../../services/sede.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-dd-estudiante-creacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-estudiante-creacion.component.html',
  styleUrl: './dd-estudiante-creacion.component.css'
})
export default class DdEstudianteCreacionComponent implements OnInit {
  usuario: Usuario = {
    Nombre: '',
    Apellido: '',
    Celular: '',
    Correo: '',
    NumDoc: '',
    Contra: '',
    Foto: '',
    Pago: 'pagado',
    Codigo: '999999999',
    Activo: false,
    Genero: '',
    TipoDocumento: '',
    RestablecerContra: 'desactivado',
    Rol: 'estudiante',
    SedeId: 0,
  };
  usuario1: Usuario = {
    id: 0,
    Nombre: '',
    Apellido: '',
    Celular: '',
    Correo: '',
    NumDoc: '',
    Codigo: '',
    Contra: '',
    Foto: '',
    Activo: false,
    Genero: '',
    TipoDocumento: '',
    RestablecerContra: '',
    Rol: '',
    SedeId: 0,
  };
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
  clase: Clase = {
    Nombre: '',
    Salon: '',
    Horario: '',
    idPeriodo: 0,
    idCurso: 0,
    idDocente: 0
  }
  estudiante: Estudiante = {
    NombreCompleto: '',
    Semestre: '',
    Firma: '',
    UsuarioId: 0
  }
  estudiante1: Estudiante = {
    id: 0,
    NombreCompleto: '',
    Semestre: '',
    Firma: '',
    UsuarioId: 0
  }
  integrante: Integrante = {
    Nombre: '',
    ClaseId: 0,
    EstudianteId: 0
  }
  integrante1: Integrante = {
    id: 0,
    Nombre: '',
    ClaseId: 0,
    EstudianteId: 0
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
  @ViewChild('file1') fileimagen: any;
  laurlimagen: string = '';
  datosimagen: any = [];
  cargoimagen = false;
  empresas: any = [];
  sedes: any = [];
  periodos: any = [];
  cursos: any = [];
  profesores: any = [];
  estudiantes: any = [];
  clases: any = [];
  integrantes: any = [];
  empresaelegida = 0;
  sedeelegida: number = 0;
  periodoelegido = 0;
  claseelegida = 0;
  bandera = false;
  banderita = '';
  banderabusqueda = false;
  dato = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fotoService: FileService,
    private sedeService: SedeService,
    private claseService: ClaseService,
    private empresaService: EmpresaService,
    private periodoService: PeriodoService,
    private usuarioService: UsuarioService,
    private estudianteService: EstudianteService,
    private integranteService: IntegranteService,
  ) {  }
  onperiodoSelected(event: any) {
    const value = event.target.value;
    this.toastr.info('Periodo Elegido');
    this.clase.idPeriodo = value;
    this.claseService.getclasebyperiodo(value).subscribe(
      res => {
        this.clases = res;
      }, err => {
        this.toastr.error('Error al obtener las clases del periodo elegido');
      }
    );
  }
  onclaseSelected(event: any) {
    const value = event.target.value;
    this.toastr.info('Clase Elegida');
    this.integrante.ClaseId = +value;
    this.claseelegida = value;
    this.claseService.getclase(value).subscribe(
      res => {
        this.clase = res;
        this.estudiantesdelaclase();
      }, err => {
        console.log(err);
        this.toastr.error('Error al obtener la clase elegida');
      }
    );
  }
  estudiantesdelaclase() {
    this.integranteService.getintegrantebyclase(this.claseelegida).subscribe(
      res => {
        this.integrantes = res;
      }, err => {
        this.toastr.error('Error al obtener los integrantes de la clase');
      }
    );
  }
  limpiarinputscreate() {
    this.banderita = 'creacion';
    this.usuario.Nombre = '';
    this.usuario.Apellido = '';
    this.usuario.Celular = '';
    this.usuario.Correo = '';
    this.usuario.NumDoc = '';
    this.usuario.Contra = '';
    this.usuario.Foto = '';
    this.usuario.Pago = 'pagado';
    this.usuario.Codigo = '999999999';
    this.usuario.Activo = false;
    this.usuario.Genero = '';
    this.usuario.TipoDocumento = '';
    this.usuario.RestablecerContra = 'desactivado';
    this.usuario.Rol = 'estudiante';
    this.usuario.SedeId = this.sedeelegida;
    this.estudiante.NombreCompleto = '';
    this.estudiante.Firma = '';
    this.estudiante.UsuarioId = 0;
    this.integrante.EstudianteId = 0;
    this.integrante.Nombre = '';
  }
  limpiarinputssearch() {
    this.banderita = 'busqueda';
    this.dato = '';
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-docente',
        'estudiante'
      ]
    );
  }
  changeImg() {
    this.fileimagen.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeImagen() {
    // this.showAvatarUpload = true;
    const files: {
      [key: string]: File
    } = this.fileimagen.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.fotoService.uploadfoto(files[0], 'Foto').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.usuario.Foto = this.laurlimagen;
        this.cargoimagen = true;
      },
      console.error,
    );
  }
  ngOnInit(): void {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    this.theuser = client;
    const parametro: any = this.theuser.SedeId;
    this.periodoService.getperiodobysede(parametro).subscribe(
      res => {
        this.periodos = res;
      }, err => {
        this.toastr.error('Error al obtener peridos de la sede');
      }
    );
    this.usuarioService.getSearchEstudiantesbySede(parametro).subscribe(
      res => {
        this.estudiantes = res;
      }, err => {
        this.toastr.error('Error al obtener profesores de la sede');
      }
    );
  }
  ongeneroSelected(event: any) {
    const value = event.target.value;
    this.usuario.Genero = value;
    console.log(value);
  }
  onTipoDocSelected(event: any) {
    const value = event.target.value;
    this.usuario.TipoDocumento = value;
    console.log(value);
  }
  getsearchdocumento(dato: any) {
    this.usuarioService.getSearchStudentByDoc(dato, this.sedeelegida).subscribe(
      res => {
        this.usuario1 = res;
        console.log(this.usuario1);
        const parametro: any = this.usuario1.id;
        this.estudianteService.getestudiantebyusuario(parametro).subscribe(
          ress => {
            this.estudiante1 = ress;
            console.log(this.estudiante1);
            this.integrante.EstudianteId = this.estudiante1.id;
            this.integrante.Nombre = this.clase.Nombre + ' - ' + this.estudiante1.NombreCompleto;
            console.log(this.integrante);
            this.saveintegrante();
          }, err => {
            console.log(err);
            this.toastr.error('Error al obtener al estudiante');
          }
        );
      }, err => {
        console.log(err);
        this.toastr.error('Error al obtener al usuario estudiante');
      }
    );
  }
  getsearchcelular(dato: any) {
    this.usuarioService.getSearchStudentByPhone(dato, this.sedeelegida).subscribe(
      res => {
        this.usuario1 = res;
        console.log(this.usuario1);
        const parametro: any = this.usuario1.id;
        this.estudianteService.getestudiantebyusuario(parametro).subscribe(
          ress => {
            this.estudiante1 = ress;
            console.log(this.estudiante1);
            this.integrante.EstudianteId = this.estudiante1.id;
            this.integrante.Nombre = this.clase.Nombre + ' - ' + this.estudiante1.NombreCompleto;
            console.log(this.integrante);
            this.saveintegrante();
          }, err => {
            console.log(err);
            this.toastr.error('Error al obtener al estudiante');
          }
        );
      }, err => {
        console.log(err);
        this.toastr.error('Error al obtener al usuario estudiante');
      }
    );
  }

  saveusuario() {
    this.usuario.Contra = this.usuario.NumDoc;
    console.log(this.usuario);
    // llamando a servicio de creacion que esta enlazada con el api
    this.usuarioService.saveusuario(this.usuario).subscribe(
      res => {
        console.log(res);
        this.usuario1 = res;
        this.toastr.success('Datos creados del nuevo usuario');
        this.saveestudiante();
        // this.auditoria.Registroid = this.usuario1.id;
        // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
        //   ress => {
        //     this.auditoria1 = ress;
        //     this.toastr.info('Accion registrada');
        //   }, err => {
        //     this.toastr.error('No se pudo registrar la accion');
        //   }
        // );
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo usuario');
      }
    );
  }
  saveestudiante() {
    this.estudiante.UsuarioId = this.usuario1.id;
    this.estudiante.NombreCompleto = this.usuario.Nombre + ' ' + this.usuario.Apellido;
    console.log(this.estudiante);
    this.estudianteService.saveestudiante(this.estudiante).subscribe(
      res => {
        this.estudiante1 = res;
        this.integrante.EstudianteId = this.estudiante1.id;
        this.toastr.info('Se creo una nueva estudiante de la clase');
        this.integrante.ClaseId = this.clase.id;
        this.integrante.Nombre = this.clase.Nombre + ' - ' + this.estudiante1.NombreCompleto;
        this.saveintegrante();
        // this.volver();
        // this.auditoria2.Interaccion = new Date();
        // this.auditoria2.Registroid = this.estudiante1.id;
        // this.auditoria2.UsuarioId = 1;
        // this.auditoriaService.saveauditoria(this.auditoria2).subscribe(
        //   ress => {
        //     this.auditoria3 = ress;
        //     this.toastr.info('Accion registrada');
        //   }, err => {
        //     this.toastr.error('Error al registrar accion');
        //   }
        // );
      }, err => {
        this.toastr.error('Error al crear estudiante');
      }
    );
  }
  saveintegrante() {
    console.log(this.integrante);
    this.integranteService.saveintegrante(this.integrante).subscribe(
      res => {
        this.integrante1 = res;
        this.toastr.success('Se creo una nuevo Integrante de la clase');
        this.toastr.info(this.integrante1.Nombre);
        this.estudiantesdelaclase();
        // this.volver();
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
        this.toastr.error('Error al crear integrante');
      }
    );
  }
}
