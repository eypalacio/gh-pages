import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/routes';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: ROUTES.EMPTY, component: DashboardComponent,
    children: [
      {
        path: ROUTES.EMPTY, redirectTo: ROUTES.CONTEOS, pathMatch: 'full'
      },
      {
        path: ROUTES.CONTEOS, loadChildren: () => import('../../conteo/conteo.module').then((m) => m.ConteoModule)
      },
      {
        path: ROUTES.REPAIR, loadChildren: () => import('../../repair/repair.module').then((m) => m.RepairModule)
      },
      {
        path: ROUTES.MTSLBTR, loadChildren: () => import('../../mt-slbtr/mt-slbtr.module').then((m) => m.MtSlbtrModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
