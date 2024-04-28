import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
  export default class AuthComponent implements OnInit {
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
    constructor(
      private router: Router,
      private toastr: ToastrService,
      private usuarioService: UsuarioService,
    ) {}

    ngOnInit(): void {
      // if (this.usuarioService.isLoggedIn()) {
      //   const token: any = localStorage.getItem('elusuario');
      //   const client: any = JSON.parse(token.toString());
      //   this.theuser = client;
      //   console.log('Existe un usuario logueado');
      //   const parametro = this.theuser.Rol;
      //   this.toastr.info('Redireccionando segun Rol');
      //   if (parametro === 'administrador' || parametro === 'god') {
      //     this.router.navigate( [ 'dashboard-principal' ] );
      //   } else if (parametro === 'docente') {
      //     this.router.navigate( [ 'dashboard-docente' ] );
      //   } else {
      //     this.router.navigate( [ 'dashboard-estudiante' ] );
      //   }
      // }
    }
  }
