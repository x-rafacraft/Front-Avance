import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-de-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './de-navbar.component.html',
  styleUrl: './de-navbar.component.css'
})
export class DeNavbarComponent {

}
