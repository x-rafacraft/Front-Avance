import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../../../../models/paciente';
import { Usuario } from '../../../../models/usuario';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { CitaService } from '../../../../services/cita.service';
import { PacienteService } from '../../../../services/paciente.service';

@Component({
  selector: 'app-dd-cita-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-cita-listado.component.html',
  styleUrl: './dd-cita-listado.component.css'
})
export default class DdCitaListadoComponent implements OnInit {
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
  citas: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private auditoriaService: AuditoriaService,
  ) {  }
  crear() {
    this.router.navigate(
      [
        'dashboard-docente',
        'cita',
        'creacion'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    const codigoaeditar = codigo;
    this.toastr.info('Editar cita');
    this.router.navigate(
      [
        'dashboard-docente',
        'cita',
        'modificacion',
        codigoaeditar
      ]
    );
  }
  ngOnInit(): void {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    this.theuser = client;
    const miusuario: any = this.theuser.id;
    this.citaService.getcitabyuser(miusuario).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.citas = ladata.data;
          this.toastr.info('todas las citas');
        } else if (ladata.status === 'warning') {
          this.citas = [];
          console.log(ladata.mesj);
        }
      }, err => {
        this.toastr.error('Error al obtener las citas');
      }
    );
  }
}
