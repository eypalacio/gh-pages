import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/routes';
import { ConteoContainerComponent } from './view/conteo-container/conteo-container.component';

const routes: Routes = [
  {path: ROUTES.EMPTY, component: ConteoContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConteoRoutingModule { }
