import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-dg-usuario-listado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-usuario-listado.component.html',
  styleUrl: './dg-usuario-listado.component.css'
})
export default class DgUsuarioListadoComponent implements OnInit {
  usuarios: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getusuarios();
  }

  // tslint:disable-next-line: typedef
  getusuarios() {
    this.usuarioService.getusuarios().subscribe(
      res => {
        const datos: any = res;
        this.usuarios = datos.data;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'usuario',
        'creacion'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar usuario');
    this.router.navigate(
      [
        'dashboard-principal',
        'usuario',
        'modificacion',
        codigoaeditar
      ]
    );
  }

}
