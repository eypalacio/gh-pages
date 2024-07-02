import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModel } from '../../interface/generic-modal.model';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [CommonModule, ImageModule],
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent {
 @Input() modal!: ModalModel;
 

  
}
