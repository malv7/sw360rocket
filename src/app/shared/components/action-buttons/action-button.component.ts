import { Component } from "@angular/core";

@Component({
  selector: 'sw-action-button',
  template: `
    <button class="ui button basic" [ngStyle]="{
      'margin-left': '0.5em'
    }">
      <i [ngClass]="classes"></i>
      <span>Random</span>
    </button>
  `
})
export class ActionButtonComponent {
  classes: string[] = ["icon", "add"];
}