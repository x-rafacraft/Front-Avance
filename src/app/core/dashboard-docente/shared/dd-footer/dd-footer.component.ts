import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dd-footer',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './dd-footer.component.html',
  styleUrl: './dd-footer.component.css'
})
export class DdFooterComponent {

}
