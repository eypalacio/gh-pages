import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/routes';
import { TABVIEW } from 'src/app/core/constants/tabview';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  routes: any = ROUTES;
  activeRoute: string = ROUTES.CONTEOS;
  index: number = 0;

  constructor(private router: Router) {
    this.getActiveRoute();
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url.split('/').pop()!.toString()
      }
    })
  }

  getActiveRoute() {
    const route = this.router.url
    this.index = TABVIEW[route]
  }

  navegar(index: any) {
    this.router.navigate([TABVIEW[index.index]])
  }
}
