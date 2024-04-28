import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../../../models/estudiante';
import { Usuario } from '../../../../models/usuario';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-de-perfil-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './de-perfil-view.component.html',
  styleUrl: './de-perfil-view.component.css'
})
export default class DePerfilViewComponent implements OnInit {
  usuario: Usuario = {
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
  }
  estudiante: Estudiante = {
    id: 0,
    NombreCompleto: '',
    Firma: '',
    UsuarioId: 0
  }
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
  ) { }
  ngOnInit(): void {
    const token: any = localStorage.getItem('elusuario');
    const client: any = JSON.parse(token.toString());
    this.usuario = client;
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-estudiante'
      ]
    );
  }
  editar() {
    this.router.navigate(
      [
        'dashboard-estudiante',
        'perfil',
        'edit'
      ]
    );
  }
}
