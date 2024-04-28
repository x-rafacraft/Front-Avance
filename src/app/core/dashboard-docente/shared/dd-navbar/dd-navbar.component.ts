import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dd-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './dd-navbar.component.html',
  styleUrl: './dd-navbar.component.css'
})
export class DdNavbarComponent {

}
