import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Sede } from '../../../../models/sede';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/empresa';
import { Periodo } from '../../../../models/periodo';
import { Usuario } from '../../../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { Auditoria } from '../../../../models/auditoria';
import { SedeService } from '../../../../services/sede.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { PeriodoService } from '../../../../services/periodo.service';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-periodo-creacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-periodo-creacion.component.html',
  styleUrl: './dg-periodo-creacion.component.css'
})
export default class DgPeriodoCreacionComponent implements OnInit {
  periodo: Periodo = {
    Nombre: '',
    Empieza: new Date(),
    Termina: new Date(),
    SedeId: 0
  }
  periodo1: Periodo = {
    id: 0,
    Nombre: '',
    Empieza: new Date,
    Termina: new Date,
    SedeId: 0
  }
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'creacion',
    Tabla: 'periodo',
    Resumen: 'crear nueva periodo',
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
  sede: Sede = {
    id: 0,
    Nombre: '',
    Direccion: '',
    Celular: '',
    Correo: '',
    TipoSede: '',
    EmpresaId: 0,
  }
  empresas: any = [];
  sedes: any = [];
  empresaelegida = 0;
  sedeelegida = 0;
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private empresaService: EmpresaService,
    private periodoService: PeriodoService,
    private auditoriaService: AuditoriaService,
  ) {  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'periodo'
      ]
    );
  }
  getdata() {
    this.sedeService.getsedesbyempresa(1).subscribe(
      res => {
        const ladata: any = res;
        this.sedes = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener las sedes');
      }
    );
  }
  onsedeSelected(event: any) {
    const value = event.target.value;
    this.periodo.SedeId = +value;
    this.toastr.info('Sede Elegida');
  }
  ngOnInit(): void {
    this.getdata();
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
  }
  saveperiodo() {
    const fecha1: any = this.periodo.Empieza;
    const fecha2: any = this.periodo.Termina;
    const inicio = new Date(fecha1);
    const fin = new Date(fecha2);
    this.periodo.Empieza = inicio;
    this.periodo.Termina = fin;
    console.log(this.periodo);
    this.periodoService.saveperiodo(this.periodo).subscribe(
      res => {
        this.periodo1 = res;
        this.toastr.info('Se creo una nueva periodo');
        this.volver();
        // this.auditoria.Interaccion = new Date();
        // this.auditoria.Registroid = this.periodo1.id;
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
        console.log(err);
        this.toastr.error('Error al crear periodo');
      }
    );
  }
}
