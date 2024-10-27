import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup' // to be added
import { NgxSpinnerModule } from "ngx-spinner";
import { LandingComponent } from './pages/landing/landing.component';
import { HeaderComponent } from './core/components/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, NgToastModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'image-resizer-ui';
}
