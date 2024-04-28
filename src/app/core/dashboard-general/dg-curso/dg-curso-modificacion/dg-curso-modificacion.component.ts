import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Curso } from '../../../../models/curso';
import { Component, OnInit } from '@angular/core';
import { Auditoria } from '../../../../models/auditoria';
import { CursoService } from '../../../../services/curso.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-curso-modificacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-curso-modificacion.component.html',
  styleUrl: './dg-curso-modificacion.component.css'
})
export default class DgCursoModificacionComponent implements OnInit {
  curso: Curso = {
    id: 0,
    Nombre: '',
    Semestre: '',
    Malla: ''
  }
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'actualizacion',
    Tabla: 'curso',
    Resumen: 'modificar datos del curso',
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
  mensaje: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute,
    private auditoriaService: AuditoriaService,
  ) { }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id'] !== null) {
      this.cursoService.getcurso(params['id']).subscribe(
        res => {
          const ladata: any = res;
          this.curso = ladata.data;
          console.log(this.curso);
        },
        err => {
          this.toastr.error('Error al obtener datos');
        }
      );
    }
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'curso'
      ]
    );
  }
  updatecurso() {
    const parametro: any = this.curso.id;
    delete this.curso.id;
    console.log(this.curso);
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.cursoService.updatecurso(parametro, this.curso).subscribe(
      res => {
        const ladata: any = res;
        this.mensaje = ladata.data;
        this.toastr.success('Datos actualizados');
        this.volver();
        // this.auditoria.Registroid = parametro;
        // this.auditoria.Interaccion = new Date();
        // this.auditoria.UsuarioId = 1;
        // this.auditoria.Resumen = '';
        // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
        //   ress => {
        //     this.auditoria1 = ress;
        //     this.toastr.info('Accion registrada');
        //     this.router.navigate(
        //       [
        //         'dashboard-principal',
        //         'curso'
        //       ]
        //     );
        //   }, err => {
        //     this.toastr.error('no se pudo registrar la accion');
        //   }
        // );
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo curso');
      }
    );
  }
}
