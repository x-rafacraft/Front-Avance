import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from '../../../../models/empresa';
import { AuditoriaService } from '../../../../services/auditoria.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { Administrador } from '../../../../models/administrador';
import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-dg-perfil-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-perfil-view.component.html',
  styleUrl: './dg-perfil-view.component.css'
})
export default class DgPerfilViewComponent implements OnInit {
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
    Pago: '',
    Activo: false,
    Genero: '',
    TipoDocumento: '',
    RestablecerContra: '',
    Rol: '',
    SedeId: 0,
  }
  administrador: Administrador = {
    id: 0,
    NombreCompleto: '',
    CodigoAcceso: '',
    UsuarioId: 0
  }
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    // const token: any = localStorage.getItem('elusuario');
    // const client: any = JSON.parse(token.toString());
    // this.usuario = client;
    // this.toastr.info('Mi informacion');
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal'
      ]
    );
  }
  editar() {
    this.router.navigate(
      [
        'dashboard-principal',
        'perfil',
        'edit'
      ]
    );
  }
}
