import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auditoria } from '../../models/auditoria';
import { UsuarioRecover, Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuditoriaService } from '../../services/auditoria.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export default class PasswordComponent implements OnInit {
  parametro = {
    contra1: '',
    contra2: ''
  };
  recover: UsuarioRecover = {
    ContraseniaAnterior: '',
  ContraseniaActual: ''
  }
  usuario: Usuario = {
    id: 0,
    Nombre: '',
    Apellido: '',
    Celular: '',
    Correo: '',
    NumDoc: '',
    Codigo: '',
    Contra: '',
    Foto: '',
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
    Resumen: 'actualizando contraseña al usuario',
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
  dato = '';
  baderita = false;
  respuesta: any = [];
  type1 = 'password';
  type2 = 'password';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private auditoriaService: AuditoriaService,
  ) { }
  togglePasswordType1() {
    this.type1 = this.type1 === 'password' ? 'text' : 'password';
  }
  togglePasswordType2() {
    this.type2 = this.type2 === 'password' ? 'text' : 'password';
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.usuarioService.getusuario(params['id']).subscribe(
        res => {
          console.log(res);
          const ladata:any = res;
          this.usuario = ladata.data;
        },
        err => console.log(err)
      );
    }
  }
  siguiente() {
    this.router.navigate(
      [
        'auth',
        'login'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  comprobarcodigo(par:any) {
    const parametro = this.usuario.Codigo;
    if (this.usuario.RestablecerContra === 'activado') {
      if (parametro === par) {
        this.baderita = true;
        this.toastr.info('Proceda a cambiar su contra');
      } else {
        this.toastr.error('Codigo no encontrado');
      }
    } else {
      this.toastr.error('Cambio de contrasenia desactivado');
    }
  }
  // tslint:disable-next-line: typedef
  actualizar() {
    const params = this.activatedRoute.snapshot.params;
    const codigo = params['id'];
    if (this.parametro.contra1 !== '' && this.parametro.contra2 !== '') {
      console.log('Las contras no estan vacias');
      if (this.parametro.contra1 === this.parametro.contra2) {
        console.log('Las contras son iguales');
        this.usuario.Codigo = '999999999';
        this.usuario.Contra = this.parametro.contra1;
        this.usuario.RestablecerContra = 'desactivado';
        console.log(this.usuario);
        this.recover.ContraseniaAnterior = this.usuario.Contra;
        this.recover.ContraseniaActual = this.parametro.contra1;
        this.usuarioService.updateusuariocontra(codigo, this.usuario).subscribe(
          respass => {
            const ladata: any = respass;
            if (ladata.status === 'success') {
              this.respuesta = ladata.data;
              this.toastr.success('Contraseña actualizada');
              this.siguiente();
            }
          }, err => {
            console.log(err);
            this.toastr.error('No se pudo actualizar');
          }
        );
      } else {
        this.toastr.error('la repeticion de la contraseña es diferente');
      }
    } else {
      this.toastr.error('Por favor rellenar los campos iguales');
    }
  }
}
