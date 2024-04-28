import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auditoria } from '../../../../models/auditoria';
import { Estudiante } from '../../../../models/estudiante';
import { Usuario } from '../../../../models/usuario';
import { AdministradorService } from '../../../../services/administrador.service';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-de-perfil-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './de-perfil-edit.component.html',
  styleUrl: './de-perfil-edit.component.css'
})
export default class DePerfilEditComponent implements OnInit {
  usuario: Usuario = {
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
    SedeId: 0,
  }
  estudiante: Estudiante = {
    id: 0,
    NombreCompleto: '',
    Firma: '',
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
    Tabla: 'estudiante',
    Resumen: 'modificar datos del estudiante',
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
  generos: any = [
    { Name: 'masculino' },
    { Name: 'femenino' },
  ];
  TipoDocumentoumentos: any = [
    { Name: 'dni' },
    { Name: 'pasaporte' },
    { Name: 'carnet extrangeria' }
  ];
  mensaje: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private auditoriaService: AuditoriaService,
    private administradorService: AdministradorService,
  ) { }
  ngOnInit(): void {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    this.usuario = client;
  }
  ongeneroSelected(event: any) {
    const value = event.target.value;
    this.usuario.Genero = value;
    console.log(value);
  }
  onTipoDocumentoumentoSelected(event: any) {
    const value = event.target.value;
    this.usuario.TipoDocumento = value;
    console.log(value);
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-estudiante',
        'perfil'
      ]
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
        this.estudiante.NombreCompleto = this.usuario.Nombre + ' ' + this.usuario.Apellido;
        this.updateestudiante();
        this.toastr.success('Datos actualizados');
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
        this.toastr.error('no se pudo crear un nuevo usuario');
      }
    );
  }
  updateestudiante() {
    console.log(this.estudiante);
    const parametro: any = this.estudiante.id;
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.administradorService.updateadministrador(parametro, this.estudiante).subscribe(
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
