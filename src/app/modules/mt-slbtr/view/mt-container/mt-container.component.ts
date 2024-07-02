import { Component } from '@angular/core';

@Component({
  selector: 'app-mt-container',
  templateUrl: './mt-container.component.html',
  styleUrls: ['./mt-container.component.scss']
})
export class MtContainerComponent {
  execETL: boolean = false;
  executedETL(){
    this.execETL = !this.execETL
  }

}
