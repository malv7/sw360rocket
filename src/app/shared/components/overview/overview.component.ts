import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sw-overview',
  template: '<ng-content></ng-content>',
  styles: [`
    :host { padding-left: 1em; }
  `]
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
