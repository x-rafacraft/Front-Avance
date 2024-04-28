import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sede } from '../../../../models/sede';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/empresa';
import { Usuario } from '../../../../models/usuario';
import { Auditoria } from '../../../../models/auditoria';
import { SedeService } from '../../../../services/sede.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-sede-modificacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-sede-modificacion.component.html',
  styleUrl: './dg-sede-modificacion.component.css'
})
export default class DgSedeModificacionComponent implements OnInit {
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
  sede: Sede = {
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
    Accion: 'actualizacion',
    Tabla: 'sede',
    Resumen: 'modificar datos del sede',
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
  misede: Sede = {
    id: 0,
    Nombre: '',
    Direccion: '',
    Celular: '',
    Correo: '',
    TipoSede: '',
    EmpresaId: 0,
  }
  tiposedes = [
    { Nombre: 'principal' },
    { Nombre: 'secundaria' },
    { Nombre: 'sucursal' }
  ]
  empresas: any = [];
  mensaje: any;
  empresaelegida = 0;
  datoTipoDocumento = '';
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private auditoriaService: AuditoriaService,
  ) { }
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
    const params = this.activatedRoute.snapshot.params;
    this.sedeService.getsede(params['id']).subscribe(
      res => {
        const ladata: any = res;
        this.sede = ladata.data;
    }, err => {
        this.toastr.error('Error al obtener datos');
      }
    );
  }
  updatesede() {
    const parametro: any = this.sede.id;
    delete this.sede.id;
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.sedeService.updatesede(parametro, this.sede).subscribe(
      res => {
        this.mensaje = res;
        this.toastr.success('Datos actualizados');
        this.volver();
        // this.auditoria.Resumen = '';
        // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
        //   ress => {
        //     this.auditoria1 = ress;
        //     this.toastr.info('Accion registrada');
        //   }, err => {
        //     this.toastr.error('no se pudo registrar la accion');
        //   }
        // );
      },  err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo sede');
      }
    );
  }
}
