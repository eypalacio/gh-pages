import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MtSlbtrRoutingModule } from './mt-slbtr-routing.module';
import { Mt299Component } from './components/mt299/mt299.component';
import { Mt206Component } from './components/mt206/mt206.component';
import { MtContainerComponent } from './view/mt-container/mt-container.component';
import { TableComponent } from 'src/app/core/components/table/table.component';


@NgModule({
  declarations: [
    Mt299Component,
    Mt206Component,
    MtContainerComponent
  ],
  imports: [
    CommonModule,
    MtSlbtrRoutingModule,
    TableComponent
  ]
})
export class MtSlbtrModule { }
