import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auditoria } from '../../../../models/auditoria';
import { Estudiante } from '../../../../models/estudiante';
import { Paciente } from '../../../../models/paciente';
import { Usuario } from '../../../../models/usuario';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { EstudianteService } from '../../../../services/estudiante.service';
import { FileService } from '../../../../services/foto.service';
import { PacienteService } from '../../../../services/paciente.service';

@Component({
  selector: 'app-de-paciente-creacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './de-paciente-creacion.component.html',
  styleUrl: './de-paciente-creacion.component.css'
})
export default class DePacienteCreacionComponent implements OnInit {
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
  estudiante: Estudiante = {
    id: 0,
    NombreCompleto: '',
    Firma: '',
    UsuarioId: 0
  }
  paciente: Paciente = {
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
  }
  paciente1: Paciente = {
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
  }
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'creacion',
    Tabla: 'paciente',
    Resumen: 'crear nueva paciente',
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
  generos: any = [
    { Nombre: 'masculino' },
    { Nombre: 'femenino' },
  ];
  estadosciviles: any = [
    { Nombre: 'Soltero/a' },
    { Nombre: 'Casado/a' },
    { Nombre: 'Conviviente' },
    { Nombre: 'Viudo/a' },
    { Nombre: 'Divorciado/a' },
    { Nombre: 'Separado/a' }
  ];
  razas: any = [
    { Nombre: 'Indígena' },
    { Nombre: 'Mestizo' },
    { Nombre: 'Afroperuano' },
    { Nombre: 'Blanco' },
    { Nombre: 'Criollo' },
    { Nombre: 'Asiático' },
    { Nombre: 'Migrante reciente' }
  ];
  gradosdeinstruccion: any = [
    { Nombre: 'Analfabetos' },
    { Nombre: 'Inicial incompleta' },
    { Nombre: 'Inicial completa' },
    { Nombre: 'Educacion Especial' },
    { Nombre: 'Educación primaria incompleta' },
    { Nombre: 'Educación primaria completa' },
    { Nombre: 'Educación secundaria incompleta' },
    { Nombre: 'Educación secundaria completa' },
    { Nombre: 'Educación terciaria (universitaria o técnica) incompleta' },
    { Nombre: 'Educación terciaria (universitaria o técnica) completa' }
  ];
  parentescos: any = [
    { Nombre: 'Padre' },
    { Nombre: 'Madre' },
    { Nombre: 'Hijo' },
    { Nombre: 'Hija' },
    { Nombre: 'Hermano' },
    { Nombre: 'Hermana' },
    { Nombre: 'Abuelo' },
    { Nombre: 'Abuela' },
    { Nombre: 'Nieto' },
    { Nombre: 'Nieta' },
    { Nombre: 'Tío' },
    { Nombre: 'Tía' },
    { Nombre: 'Sobrino' },
    { Nombre: 'Sobrina' },
    { Nombre: 'Primo' },
    { Nombre: 'Prima' },
    { Nombre: 'Cónyuge' },
    { Nombre: 'Cuñado' },
    { Nombre: 'Cuñada' },
    { Nombre: 'Suegro' },
    { Nombre: 'Suegra' },
    { Nombre: 'Vecino' },
    { Nombre: 'Vecina' },
    { Nombre: 'Tutor' },
    { Nombre: 'Tutora' }
  ];
  @ViewChild('file1') fileimagen: any;
  laurlimagen: string = '';
  datosimagen: any = [];
  cargoimagen = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fotoService: FileService,
    private pacienteService: PacienteService,
    private auditoriaService: AuditoriaService,
    private estudianteService: EstudianteService,
  ) {  }
  ongeneroSelected(event: any) {
    const value = event.target.value;
    this.paciente.Sexo = value;
    console.log(value);
  }
  onrazaSelected(event: any) {
    const value = event.target.value;
    this.paciente.Raza = value;
    console.log(value);
  }
  ongradoinstruccionSelected(event: any) {
    const value = event.target.value;
    this.paciente.GradoInstruccion = value;
    console.log(value);
  }
  onparentescoSelected(event: any) {
    const value = event.target.value;
    this.paciente.ParentescoconResponsable = value;
    console.log(value);
  }
  // onTipoDocumentoumentoSelected(event: any) {
  //   const value = event.target.value;
  //   this.paciente.TipoDocumento = value;
  //   console.log(value);
  // }
  onestadocivilSelected(event: any) {
    const value = event.target.value;
    this.paciente.EstadoCivil = value;
    console.log(value);
  }
  // changeImg() {
  //   this.fileimagen.nativeElement.click();
  // }
  // // tslint:disable-next-line: typedef
  // changeImagen() {
  //   // this.showAvatarUpload = true;
  //   const files: {
  //     [key: string]: File
  //   } = this.fileimagen.nativeElement.files;
  //   console.log(files);
  //   // let progress = this.uploadService.upload(images);
  //   this.fotoService.uploadfoto(files[0], 'Foto').subscribe(
  //     (resimage) => {
  //       console.log(resimage);
  //       this.datosimagen = resimage;
  //       this.laurlimagen = this.datosimagen.data.url;
  //       console.log(this.laurlimagen);
  //       this.paciente.Foto = this.laurlimagen;
  //       this.cargoimagen = true;
  //     },
  //     console.error,
  //   );
  // }
  ngOnInit(): void {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    this.theuser = client;
    this.paciente.SedeId = this.theuser.SedeId;
    this.paciente.UsuarioId = this.theuser.id;
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-estudiante',
        'paciente'
      ]
    );
  }
  direccionar() {
    this.router.navigate(
      [
        'dashboard-estudiante',
        'anamnesis'
      ]
    );
  }
  savepaciente() {
    const fechanacimiento: any = this.paciente.FechaNacimiento;
    this.paciente.FechaNacimiento = new Date(fechanacimiento);
    console.log(this.paciente);
    this.pacienteService.savepaciente(this.paciente).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.paciente1 = ladata.data;
          this.toastr.info('Se creo un nuev@ paciente');
          this.direccionar();
          // this.auditoria.Interaccion = new Date();
          // this.auditoria.Registroid = this.paciente1.id;
          // this.auditoria.UsuarioId = 1;
          // this.auditoria.Detalle = JSON.stringify(this.paciente);
          // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
          //   ress => {
          //     this.auditoria1 = ress;
          //     this.toastr.info('Accion registrada');
          //     this.volver();
          //   }, err => {
          //     this.toastr.error('Error al registrar accion');
          //   }
          // );
        }
      }, err => {
        this.toastr.error('Error al crear paciente');
      }
    );
  }
}
