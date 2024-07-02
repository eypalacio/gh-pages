import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairRoutingModule } from './repair-routing.module';
import { RepairComponent } from './components/repair/repair.component';
import { TableComponent } from 'src/app/core/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { SearchTablePipe } from 'src/app/core/pipes/search-table.pipe';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    RepairComponent
  ],
  imports: [
    CommonModule,
    RepairRoutingModule,
    TableComponent,
    FormsModule,
    InputTextModule
  ],
  providers: [
    SearchTablePipe
  ]
})
export class RepairModule { }
