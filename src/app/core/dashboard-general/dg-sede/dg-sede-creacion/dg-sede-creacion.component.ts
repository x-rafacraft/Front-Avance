import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Sede } from '../../../../models/sede';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/empresa';
import { Usuario } from '../../../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { Auditoria } from '../../../../models/auditoria';
import { SedeService } from '../../../../services/sede.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-sede-creacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-sede-creacion.component.html',
  styleUrl: './dg-sede-creacion.component.css'
})
export default class DgSedeCreacionComponent implements OnInit {
  sede: Sede = {
    Nombre: '',
    Direccion: '',
    Celular: '',
    Correo: '',
    TipoSede: '',
    EmpresaId: 1
  }
  sede1: Sede = {
    id: 0,
    Nombre: '',
    Direccion: '',
    Celular: '',
    Correo: '',
    TipoSede: '',
    EmpresaId: 0,
  }
  misede: Sede = {
    id: 0,
    Nombre: '',
    Direccion: '',
    Celular: '',
    Correo: '',
    TipoSede: '',
    EmpresaId: 0,
  }
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'creacion',
    Tabla: 'sede',
    Resumen: 'crear nueva sede',
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
  empresa: Empresa = {
    id: 0,
    Ruc: '',
    RazonSocial: '',
    Representante: ''
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
  tiposedes = [
    { Nombre: 'principal' },
    { Nombre: 'secundaria' },
    { Nombre: 'sucursal' }
  ]
  empresaelegida = 0;
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private empresaService: EmpresaService,
    private auditoriaService: AuditoriaService,
  ) {  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'sede'
      ]
    );
  }
  ontiposedeSelected(event: any) {
    const value = event.target.value;
    this.sede.TipoSede = value;
    console.log(value);
  }
  ngOnInit(): void {
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    this.empresaService.getempresa(1).subscribe(
      res => {
        const ladata: any = res;
        this.empresa = ladata.data;
        this.sede.EmpresaId = this.empresa.id;
      }, err => {
        this.toastr.error('Error al traer mi empresa');
      }
    );
  }
  savesede() {
    console.log(this.sede);
    this.sedeService.savesede(this.sede).subscribe(
      res => {
        this.sede1 = res;
        this.toastr.info('Se creo una nueva sede');
        this.volver();
        // this.auditoria.Interaccion = new Date();
        // this.auditoria.Registroid = this.sede1.id;
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
        this.toastr.error('Error al crear sede');
      }
    );
  }
}
