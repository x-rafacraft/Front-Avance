import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dd-integrante-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dd-integrante-listado.component.html',
  styleUrl: './dd-integrante-listado.component.css'
})
export default class DdIntegranteListadoComponent {

}
