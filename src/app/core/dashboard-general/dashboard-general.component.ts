import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-general',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './dashboard-general.component.html',
  styleUrl: './dashboard-general.component.css'
})
export default class DashboardGeneralComponent implements OnInit {
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
