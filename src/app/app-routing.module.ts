import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './core/constants/routes';
import { DashboardComponent } from './modules/landing/dashboard/dashboard.component';
import { Error500Component } from './core/pages/error-500/error-500.component';

const routes: Routes = [
  {path: ROUTES.EMPTY, redirectTo: ROUTES.INICIO, pathMatch: 'full'},
  {path: ROUTES.NOT_FOUND, component: DashboardComponent},
  {
    path: ROUTES.INICIO, 
    loadChildren: () => import('./modules/landing/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {path: ROUTES.ERROR_500, component: Error500Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
