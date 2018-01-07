import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "events";
import { FormValidationService } from "../../../../component/components/component-create/form-validation.service";

@Component({
  selector: 'generic-form-element',
  template: `
  <div [ngStyle]="{ 'width': width, 'margin-bottom': marginBottom }">
    <div fxLayout="row" fxLayoutAlign="space-between start" class="label-wrapper">
      <div class="label">{{ label }}<span class="required" *ngIf="required">&nbsp;*</span></div>
      <div class="required" *ngIf="isError">{{ errorText }}</div>
    </div>
    <ng-content></ng-content>
  </div>
  `,
  styles: [`
    .label-wrapper { margin-bottom: 0.3em; }
    .label { font-weight: bold; }
    .required { color: red; }
  `]
})
export class GenericFormElementComponent {
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() errorText: string;
  @Input() isError: boolean = false;
  @Input() width = '20em';
  // change form-group class in styles/objects/forms accordingly
  @Input() marginBottom = '1.5em';
}