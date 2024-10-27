import { Component } from '@angular/core';
import { ThemeToggleComponent } from './theme-toggle.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent, RouterLink],
  template: `
    <nav class="fixed w-full z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Social Media Resizer</h1>
          <div class="flex items-center space-x-4">
            <a routerLink="/resize" class="text-gray-600 cursor-pointer dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Try It
            </a>
            <app-theme-toggle></app-theme-toggle>
          </div>
        </div>
      </nav>
  `
})
export class HeaderComponent {}
