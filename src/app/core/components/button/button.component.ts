import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ButtonModel } from '../../interface/generic-button.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() button!: ButtonModel;
  @Input() value?: any;

  click(fun: Function){
    fun();
  }
  disabledButton(fun?: Function) {
    if (fun) return fun(this.value);
    else return false;
  }

  loadingButton(fun?: Function) {
    if (fun) return fun();
    else return false;
  }
}
