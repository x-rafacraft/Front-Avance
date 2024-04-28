import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auditoria } from '../../../../models/auditoria';
import { Paciente } from '../../../../models/paciente';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { FileService } from '../../../../services/foto.service';
import { PacienteService } from '../../../../services/paciente.service';

@Component({
  selector: 'app-dd-paciente-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-paciente-modificacion.component.html',
  styleUrl: './dd-paciente-modificacion.component.css'
})
export default class DdPacienteModificacionComponent implements OnInit {
  paciente: Paciente = {
    id: 0,
    FechaCreacion: new Date(),
    HoraCreacion: new Date(),
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
    Accion: 'actualizacion',
    Tabla: 'paciente',
    Resumen: 'modificar datos del paciente',
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
  mensaje: any;
  lafechadenacimiento: Date | undefined;
  nuevafechanacimiento: Date | undefined;
  stringfechanacimiento: any;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private fotoService: FileService,
    private activatedRoute: ActivatedRoute,
    private pacienteService: PacienteService,
    private auditoriaService: AuditoriaService,
  ) { }
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
  onestadocivilSelected(event: any) {
    const value = event.target.value;
    this.paciente.EstadoCivil = value;
    console.log(value);
  }
  cambio1(event:any) {
    console.log(event);
    this.paciente.FechaNacimiento = new Date(event);
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
    const params = this.activatedRoute.snapshot.params;
    const parametro = params['id'];
    if (parametro > 0) {
      this.pacienteService.getpaciente(parametro).subscribe(
        res => {
          const ladata: any = res;
          if (ladata.status === 'success') {
            this.paciente = ladata.data;
            console.log(this.paciente);
            const fecha1: any = this.paciente.FechaNacimiento;
            this.lafechadenacimiento = new Date(fecha1);
            this.stringfechanacimiento = this.pd.transform(this.lafechadenacimiento, 'yyyy-MM-dd');
          } else if (ladata.status === 'warning') {
            console.log(ladata.mesj);
          }
        },
        err => {
          this.toastr.error('Error al obtener datos');
        }
      );
    }
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-docente',
        'paciente'
      ]
    );
  }
  updatepaciente() {
    const fechanacimiento: any = this.paciente.FechaNacimiento;
    this.paciente.FechaNacimiento = new Date(fechanacimiento);
    const parametro: any = this.paciente.id;
    console.log(this.paciente);
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.pacienteService.updatepaciente(parametro, this.paciente).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.mensaje = ladata.data;
          this.toastr.success('Datos actualizados');
          // this.auditoria.Registroid = parametro;
          // this.auditoria.Interaccion = new Date();
          // this.auditoria.UsuarioId = 1;
          // this.auditoria.Resumen = '';
          // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
          //   ress => {
          //     this.auditoria1 = ress;
          //     this.toastr.info('Accion registrada');
          //     this.volver();
          //   }, err => {
          //     this.toastr.error('no se pudo registrar la accion');
          //   }
          // );
        }
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo usuario');
      }
    );
  }
}

