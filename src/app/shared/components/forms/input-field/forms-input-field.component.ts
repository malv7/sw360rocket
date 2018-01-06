import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "events";
import { FormValidationService } from "../../../../component/components/component-create/form-validation.service";

@Component({
  selector: 'forms-input-field',
  template: `
    <div class="field text-input required">
      <label>{{ name }}</label>
      <div>
        <input type="text" [placeholder]="placeholder"> <!-- formControlName="name" -->
      </div>
      <!-- error -->
      <div class="ui form error hidden" [ngClass]="{ 'visible': !formValidationService.checkInvalidDirtyTouched(name) }"> <!--  -->
        <div class="ui error message errorMessageSpace">
          {{ errorText }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .errorMessageSpace { padding-top: 0.2em; padding-bottom: 0.2em; }
  `]
})
export class FormsInputField {
  @Input() name: string;
  @Input() placeholder: string;
  @Input() errorText: string;

  @Input() required: boolean;

  @Output() text = new EventEmitter();

  constructor(public formValidationService: FormValidationService) {
    // text.emit();
  }
}