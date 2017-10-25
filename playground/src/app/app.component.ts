import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <top-navigation></top-navigation>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
