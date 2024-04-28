import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../../../../models/paciente';
import { Usuario } from '../../../../models/usuario';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { PacienteService } from '../../../../services/paciente.service';

@Component({
  selector: 'app-de-paciente-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './de-paciente-listado.component.html',
  styleUrl: './de-paciente-listado.component.css'
})
export default class DePacienteListadoComponent implements OnInit {
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
  paciente: Paciente = {
    id: 0,
    FechaCreacion: new Date(),
    HoraCreacion: new Date(),
    NumeroHistoriaClinica: '',
    Ectoscopia: '',
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Sexo: '',
    Lugar: '',
    Domicilio: '',
    FechaNacimiento: new Date(),
    EstadoCivil: '',
    NroCelular: '',
    Correo: '',
    Raza: '',
    GradoInstruccion: '',
    Ocupacion: '',
    Responsable: '',
    ParentescoconResponsable: '',
    DomicilioResponsable: '',
    CelularResponsable: '',
    Acompaniante: '',
    EnfermedadActual: '',
    MotivoConsulta: '',
    FuncionesBiologicas: '',
    Orina: '',
    Apetito: '',
    Suenio: '',
    Deposiciones: '',
    Sed: '',
    Alergias: '',
    AntecedentesAlergicos: '',
    AntecedentesPersonal: '',
    AntecedentesFamiliar: '',
    AntecedentesPatologicos: '',
    UsuarioId: 0,
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
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    this.theuser = client;
    const miid: any = this.theuser.id;
    this.pacienteService.getpacientebyuser(miid).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.pacientes = ladata.data;
          this.toastr.info('Los pacientes de mi sede');
        } else if (ladata.status === 'warning') {
          this.pacientes = [];
          console.log(ladata.mesj);
        }
      }, err => {
        this.toastr.error('Error al obtener los pacientes de mi sede');
      }
    );
  }
  searchpaciente(data: any) {
    this.pacienteService.getpacientebyhistoria(data).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.paciente = ladata.data;
          this.toastr.info('Paciente Encontrado');
        } else if (ladata.status === 'warning') {
          this.pacientes = [];
          console.log(ladata.mesj);
          this.toastr.warning('Paciente no Encontrado');
        }
      }, err => {
        this.toastr.error('Error al obtener los datos del paciente');
      }
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.pacienteService.loggoutpaciente();
    this.router.navigate(
      [
        'dashboard-estudiante',
        'paciente',
        'creacion'
      ]
    );
  }
  crearhistoria() {
    this.pacienteService.loggoutpaciente();
    this.router.navigate(
      [
        'dashboard-estudiante',
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
        'dashboard-estudiante',
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
        'dashboard-estudiante',
        'paciente',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
