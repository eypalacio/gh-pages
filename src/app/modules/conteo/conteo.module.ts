import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConteoRoutingModule } from './conteo-routing.module';
import { Conteot24Component } from './components/conteot24/conteot24.component';
import { ConteoSlbtrComponent } from './components/conteo-slbtr/conteo-slbtr.component';
import { ConteoContainerComponent } from './view/conteo-container/conteo-container.component';
import { TableComponent } from 'src/app/core/components/table/table.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@NgModule({
  declarations: [
    Conteot24Component,
    ConteoSlbtrComponent,
    ConteoContainerComponent
  ],
  imports: [
    CommonModule,
    ConteoRoutingModule,
    TableComponent,
    DropdownModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  
})
export class ConteoModule { }
