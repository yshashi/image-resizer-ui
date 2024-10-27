import { Component, signal } from '@angular/core';
import { features, moreFeatures } from '../../core/constants/features.constant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden py-20 hero-gradient">
      <div class="absolute inset-0 bg-grid-white/[0.1] bg-grid"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1
            class="text-5xl md:text-6xl font-bold text-white mb-6 animate-pulse-slow"
          >
            Transform Your Images
            <span class="block mt-2">for Every Platform</span>
          </h1>
          <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            One tool to resize and optimize your images for all social media
            platforms. Save time and ensure your content looks perfect
            everywhere.
          </p>
          <button
            routerLink="/resize"
            class="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started Free
          </button>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (feature of features(); track $index) {
          <div class="feature-card">
            <div class="text-3xl mb-4">{{ feature.icon }}</div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </div>
          }
        </div>
      </div>
    </section>
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Tool?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to perfect your social media presence
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (feature of moreFeatures(); track feature; let i = $index) {
          <div class="feature-card" [style.animation-delay]="i * 0.2 + 's'">
            <div class="flex items-center mb-4">
              <span class="text-3xl mr-3">{{ feature.icon }}</span>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ feature.title }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class LandingComponent {
  features = signal(features);
  moreFeatures = signal(moreFeatures);
}
