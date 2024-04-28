import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auditoria } from '../../../../models/auditoria';
import { Usuario } from '../../../../models/usuario';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { FileService } from '../../../../services/foto.service';
import { SedeService } from '../../../../services/sede.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dg-usuario-creacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-usuario-creacion.component.html',
  styleUrl: './dg-usuario-creacion.component.css'
})
export default class DgUsuarioCreacionComponent implements OnInit {
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
    Rol: '',
    SedeId: 0
  };
  usuario1: Usuario = {
    id: 0,
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
  @ViewChild('file1') fileimagen: any;
  laurlimagen: string = '';
  datosimagen: any = [];
  cargoimagen = false;
  generos: any = [
    { Nombre: 'masculino' },
    { Nombre: 'femenino' },
  ];
  roles: any = [
    { Nombre: 'god' },
    { Nombre: 'administrador' },
    { Nombre: 'docente' },
    { Nombre: 'estudiante' }
  ];
  TipoDocumentoumentos: any = [
    { Nombre: 'dni' },
    { Nombre: 'pasaporte' },
    { Nombre: 'carnet extrangeria' }
  ];
  sedes: any = [];
  empresas: any = [];
  empresaelegida = 0;
  sedeelegida = 0;
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fotoService: FileService,
    private sedeService: SedeService,
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService,
    private auditoriaService: AuditoriaService,
  ) {}
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
    this.empresaelegida = value;
    this.sedeService.getsedesbyempresa(value).subscribe(
      res => {
        this.toastr.info('Empresa Elegida');
        this.sedes = res;
      }, err => {
        this.toastr.error('Error al obtener las sedes de la empresa elegida');
      }
    );
  }
  ongeneroSelected(event: any) {
    const value = event.target.value;
    this.usuario.Genero = value;
    console.log(value);
  }
  onrolSelected(event: any) {
    const value = event.target.value;
    this.usuario.Rol = value;
    console.log(value);
  }
  onTipoDocumentoumentoSelected(event: any) {
    const value = event.target.value;
    this.usuario.TipoDocumento = value;
    console.log(value);
  }
  onsedeSelected(event: any) {
    const value = event.target.value;
    this.usuario.SedeId = value;
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
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    // const mirol = this.theuser.Rol;
    // const misede: any = this.theuser.SedeId;
    // if (mirol === 'god') {
    //   this.getempresas();
    //   this.bandera = true;
    // } else if (mirol === 'administrador') {
    //   this.usuario.SedeId = misede;
    // }
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'usuario'
      ]
    );
  }
  saveusuario() {
    console.log(this.usuario);
    // llamando a servicio de creacion que esta enlazada con el api
    this.usuarioService.saveusuario(this.usuario).subscribe(
      res => {
        console.log(res);
        this.usuario1 = res;
        this.volver();
        this.toastr.success('Datos creados del nuevo usuaro');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo usuario');
      }
    );
  }
}
