import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup' // to be added
import { NgxSpinnerModule } from "ngx-spinner";
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LandingComponent, NgToastModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'image-resizer-ui';
}
