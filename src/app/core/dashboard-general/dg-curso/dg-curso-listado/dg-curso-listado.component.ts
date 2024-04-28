import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CursoService } from '../../../../services/curso.service';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-curso-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-curso-listado.component.html',
  styleUrl: './dg-curso-listado.component.css'
})
export default class DgCursoListadoComponent implements OnInit {
  cursos: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cursoService: CursoService,
    private auditoriaService: AuditoriaService,
  ) {  }
  ngOnInit(): void {
    this.getcursos();
  }
  getcursos() {
    this.cursoService.getcursos().subscribe(
      res => {
        const ladata: any = res;
        this.cursos = ladata.data;
      },
      err => {
        this.toastr.error('Error al cargar los cursos');
      }
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'dashboard-principal',
        'curso',
        'creacion'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar curso');
    this.router.navigate(
      [
        'dashboard-principal',
        'curso',
        'modificacion',
        codigoaeditar
      ]
    );
  }
}
