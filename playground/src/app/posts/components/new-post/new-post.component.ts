import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.createForm();    
  }

  createForm() {
    this.form = new FormGroup({
      'firstName': new FormControl('', [ Validators.required, Validators.minLength(3) ]),
      'lastName' : new FormControl('', [ Validators.required ]),
      'regexp'   : new FormControl(''/*, [ Validators.pattern('a') ] */)
    });
  }

  submit(): void {
    this.form.valid ? console.log(this.form.value.firstName) : console.log("invalid!");
  }

}