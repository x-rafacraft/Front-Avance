import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Docente } from '../../../../models/docente';
import { Usuario } from '../../../../models/usuario';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-dd-perfil-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-perfil-view.component.html',
  styleUrl: './dd-perfil-view.component.css'
})
export default class DdPerfilViewComponent implements OnInit {
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
  docente: Docente = {
    id: 0,
    NombreCompleto: '',
    Colegiatura: '',
    FirmaDigital: '',
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
        'dashboard-docente'
      ]
    );
  }
  editar() {
    this.router.navigate(
      [
        'dashboard-docente',
        'perfil',
        'edit'
      ]
    );
  }
}

