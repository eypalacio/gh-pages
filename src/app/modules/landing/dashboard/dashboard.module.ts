import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { DashboardComponent } from './dashboard.component';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { TableComponent } from 'src/app/core/components/table/table.component';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    TableComponent,
    TabViewModule,
  ]
})
export class DashboardModule { 
  
}
