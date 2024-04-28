import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cita } from '../../../../models/cita';
import { Empresa } from '../../../../models/empresa';
import { Paciente } from '../../../../models/paciente';
import { RecordatorioCorreo, RecordatorioWhatsapp } from '../../../../models/recordatorio';
import { Sede } from '../../../../models/sede';
import { Usuario } from '../../../../models/usuario';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { CitaService } from '../../../../services/cita.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { PacienteService } from '../../../../services/paciente.service';
import { SedeService } from '../../../../services/sede.service';
import { SendgmailService } from '../../../../services/sendgmail.service';
import { SendwhatsappService } from '../../../../services/sendwhatsap.service';

@Component({
  selector: 'app-dd-cita-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-cita-modificacion.component.html',
  styleUrl: './dd-cita-modificacion.component.css'
})
export default class DdCitaModificacionComponent implements OnInit {
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
  cita: Cita = {
    Fecha: new Date(),
    Hora: '',
    Odontologo: '',
    Empresa: '',
    Sede: '',
    Lugar: '',
    Extras: '',
    PacienteId: 0,
    UsuarioId: 0
  };
  cita1: Cita = {
    id: 0,
    Fecha: new Date(),
    Hora: '',
    Odontologo: '',
    Empresa: '',
    Sede: '',
    Lugar: '',
    Extras: '',
    PacienteId: 0,
    UsuarioId: 0
  };
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
  recordatoriocorreo: RecordatorioCorreo = {
    fecha: '',
    hora: '',
    numdoc: '',
    nombrecompleto: '',
    odontologo: '',
    estudiante: '',
    lugar: '',
    extra: '',
    correo: '',
    empresa: '',
    sistema: ''
  }
  recordatoriowasap: RecordatorioWhatsapp = {
    fecha: '',
    hora: '',
    numdoc: '',
    nombrecompleto: '',
    odontologo: '',
    estudiante: '',
    lugar: '',
    extra: '',
    celular: '',
    empresa: '',
    sistema: ''
  }
  empresas: any = [];
  sedes: any = [];
  bandera = false;
  empresaelegida = 0;
  sedeelegida = 0;
  stringfecha: any;
  nuevafecha: Date | undefined;
  datito = '';
  laempresa = '';
  lasede = '';
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private citaService: CitaService,
    private sedeService: SedeService,
    private sendCorreo: SendgmailService,
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    private pacienteService: PacienteService,
    private sendWhatsapp: SendwhatsappService,
    private auditoriaService: AuditoriaService,
  ) {  }
  cambio1(event:any) {
    console.log(event);
    this.cita.Fecha = new Date(event);
  }
  obtenerpaciente(data: any) {
    this.pacienteService.getpaciente(data).subscribe(
      res => {
        this.paciente = res;
        this.datito = this.paciente.Nombre + ' ' + this.paciente.ApellidoPaterno + ' ' + this.paciente.ApellidoMaterno;
      }, err => {
        this.toastr.error('Error al obtener el paciente');
      }
    );
  }
  obtenerdatos(data: any) {
    this.sedeService.getsede(data).subscribe(
      res => {
        this.sede = res;
        this.cita.Sede = this.sede.Nombre;
        const parametro: any = this.sede.EmpresaId;
        this.empresaService.getempresa(parametro).subscribe(
          ress => {
            this.empresa = ress;
            this.cita.Empresa = this.empresa.RazonSocial;
          }, err => {
            this.toastr.error('Error al obtener la empresa');
          }
        );
      }, err => {
        this.toastr.error('Error al obtener la empresa');
      }
    );
  }
  ngOnInit(): void {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    const params = this.activatedRoute.snapshot.params;
    this.theuser = client;
    const misede: any = this.theuser.SedeId;
    const mirol = this.theuser.Rol;
    this.cita.UsuarioId = this.theuser.id;
    const lacita = params['id'];
    this.citaService.getcita(lacita).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.cita = ladata.data;
          this.toastr.info('Obteniendo datos de la cita elegida');
          const fecha1: any = this.cita.Fecha;
          const lafechaempieza = new Date(fecha1);
          this.stringfecha = this.pd.transform(lafechaempieza, 'yyyy-MM-dd');
          this.obtenerpaciente(this.cita.PacienteId);
          this.obtenerdatos(misede);
        } else if (ladata.status === 'warning') {
          this.toastr.info('No se pudo obtener los datos de la cita elegida');
          this.volver;
        }
      }, err => {
        this.toastr.error('Error al recibir el periodo');
      }
    );
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-docente',
        'cita'
      ]
    );
  }
  updatecita() {
    const dato: any = this.cita.id;
    console.log(this.cita);
    this.citaService.updatecita(dato, this.cita).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.cita1 = ladata.data;
          // this.recordatoriocorreo.fecha = this.cita1.slice(0, 10);
          this.recordatoriocorreo.hora = this.cita1.Hora;
          this.recordatoriocorreo.numdoc = this.paciente.NumeroHistoriaClinica;
          this.recordatoriocorreo.nombrecompleto = this.datito;
          this.recordatoriocorreo.odontologo = this.cita1.Odontologo;
          this.recordatoriocorreo.estudiante = this.theuser.Nombre + ' ' + this.theuser.Apellido;
          this.recordatoriocorreo.lugar = this.cita1.Lugar;
          this.recordatoriocorreo.estudiante = this.cita1.Extras;
          this.recordatoriocorreo.correo = this.paciente.Correo;
          this.recordatoriocorreo.empresa = this.cita1.Empresa;
          this.recordatoriocorreo.sistema = 'Muelitas Felices';
          console.log(this.recordatoriocorreo);
          // this.enviarcorreo();
          // this.recordatoriowasap.fecha = this.cita.Fecha?.toLocaleDateString();
          this.recordatoriowasap.hora = this.cita1.Hora;
          this.recordatoriowasap.numdoc = this.paciente.NumeroHistoriaClinica;
          this.recordatoriowasap.nombrecompleto = this.datito;
          this.recordatoriowasap.odontologo = this.cita1.Odontologo;
          this.recordatoriowasap.estudiante = this.theuser.Nombre + ' ' + this.theuser.Apellido;
          this.recordatoriowasap.lugar = this.cita1.Lugar;
          this.recordatoriowasap.estudiante = this.cita1.Extras;
          this.recordatoriowasap.celular = this.paciente.NroCelular;
          this.recordatoriowasap.empresa = this.cita1.Empresa;
          this.recordatoriowasap.sistema = 'Muelitas Felices';
          console.log(this.recordatoriowasap);
          // this.enviarmensaje();
          this.toastr.success('Cita actualizada correctamente');
          this.volver();
        }
      }, err => {
        this.toastr.error('Error al actualizar la cita');
      }
    );
  }
  enviarcorreo() {
    this.sendCorreo.sendrecordatorio(this.recordatoriocorreo).subscribe(
      res => {
        const ladata: any = res;
        console.log(ladata);
        this.toastr.success('Correo enviado');
      }, err => {
        this.toastr.error('Error al enviar el correo');
      }
    );
  }
  enviarmensaje() {
    this.sendWhatsapp.sendrecordatorio(this.recordatoriowasap).subscribe(
      res => {
        const ladata: any = res;
        console.log(ladata);
        this.toastr.success('Mensaje enviado');
      }, err => {
        this.toastr.error('Error al enviar el correo');
      }
    );
  }
}
