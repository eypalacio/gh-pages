import { Component } from '@angular/core';
import { ButtonModel } from '../../interface/generic-button.model';
import { Location } from '@angular/common';
import { ERROR_IMG } from '../../constants/error-img';

@Component({
  selector: 'app-error-500',
  templateUrl: './error-500.component.html',
  styleUrls: ['./error-500.component.scss'],
})
export class Error500Component {
  interval: any;
  counter: number = 15;
  urlIMG: string = '';
  button: ButtonModel = {
    buttons: [
      {
        label: 'Volver a intentar',
        style: 'btn-primary',
        function: () =>{
          clearInterval(this.interval)
          this.location.back()
        } 
      }
    ],
  }

  constructor(private location: Location){
    this.urlIMG = ERROR_IMG[Math.floor(Math.random()*3)];
    setTimeout(()=>{
      this.location.back()
    }, this.counter*1000)
    this.interval = setInterval(()=>{
      if(this.counter > 0) {this.counter--}
      else {
        clearInterval(this.interval)
      }
    }, 1000)
  }

}
