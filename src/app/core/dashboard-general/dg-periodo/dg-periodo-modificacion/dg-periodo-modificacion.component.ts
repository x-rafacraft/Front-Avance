import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sede } from '../../../../models/sede';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/empresa';
import { Periodo } from '../../../../models/periodo';
import { Usuario } from '../../../../models/usuario';
import { Auditoria } from '../../../../models/auditoria';
import { SedeService } from '../../../../services/sede.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { PeriodoService } from '../../../../services/periodo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-periodo-modificacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-periodo-modificacion.component.html',
  styleUrl: './dg-periodo-modificacion.component.css'
})
export default class DgPeriodoModificacionComponent implements OnInit {
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'actualizacion',
    Tabla: 'periodo',
    Resumen: 'modificar datos del periodo',
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
  sede: Sede = {
    id: 0,
    Nombre: '',
    Direccion: '',
    Celular: '',
    Correo: '',
    TipoSede: '',
    EmpresaId: 0,
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
  periodo: Periodo = {
    id: 0,
    Nombre: '',
    Empieza: new Date(),
    Termina: new Date(),
    SedeId: 0
  }
  mensaje: any;
  empresas: any = [];
  sedes: any = [];
  empresaelegida = 0;
  sedeelegida = 0;
  bandera = false;
  stringfechacumple: any;
  lafechaempieza: Date | undefined;
  lafechatermina: Date | undefined;
  stringfechaempieza: any;
  stringfechatermino: any;
  nuevafechaempieza: Date | undefined;
  nuevafechatermino: Date | undefined;
  constructor(
    // private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private periodoService: PeriodoService,
    private auditoriaService: AuditoriaService,
  ) { }
  cambio1(event:any) {
    console.log(event);
    this.periodo.Empieza = new Date(event);
  }
  cambio2(event:any) {
    console.log(event);
    this.periodo.Termina = new Date(event);
  }
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
    const params = this.activatedRoute.snapshot.params;
    // this.theuser = client;
    // const mirol = this.theuser.Rol;
    // const misedee = this.theuser.SedeId;
    const elperiodo = params['id'];
    this.periodoService.getperiodo(elperiodo).subscribe(
      res => {
        const ladata: any = res;
        this.periodo = ladata.data;
        const fecha1: any = this.periodo.Empieza;
        const fecha2: any = this.periodo.Termina;
        const dia1 = new Date(fecha1).getDate() + 1;
        const mes1 = new Date(fecha1).getMonth();
        const anio1 = new Date(fecha1).getFullYear();
        const dia2 = new Date(fecha2).getDate() + 1;
        const mes2 = new Date(fecha2).getMonth();
        const anio2 = new Date(fecha2).getFullYear();
        this.lafechaempieza = new Date(anio1, mes1, dia1);
        this.lafechatermina = new Date(anio2, mes2, dia2);
        // this.stringfechaempieza = this.pd.transform(this.lafechaempieza, 'yyyy-MM-dd');
        // this.stringfechatermino = this.pd.transform(this.lafechatermina, 'yyyy-MM-dd');
        // const lasede = this.periodo.SedeId;
        // if (mirol === 'god') {
        //   this.getempresas();
        //   this.bandera = true;
        // } else if (mirol === 'administrador') {
        //   if (params['id'] !== null) {
        //     if (lasede === misedee) {
        //       console.log('La sede le pertenece');
        //     } else {
        //       this.router.navigate( [ 'dashboard-principal' ] );
        //     }
        //   }
        // }
      }, err => {
        this.toastr.error('Error al recibir el periodo');
      }
    );
  }
  updateperiodo() {
    const parametro: any = this.periodo.id;
    delete this.periodo.id;
    const fecha1: any = this.periodo.Empieza;
    const fecha2: any = this.periodo.Termina;
    const inicio = new Date(fecha1);
    const fin = new Date(fecha2);
    this.periodo.Empieza = inicio;
    this.periodo.Termina = fin;
    console.log(this.periodo);
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.periodoService.updateperiodo(parametro, this.periodo).subscribe(
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
        this.toastr.error('no se pudo crear un nuevo periodo');
      }
    );
  }
}
