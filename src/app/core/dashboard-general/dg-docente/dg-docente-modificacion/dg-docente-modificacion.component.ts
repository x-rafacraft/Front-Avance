import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Docente } from '../../../../models/docente';
import { Usuario } from '../../../../models/usuario';
import { Auditoria } from '../../../../models/auditoria';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../../../services/foto.service';
import { SedeService } from '../../../../services/sede.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { DocenteService } from '../../../../services/docente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-docente-modificacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-docente-modificacion.component.html',
  styleUrl: './dg-docente-modificacion.component.css'
})
export default class DgDocenteModificacionComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    Nombre: '',
    Apellido: '',
    Celular: '',
    Correo: '',
    NumDoc: '',
    Codigo: '',
    Contra: '',
    Foto: '',
    Pago: '',
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
    Pago: '',
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
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'actualizacion',
    Tabla: 'usuario',
    Resumen: 'modificar datos del usuario',
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
    Accion: 'actualizacion',
    Tabla: 'docente',
    Resumen: 'modificar datos del docente',
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
  mensaje: any;
  bandera = false;
  nuevacontra = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fotoService: FileService,
    private sedeService: SedeService,
    private activatedRoute: ActivatedRoute,
    private docenteService: DocenteService,
    private usuarioService: UsuarioService,
    private auditoriaService: AuditoriaService,
  ) { }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'docente'
      ]
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
    console.log(value);
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
    this.getdata();
    const params = this.activatedRoute.snapshot.params;
    const parametro = params['id'];
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    // const mirol = this.theuser.Rol;
    // const misedee = this.theuser.SedeId;
    this.usuarioService.getusuario(parametro).subscribe(
      res => {
        const ladata1: any = res;
        this.usuario = ladata1.data;
        const lasede = this.usuario.SedeId;
        this.docenteService.getdocentebyusuario(parametro).subscribe(
          ress => {
            const ladata2: any = ress;
            this.docente = ladata2.data;
            // if (mirol === 'god') {
            //   this.getempresas();
            //   this.bandera = true;
            // } else if (mirol === 'administrador') {
            //   if (parametro !== null) {
            //     if (lasede === misedee) {
            //       console.log('La sede es igual a la del usuario');
            //     } else {
            //       this.router.navigate( [ 'dashboard-principal' ] );
            //     }
            //   }
            // }
          }, err => {
            this.toastr.error('Error al obtener al docente');
          }
        );
      }, err => {
        this.toastr.error('Error al obtener al usuario');
      }
    );
  }
  updatepassword() {
    const parametro: any = this.usuario.id;
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.usuarioService.updateusuariocontra(parametro, this.usuario).subscribe(
      res => {
        this.mensaje = res;
        this.toastr.success('Contraseña actualizada correctamente');
        this.volver();
        this.auditoria.Resumen = 'actualizacion de contraseña';
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
        this.toastr.error('no se pudo crear un nuevo usuario');
      }
    );
  }
  updateusuario() {
    console.log(this.usuario);
    const parametro: any = this.usuario.id;
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.usuarioService.updateusuario(parametro, this.usuario).subscribe(
      res => {
        console.log(res);
        this.mensaje = res;
        this.toastr.success('Datos actualizados');
        this.updatedocente();
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
        this.toastr.error('no se pudo crear un nuevo usuario');
      }
    );
  }
  updatedocente() {
    console.log(this.docente);
    const parametro: any = this.docente.id;
    this.docente.NombreCompleto = this.usuario.Nombre + ' ' + this.usuario.Apellido;
    this.docente.id;
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.docenteService.updatedocente(parametro, this.docente).subscribe(
      res => {
        console.log(res);
        this.mensaje = res;
        this.toastr.success('Datos actualizados');
        this.volver();
        // this.auditoria2.Registroid = parametro;
        // this.auditoria2.Interaccion = new Date();
        // this.auditoria2.UsuarioId = 1;
        // this.auditoria2.Resumen = '';
        // this.auditoriaService.saveauditoria(this.auditoria2).subscribe(
        //   ress => {
        //     this.auditoria3 = ress;
        //     this.toastr.info('Accion registrada');
        //   }, err => {
        //     this.toastr.error('no se pudo registrar la accion');
        //   }
        // );
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo usuario');
      }
    );
  }
}

