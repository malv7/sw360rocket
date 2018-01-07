import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class FormValidationService {

  checkInvalidDirtyTouched(fieldInput: FormControl): boolean {
    if (fieldInput.invalid && (fieldInput.dirty || fieldInput.touched)) {
      return false;
    }
    else {
      return true;
    }

  }

  checkTouchedValid(fieldInput: AbstractControl, isValid: boolean) {
    if (!fieldInput.touched && !isValid) return true;
    if (fieldInput.touched && isValid)   return true;
    if (fieldInput.touched && !isValid)  return false;
  }

}