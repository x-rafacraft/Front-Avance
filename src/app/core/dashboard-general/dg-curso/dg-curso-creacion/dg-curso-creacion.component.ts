import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Curso } from '../../../../models/curso';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auditoria } from '../../../../models/auditoria';
import { CursoService } from '../../../../services/curso.service';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-dg-curso-creacion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dg-curso-creacion.component.html',
  styleUrl: './dg-curso-creacion.component.css'
})
export default class DgCursoCreacionComponent implements OnInit {
  curso: Curso = {
    Nombre: '',
    Semestre: '',
    Malla: ''
  }
  curso1: Curso = {
    id: 0,
    Nombre: '',
    Semestre: '',
    Malla: ''
  }
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'creacion',
    Tabla: 'curso',
    Resumen: 'crear nueva curso',
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
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cursoService: CursoService,
    private auditoriaService: AuditoriaService,
  ) {  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'curso'
      ]
    );
  }
  ngOnInit(): void {

  }
  savecurso() {
    this.cursoService.savecurso(this.curso).subscribe(
      res => {
        const ladata: any = res;
        this.curso1 = ladata.data;
        this.toastr.info('Se creo una nueva curso');
        this.volver();
        // this.auditoria.Interaccion = new Date();
        // this.auditoria.Registroid = this.curso1.id;
        // this.auditoria.UsuarioId = 1;
        // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
        //   ress => {
        //     this.auditoria1 = ress;
        //     this.toastr.info('Accion registrada');
        //   }, err => {
        //     this.toastr.error('Error al registrar accion');
        //   }
        // );
      }, err => {
        this.toastr.error('Error al crear curso');
      }
    );
  }
}
