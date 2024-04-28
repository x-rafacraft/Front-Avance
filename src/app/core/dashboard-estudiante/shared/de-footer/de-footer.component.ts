import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-de-footer',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './de-footer.component.html',
  styleUrl: './de-footer.component.css'
})
export class DeFooterComponent {

}
