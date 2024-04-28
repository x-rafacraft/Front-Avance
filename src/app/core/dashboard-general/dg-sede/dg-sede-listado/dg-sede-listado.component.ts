import { ToastrService } from 'ngx-toastr';
import { Sede } from '../../../../models/sede';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario';
import { Empresa } from '../../../../models/empresa';
import { Router, RouterModule } from '@angular/router';
import { SedeService } from '../../../../services/sede.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-sede-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-sede-listado.component.html',
  styleUrl: './dg-sede-listado.component.css'
})
export default class DgSedeListadoComponent implements OnInit {
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
  misede: Sede = {
    id: 0,
    Nombre: '',
    Direccion: '',
    Celular: '',
    Correo: '',
    TipoSede: '',
    EmpresaId: 0,
  }
  sedes: any = [];
  empresas: any = [];
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
  getdata() {
    this.sedeService.getsedesbyempresa(1).subscribe(
      restodasmissedes => {
        const ladata: any = restodasmissedes;
        this.sedes = ladata.data;
      }, err => {
        this.toastr.error('Error al traer mi empresa');
      }
    );
  }
  ngOnInit(): void {
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    this.getdata();
  }
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'sede',
        'creacion'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar sede');
    this.router.navigate(
      [
        'dashboard-principal',
        'sede',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
