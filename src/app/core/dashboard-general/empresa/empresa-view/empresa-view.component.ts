import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/empresa';
import { EmpresaService } from '../../../../services/empresa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuditoriaService } from '../../../../services/auditoria.service';

@Component({
  selector: 'app-empresa-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './empresa-view.component.html',
  styleUrl: './empresa-view.component.css'
})
export default class EmpresaViewComponent implements OnInit {
  empresa: Empresa = {
    id: 0,
    Ruc: '',
    RazonSocial: '',
    Representante: ''
  }
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private auditoriaService: AuditoriaService,
  ) {  }
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
        'empresa',
        'edit'
      ]
    );
  }
  ngOnInit(): void {
    this.empresaService.getempresa(1).subscribe(
      res => {
        const ladata: any = res;
        this.empresa = ladata.data;
      },
      err => console.log(err)
    );
  }
}
