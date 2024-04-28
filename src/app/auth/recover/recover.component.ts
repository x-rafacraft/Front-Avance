import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auditoria } from '../../models/auditoria';
import { Router, RouterModule } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { UsuarioService } from '../../services/usuario.service';
import { AuditoriaService } from '../../services/auditoria.service';
import { SendgmailService } from '../../services/sendgmail.service';
import { SendwhatsappService } from '../../services/sendwhatsap.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export default class RecoverComponent implements OnInit {
  admin: Usuario = {
    id: 0,
    Nombre: '',
    Apellido: '',
    Celular: '',
    Correo: '',
    NumDoc: '',
    Contra: '',
    Foto: '',
    Pago: '',
    Codigo: '',
    Activo: false,
    Genero: '',
    TipoDocumento: '',
    RestablecerContra: '',
    Rol: '',
    SedeId: 0,
  };
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'actualizar',
    Tabla: 'usuario',
    Resumen: 'envio del codigo',
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
  elmensajewasap = {
    celular: '',
    codigo: '',
    empresa: 'Universidad Continental',
    sistema: 'Muelitas Felices',
    url: ''
  }
  elmensajegmail: any = {
    correo: '',
    codigo: '',
    empresa: 'Universidad Continental',
    sistema: 'Muelitas Felices',
    url: ''
  }
  respuestita: any = [];
  codigo: any;
  respuesta: any = [];
  dato: any;
  caracteres = 'Aa0BbCc1DdEe2FfGgHh3IiJj4KkLl5MmNn6OoPp7QqRr8SsTt9UuVv*WwXxYyZz$';
  laclave: any;
  long = 10;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private adminService: UsuarioService,
    private gmailService: SendgmailService,
    private auditoriaService: AuditoriaService,
    private whatsappService: SendwhatsappService,
  ) { }
  generaryenviar(par: any) {
    this.laclave = this.globalService.generateRandomCode(10);
    console.log(this.laclave);
    this.admin.Codigo = this.laclave;
    this.elmensajegmail.codigo = this.laclave;
    this.elmensajewasap.codigo = this.laclave;
    this.admin.RestablecerContra = 'activado';
    this.adminService.updateusuario(par, this.admin).subscribe(
      res => {
        this.respuestita = res;
        console.log('Se activo el usuario para recuperar contra');
        this.toastr.info('se genero el codigo');
      }, err => {
        this.toastr.error('Error al generar el codigo');
      }
    );
  }

  sendwhatsapp() {
    this.whatsappService.getsendwhatsappcode(
      this.elmensajewasap.celular,
      this.elmensajewasap.codigo,
      this.elmensajewasap.empresa,
      this.elmensajewasap.sistema,
      this.elmensajewasap.url,
    ).subscribe(
      res => {
        this.respuesta = res;
        this.toastr.info('Revisa tu whatsapp');
        this.siguiente();
      }, err => {
        console.log(err);
        this.toastr.error(
          'Error al enviar el mensaje de whatsapp'
        );
      }
    );
  }

  async sendemailgmail() {
    this.gmailService.getsendgmailcode(
      this.elmensajegmail.correo,
      this.elmensajegmail.codigo,
      this.elmensajegmail.empresa,
      this.elmensajegmail.sistema,
      this.elmensajegmail.url
    ).subscribe(
      res => {
        this.respuesta = res;
        this.toastr.info('Revisa tu correo');
        this.siguiente();
      }, err => {
        console.log(err);
        this.toastr.error(
          'Error al enviar el correo'
        );
      }
    );
  }
  siguiente() {
    this.router.navigate(
      [
        'auth',
        'password',
        this.codigo
      ]
    );
  }

  // tslint:disable-next-line: typedef
  async enviarcorreo(parametro: any) {
    this.adminService.getSearchEmail(parametro).subscribe(
      res => {
        if (res) {
          console.log(res);
          const ladata:any = res;
          this.admin = ladata.data;
          this.codigo = this.admin.id;
          const codigo = this.codigo.toString();
          this.generaryenviar(codigo);
          this.elmensajegmail.url = 'http:--localhost:4200-auth-password-' + this.codigo;
          this.elmensajegmail.correo = this.admin.Correo;
          this.sendemailgmail();
        } else {
          this.toastr.error('Correo no es de la empresa');
        }
      },
      err => {
        this.toastr.error('Usted no es un trabajador de la empresa');
        console.log(err);
      }
    );
  }
  async enviarmensaje(parametro: any) {
    this.adminService.getSearchPhone(parametro).subscribe(
      res => {
        if (res) {
          console.log(res);
          const ladata:any = res;
          this.admin = ladata.data;
          console.log(this.admin);
          this.codigo = this.admin.id;
          const codigo = this.codigo.toString();
          this.generaryenviar(codigo);
          const celu: any = this.admin.Celular;
          this.elmensajewasap.celular = celu;
          this.elmensajewasap.url = 'http:--localhost:4200-auth-password-' + this.codigo;
          this.sendwhatsapp();
        } else {
          this.toastr.error('Celular no es de la empresa');
        }
      },
      err => {
        this.toastr.error('Usted no es un trabajador de la empresa');
        console.log(err);
      }
    );
  }
  regresar() {
    this.router.navigate(
      [
        'auth'
      ]
    );
  }
  ngOnInit(): void {
    const wasa = this.globalService.generateRandomCode(10);
    // this.codigo = wasa;
  }
}
