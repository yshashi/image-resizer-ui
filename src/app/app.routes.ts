import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'resize',
    loadComponent: () =>
      import('./resize/resize.component').then((m) => m.ResizeComponent),
  },
];
