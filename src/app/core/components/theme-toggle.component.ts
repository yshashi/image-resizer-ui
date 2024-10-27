import { afterNextRender, Component, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  template: `
    <button
      (click)="toggleTheme()"
      class="p-2 rounded-lg text-gray-800 dark:text-white"
    >
      <span class="text-xl">{{ isLightMode() ? '🌞' : '🌙' }}</span>
    </button>
  `,
})
export class ThemeToggleComponent {
  isLightMode = signal(true);

  constructor() {
    afterNextRender(()=> {
      this.isLightMode.set(localStorage.getItem('lp_image_resizer_ui_theme') === 'dark');
    })
  }

  toggleTheme() {
    const theme = localStorage.getItem('lp_image_resizer_ui_theme');
    if (theme === 'dark') {
      this.isLightMode.set(false);
      localStorage.setItem('lp_image_resizer_ui_theme', 'light');
      document.documentElement.classList.remove('dark');
      console.log(this.isLightMode(), "Dark");
    } else {
      this.isLightMode.set(true);
      localStorage.setItem('lp_image_resizer_ui_theme', 'dark');
      document.documentElement.classList.add('dark');
      console.log(this.isLightMode(), "Light");
    }
  }
}
