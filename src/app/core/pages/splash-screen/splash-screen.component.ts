import { Component, ViewEncapsulation } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  standalone: true,
  imports: [ProgressBarModule],
  encapsulation: ViewEncapsulation.None
})
export class SplashScreenComponent {

}
