import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';
import { AuditoriaService } from '../../../services/auditoria.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-dg-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-home.component.html',
  styleUrl: './dg-home.component.css'
})
export default class DgHomeComponent implements OnInit {
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
  pacientes: any = [];
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private pacienteService: PacienteService,
    private auditoriaService: AuditoriaService,
  ) {  }
  ngOnInit(): void {
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.theuser = client;
    // const mirol = this.theuser.Rol;
    // const misede: any = this.theuser.SedeId;
    // if (mirol === 'god') {
    //   this.getpacientes();
    //   this.bandera = true;
    // } else if (mirol === 'administrador') {
    //   // this.pacienteService.getpacientebysede(misede).subscribe(
    //   //   res => {
    //   //     const ladata: any = res;
    //   //     if (ladata.status === 'success') {
    //   //       this.pacientes = ladata.data;
    //   //       this.toastr.info('Los pacientes de mi sede');
    //   //     } else if (ladata.status === 'warning') {
    //   //       this.pacientes = [];
    //   //       console.log(ladata.mesj);
    //   //     }
    //   //   }, err => {
    //   //     this.toastr.error('Error al obtener los pacientes de mi sede');
    //   //   }
    //   // );
    //   // this.pacienteService.getpacientebyestudiante(misede).subscribe(
    //   //   res => {
    //   //     const ladata:any = res;
    //   //     this.pacientes = ladata.data;
    //   //     // this.pacientes = res;
    //   //     this.toastr.info('Mis Pacientes');
    //   //   }, err => {
    //   //     this.toastr.error('Error al obtener los pacientes de mi sede');
    //   //   }
    //   // );
    // }
  }
  getpacientes() {
    this.pacienteService.getpacientes().subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.pacientes = ladata.data;
        } else if (ladata.status === 'warning') {
          this.pacientes = [];
          console.log(ladata.mesj);
        }
      },
      err => {
        this.toastr.error('Error al obtener los pacientes');
        console.log(err);
      }
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'paciente',
        'creacion'
      ]
    );
  }
  crearhistoria() {
    this.pacienteService.loggoutpaciente();
    this.router.navigate(
      [
        'dashboard-principal',
        'historia-clinica',
        'anamnesis'
      ]
    );
  }
  ver(codigo: any) {
    this.pacienteService.loggoutpaciente();
    this.pacienteService.logginpaciente(codigo);
    const tokenpacienterepuesto: any = localStorage.getItem('elpaciente');
    console.log(tokenpacienterepuesto);
    this.router.navigate(
      [
        'dashboard-principal',
        'historia-clinica',
        'anamnesis'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar paciente');
    this.router.navigate(
      [
        'dashboard-principal',
        'paciente',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
