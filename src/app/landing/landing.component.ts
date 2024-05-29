import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  #router = inject(Router);
  #viewPortScroller = inject(ViewportScroller);

  ngOnInit() {
    this.#router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = this.#router.parseUrl(this.#router.url).fragment;
        if (fragment) {
          this.#viewPortScroller.scrollToAnchor(fragment);
        }
      }
    });
  }
}
