import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/routes';
import { RepairComponent } from './components/repair/repair.component';

const routes: Routes = [{path: ROUTES.EMPTY, component: RepairComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule { }
