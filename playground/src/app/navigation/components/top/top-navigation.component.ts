import { Component } from '@angular/core';

@Component({
  selector: 'top-navigation',
  template: `
    <!-- top navigation -->
    <div class="top-navigation">
      <button class="ui basic button" routerLinkActive="primary" routerLink="/posts"   >Posts</button>
      <button class="ui basic button" routerLinkActive="primary" routerLink="/semantic">Semantic</button>
      <button class="ui basic button" routerLinkActive="primary" routerLink="/rxjs"    >rxjs</button>
    </div>
  `,
  styles: [` .top-navigation { margin-bottom: 2em; } `]
})
export class TopNavigationComponent { }