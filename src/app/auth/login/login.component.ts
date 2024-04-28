import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auditoria } from '../../models/auditoria';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuditoriaService } from '../../services/auditoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  parametro = {
    usuario: '',
    contra: ''
  };
  theuser: Usuario = {
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
    Accion: 'lectura',
    Tabla: 'usuario',
    Resumen: 'login',
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
  type = 'password';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: UsuarioService,
    private auditoriaService: AuditoriaService,
  ) { }
  ngOnInit(): void {
  }
  togglePasswordType() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
  direccionamiento(rol: any) {
    if (rol === 'administrador' || rol === 'god') {
      this.router.navigate( [ 'dashboard-principal' ] );
    } else if (rol === 'docente') {
      this.router.navigate( [ 'dashboard-docente' ] );
    } else {
      this.router.navigate( [ 'dashboard-estudiante' ] );
    }
  }
  login() {
    console.log(this.parametro);
    const parametro1 = this.parametro.usuario;
    const parametro2 = this.parametro.contra;
    console.log(parametro1,parametro2);
    this.adminService.getlogin(parametro1, parametro2).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.theuser = ladata.data;
          console.log(res);
          console.log(this.theuser);
          const nombrecompleto = this.theuser.Nombre + ' ' + this.theuser.Apellido;
          this.toastr.success('Bienvenido ' + nombrecompleto);
          const derivar: any = this.theuser.Rol;
          this.direccionamiento(derivar);
          this.adminService.loggin(this.theuser);
          // this.auditoria.Registroid = this.theuser.id;
          // this.auditoria.UsuarioId = this.theuser.id;
          // this.auditoria.Interaccion = new Date();
          // this.auditoria.Detalle = JSON.stringify(this.theuser);
          // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
          //   resaudi => {
          //     this.auditoria1 = resaudi;
          //     this.toastr.info('Accion registrada');
          //   }, err => {
          //     this.toastr.error('No se pudo crear la accion');
          //   }
          // );
        } else if (ladata.status === 'warning') {
          this.toastr.warning(ladata.msj);
        }
        // } else {
        //   this.toastr.info('Usuario o Contrasenia no corresponde');
        // }
      }, err => {
        this.toastr.error('Error falla en el conector con el servidor');
        console.log(err);
      }
    );
  }
  logincel() {
    console.log(this.parametro);
    const parametro1 = this.parametro.usuario;
    const parametro2 = this.parametro.contra;
    this.adminService.getloginbycelu(parametro1, parametro2).subscribe(
      res => {
        const ladata: any = res;
        if (ladata.status === 'success') {
          this.theuser = ladata.data;
          const nombrecompleto = this.theuser.Nombre + ' ' + this.theuser.Apellido;
          this.toastr.success('Bienvenido ' + nombrecompleto);
          const derivar: any = this.theuser.Rol;
          this.direccionamiento(derivar);
          this.adminService.loggin(this.theuser);
          // this.auditoria.Registroid = this.theuser.id;
          // this.auditoria.UsuarioId = this.theuser.id;
          // this.auditoria.Interaccion = new Date();
          // this.auditoria.Detalle = JSON.stringify(this.theuser);
          // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
          //   resaudi => {
          //     this.auditoria1 = resaudi;
          //     this.toastr.info('Accion registrada');
          //   }, err => {
          //     this.toastr.error('No se pudo crear la accion');
          //   }
          // );
        } else if (ladata.status === 'warning') {
          this.toastr.warning(ladata.msj);
        }
      }, err => {
        this.toastr.error('Error falla en el conector con el servidor');
      }
    );
  }
  recover() {
    this.toastr.info(
      'Confirmar correo o celular para recuperar su Contraseña'
    );
    this.router.navigate(
      [
        'auth',
        'recover'
      ]
    );
  }
}
