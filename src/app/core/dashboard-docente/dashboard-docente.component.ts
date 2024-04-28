import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DdFooterComponent } from './shared/dd-footer/dd-footer.component';
import { DdNavbarComponent } from './shared/dd-navbar/dd-navbar.component';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard-docente',
  standalone: true,
  imports: [
    RouterModule,
    DdFooterComponent,
    DdNavbarComponent
  ],
  templateUrl: './dashboard-docente.component.html',
  styleUrl: './dashboard-docente.component.css'
})
export default class DashboardDocenteComponent implements OnInit {
  theuser: Usuario = {
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
  };
  primeraruta: any = '';
  segundaruta: any = '';
  nombrecompeto: any = '';
  data = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
  ) {}
  loggout() {
    this.usuarioService.loggout();
    this.sacarlo();
  }
  sacarlo() {
    this.toastr.info('Redireccionandolo al Login');
    this.router.navigate(
      [
        'auth'
      ]
    );
  }
  ngOnInit() {
    this.primeraruta = this.router.url.split('/')[2];
    this.segundaruta = this.router.url.split('/')[3];
    console.log(this.primeraruta, this.segundaruta);
    // if (this.usuarioService.isLoggedIn()) {
    //   const token: any = localStorage.getItem('elusuario');
    //   const client: any = JSON.parse(token.toString());
    //   this.theuser = client;
    //   let parametro = this.theuser.Rol;
    //   this.nombrecompeto = this.theuser.Nombre + ' ' + this.theuser.Apellido;
    //   const nombrecompletoxd = this.theuser.Nombre + ' ' + this.theuser.Apellido;
    //   if (parametro === 'administrador' || parametro === 'god') {
    //     console.log(nombrecompletoxd);
    //     // this.toastr.success('Bienvenido ' + nombrecompletoxd.toString());
    //   } else {
    //     this.sacarlo();
    //   }
    // } else {
    //   this.toastr.warning('Usted no es admnistrador');
    //     this.toastr.info('Usted debe ser administrador para poder acceder');
    //     this.toastr.info('Redireccionandolo al Login');
    //     this.sacarlo();
    // }
  }
}
