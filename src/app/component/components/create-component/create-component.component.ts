import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sw-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss']
})
export class CreateComponentComponent implements OnInit {

  projectForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.projectForm = new FormGroup({
      'name': new FormControl('name', Validators.required),
      'categorie': new FormControl('categorie', Validators.required),
    });

    this.projectForm.get('name').valueChanges.subscribe(x => console.log(x));
  }

  get name() { return this.projectForm.get('name'); }
  get categorie() { return this.projectForm.get('categorie'); }
  
}
