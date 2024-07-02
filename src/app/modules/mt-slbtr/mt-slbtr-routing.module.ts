import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/routes';
import { MtContainerComponent } from './view/mt-container/mt-container.component';

const routes: Routes = [{path: ROUTES.EMPTY, component: MtContainerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MtSlbtrRoutingModule { }
