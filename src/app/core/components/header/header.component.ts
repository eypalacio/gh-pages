import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModel } from '../../interface/generic-button.model';
import { ButtonComponent } from '../button/button.component';
// import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
button: ButtonModel={
  buttons: [
    {
      function:()=>'',
      style:'btn-icon',
      icon: 'bi-bell-fill text-2xl'
    },   
    {
      function:()=>'',
      style:'btn-icon',
      icon: 'bi-moon-stars-fill text-2xl'
    },
  ]
}
}
