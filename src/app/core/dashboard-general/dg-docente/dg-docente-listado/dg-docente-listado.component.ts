import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sede } from '../../../../models/sede';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { SedeService } from '../../../../services/sede.service';
import { DocenteService } from '../../../../services/docente.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-docente-listado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-docente-listado.component.html',
  styleUrl: './dg-docente-listado.component.css'
})
export default class DgDocenteListadoComponent implements OnInit {
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
  sedes: any = [];
  docentes: any = [];
  docentesfiltrados: any = [];
  sedeelegida = 0;
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private docenteService: DocenteService,
    private auditoriaService: AuditoriaService,
  ) {  }
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
  onsedeSelected(event: any) {
    const value = event.target.value;
    this.usuarioService.getSearchDocentesbySede(value).subscribe(
      res => {
        const ladata: any = res;
        this.docentes = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener docentes');
      }
    );
  }
  ngOnInit(): void {
    this.getdata();
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    // const mirol = this.theuser.Rol;
    // const parametro: any = this.theuser.SedeId;
    // if (mirol === 'god') {
    //   this.getempresas();
    //   this.bandera = true;
    // } else if (mirol === 'administrador') {
    //   this.usuarioService.getSearchDocentesbySede(parametro).subscribe(
    //     res => {
    //       this.docentes = res;
    //     }, err => {
    //       this.toastr.error('Error al obtener docentes');
    //     }
    //   );
    //   // this.sedeService.getsede(parametro).subscribe(
    //   //   res => {
    //   //     this.sede = res;
    //   //     // const parametrito: any = this.sede.Name;
    //   //     // this.usuarioService.getSearchSede(parametrito).subscribe(
    //   //     //   res => {
    //   //     //     this.docentes = res;
    //   //     //     for (const iterator of this.docentes) {
    //   //     //     }
    //   //     //   }, err => {
    //   //     //     this.toastr.error('Error al obtener las sedes');
    //   //     //   }
    //   //     // );
    //   //   }, err => {
    //   //     this.toastr.error('Error al obtener las sedes');
    //   //   }
    //   // );
    // }
  }
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'docente',
        'creacion'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar docente');
    this.router.navigate(
      [
        'dashboard-principal',
        'docente',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
