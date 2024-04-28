import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/empresa';
import { Auditoria } from '../../../../models/auditoria';
import { EmpresaService } from '../../../../services/empresa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-empresa-edit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './empresa-edit.component.html',
  styleUrl: './empresa-edit.component.css'
})
export default class EmpresaEditComponent implements OnInit {
  empresa: Empresa = {
    id: 0,
    Ruc: '',
    RazonSocial: '',
    Representante: ''
  }
  auditoria: Auditoria = {
    UsuarioId: 0,
    Registroid: 0,
    Accion: 'actualizacion',
    Tabla: 'empresa',
    Resumen: 'modificar datos de la empresa',
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
  idempresa: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private auditoriaService: AuditoriaService,
  ) {  }
  ngOnInit(): void {
    this.empresaService.getempresa(1).subscribe(
      res => {
        const ladata: any = res;
        this.empresa = ladata.data;
        this.auditoria.Interaccion = new Date();
        this.auditoria.Registroid = this.empresa.id;
        this.idempresa = this.empresa.id;
      },
      err => console.log(err)
    );
  }
  volver() {
    this.router.navigate(
      [
        'dashboard-principal',
        'empresa'
      ]
    );
  }
  updateempresa() {
    console.log(this.empresa);
    const parametro: any = this.idempresa;
    delete this.empresa.id;
    // llamando a servicio de actualizacion que esta enlazada con el api
    this.empresaService.updateempresa(parametro, this.empresa).subscribe(
      res => {
        this.mensaje = res;
        this.volver();
        this.toastr.success('Datos actualizados');
        // this.auditoria.Resumen = '';
        // this.auditoriaService.saveauditoria(this.auditoria).subscribe(
        //   ress => {
        //     this.auditoria1 = ress;
        //     this.toastr.info('Accion registrada');
        //   }, err => {
        //     this.toastr.error('no se pudo registrar la accion');
        //   }
        // );
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo actualizar la empresa');
      }
    );
  }
}
