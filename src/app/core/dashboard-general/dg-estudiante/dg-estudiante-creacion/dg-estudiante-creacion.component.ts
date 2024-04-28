import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { Auditoria } from '../../../../models/auditoria';
import { Estudiante } from '../../../../models/estudiante';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../../../services/foto.service';
import { SedeService } from '../../../../services/sede.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { EstudianteService } from '../../../../services/estudiante.service';

@Component({
  selector: 'app-dg-estudiante-creacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-estudiante-creacion.component.html',
  styleUrl: './dg-estudiante-creacion.component.css'
})
export default class DgEstudianteCreacionComponent implements OnInit {
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
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'creacion',
    Tabla: 'usuario',
    Resumen: 'crear nuevo usuario',
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
  auditoria2: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'creacion',
    Tabla: 'estudiante',
    Resumen: 'crear nueva estudiante',
    Detalle: '',
    Interaccion: new Date()
  }
  auditoria3: Auditoria = {
    id: 0,
    UsuarioId: 0,
    Registroid: 0,
    Accion: '',
    Tabla: '',
    Resumen: '',
    Detalle: '',
    Interaccion: new Date()
  }
  @ViewChild('file1') fileimagen: any;
  laurlimagen: string = '';
  datosimagen: any = [];
  cargoimagen = false;
  generos: any = [
    { Nombre: 'masculino' },
    { Nombre: 'femenino' },
  ];
  tiposdocumentos: any = [
    { Nombre: 'dni' },
    { Nombre: 'pasaporte' },
    { Nombre: 'carnet extrangeria' }
  ];
  sedes: any = [];
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fotoService: FileService,
    private sedeService: SedeService,
    private usuarioService: UsuarioService,
    private auditoriaService: AuditoriaService,
    private estudianteService: EstudianteService,
  ) {  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'estudiante'
      ]
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
  onsedeSelected(event: any) {
    const value = event.target.value;
    this.usuario.SedeId = +value;
    this.toastr.info('Sede Elegida');
    console.log(value);
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
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    // const mirol = this.theuser.Rol;
    // if (mirol === 'god') {
    this.getdata();
    this.bandera = true;
    // } else if (mirol === 'administrador') {
    //   const parametro = this.theuser.SedeId;
    //   this.usuario.SedeId = parametro;
    // }
  }
  saveusuario() {
    // llamando a servicio de creacion que esta enlazada con el api
    this.usuarioService.saveusuario(this.usuario).subscribe(
      res => {
        const ladata: any = res;
        this.usuario1 = ladata.data;
        this.toastr.success('Datos creados del nuevo usuaro');
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
        const ladata: any = res;
        this.estudiante1 = ladata.data;
        this.toastr.info('Se creo una nueva estudiante');
        this.volver();
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

}
