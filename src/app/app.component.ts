import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { addNotification } from './share/state/actions/notifications.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'monitoreo-app';
  loading: boolean = true;

  constructor(private store: Store) {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }


}
