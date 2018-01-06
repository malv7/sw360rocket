import { Injectable } from '@angular/core';

@Injectable()
export class FormValidationService {

  checkInvalidDirtyTouched(fieldInput: any): boolean {
    if (fieldInput.invalid && (fieldInput.dirty || fieldInput.touched)) {
      return false;
    }
    else {
      return true;
    }

  }

  constructor() {  }

}