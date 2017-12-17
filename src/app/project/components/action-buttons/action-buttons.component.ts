import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'sw-action-buttons',
  template: `
  <div class="ui basic buttons">
    <button class="ui button fossology" *ngIf="hasFossology" (click)="fossology()"><i class="icon add"></i>Fosssology</button>
    <button class="ui button edit" *ngIf="hasEdit" (click)="edit()"><i class="icon add"></i>Edit</button>
    <button class="ui button remove" *ngIf="hasRemove" (click)="remove()"><i class="icon add"></i>Remove</button>
    <button class="ui button add" *ngIf="hasAdd" (click)="add()"><i class="icon add"></i>Add</button>
  </div>
  `,
  styles: [`
    .add {
      color: green;
    }

    .remove {
    }

    .edit {
    }

    .fossology {
    }
  `]
})
export class ActionButtonsComponent implements OnInit {
  
  @Input() hasAdd: boolean;
  @Input() hasEdit: boolean;
  @Input() hasRemove: boolean;
  @Input() hasFossology: boolean;

  constructor() {
    // retrieves and handles possible actions from selected elements state
  }

  ngOnInit() {
    
    
  }

  add() {
    
  }

  fossology() { }

  edit() {

  }

  remove() {

  }

}