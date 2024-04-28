import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { SedeService } from '../../../../services/sede.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { EstudianteService } from '../../../../services/estudiante.service';

@Component({
  selector: 'app-dg-estudiante-listado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-estudiante-listado.component.html',
  styleUrl: './dg-estudiante-listado.component.css'
})
export default class DgEstudianteListadoComponent implements OnInit {
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
  empresas: any = [];
  sedes: any = [];
  estudiantes: any = [];
  empresaelegida = 0;
  sedeelegida = 0;
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sedeService: SedeService,
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private auditoriaService: AuditoriaService,
    private estudianteService: EstudianteService,
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
    this.usuarioService.getSearchEstudiantesbySede(value).subscribe(
      res => {
        const ladata: any = res;
        this.estudiantes = ladata.data;
      }, err => {
        this.toastr.error('Error al obtener estudiantes');
      }
    );
  }
  ngOnInit(): void {
    this.getdata();
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    // const mirol = this.theuser.Rol;
    // if (mirol === 'god') {
    //   this.getempresas();
    //   this.bandera = true;
    // } else if (mirol === 'administrador') {
    //   const parametro: any = this.theuser.SedeId;
    //   this.usuarioService.getSearchEstudiantesbySede(parametro).subscribe(
    //     res => {
    //       this.estudiantes = res;
    //     }, err => {
    //       this.toastr.error('Error al obtener docentes');
    //     }
    //   );
    // }
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'estudiante',
        'creacion'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar estudiante');
    this.router.navigate(
      [
        'dashboard-principal',
        'estudiante',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
