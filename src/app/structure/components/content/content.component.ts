import { Component } from '@angular/core';

@Component({
  selector: 'sw-content',
  template: '<router-outlet></router-outlet>',
  styles: [`
    :host { display: block; }
  `]
})
export class ContentComponent { }
