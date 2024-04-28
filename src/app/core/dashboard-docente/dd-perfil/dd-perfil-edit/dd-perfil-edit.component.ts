import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auditoria } from '../../../../models/auditoria';
import { Docente } from '../../../../models/docente';
import { Usuario } from '../../../../models/usuario';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { DocenteService } from '../../../../services/docente.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-dd-perfil-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-perfil-edit.component.html',
  styleUrl: './dd-perfil-edit.component.css'
})
export default class DdPerfilEditComponent implements OnInit {
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
    Resumen: 'modificar datos del administrador',
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
    private docenteService: DocenteService,
    private auditoriaService: AuditoriaService,
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
        'dashboard-docente',
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
        this.docente.NombreCompleto = this.usuario.Nombre + ' ' + this.usuario.Apellido;
        this.updatedocente();
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
  updatedocente() {
    console.log(this.docente);
    const parametro: any = this.docente.id;
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
