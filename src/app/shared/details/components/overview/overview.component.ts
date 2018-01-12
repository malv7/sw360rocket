import { Component, OnInit } from '@angular/core';

// TODO: make this responsive not only for padding-left,
// but margin-bottom for each widget or overview placed inside
// other global styles for overview?
@Component({
  selector: 'sw-overview',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      padding-left: 1em;
    }
  `]
})
export class OverviewComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
