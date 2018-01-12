import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import { Observable } from "rxjs/Observable";
import * as RouterActions from './../../../router/state/router.actions';
import * as fromTable from './../../state/table/table.reducer';
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import 'rxjs/add/operator/take';

export enum ListTypes {
  releases = 'releases',
  components = 'components',
  attachments = 'attachments',
  projects = 'projects',
  licenses = 'licenses',
  users = 'users'
}

export interface ActionFunction {
  (): any;
}

@Component({
  selector: 'sw-action-buttons',
  template: `
  <div class="ui" fxLayout="row" fxLayoutWrap>
    <button class="ui button remove" *ngIf="hasRemove && onMany" (click)="remove()">
      <i class="icon trash"></i>
      Remove
    </button>

    <button class="ui button fossology" *ngIf="hasFossology && onMany" (click)="fossology()">
      <i class="icon protect"></i>
      Fossology
    </button>

    <button class="ui button clone" *ngIf="hasClone && onOne" (click)="clone()">
      <i class="icon clone"></i>
      Clone
    </button>

    <button class="ui button edit" *ngIf="hasEdit && onOne" (click)="edit()">
      <i class="icon edit"></i>
      Edit
    </button>

    <button class="ui button add" *ngIf="hasAdd && !onOne && !onMany" (click)="add()">
      <i class="icon add"></i>
      Add
    </button>

    <ng-content></ng-content>

  </div>
  `,
  styles: [`
    .add { }
    .remove { }
    .edit { }
    .fossology { }
    .clone { }
  `]
})
export class ActionButtonsComponent implements OnInit, OnDestroy {

  @Input() hasAdd: boolean;
  @Input() hasEdit: boolean;
  @Input() hasRemove: boolean;
  @Input() hasFossology: boolean;
  @Input() hasClone: boolean;

  @Input() addAction: any;

  listType: string;
  listTypeSubscription: Subscription;
  elementsCountSub: Subscription;

  onZero: boolean = false;
  onOne: boolean = false;
  onMany: boolean = false;

  constructor(private store: Store<fromRoot.State>) {
    this.elementsCountSub = store.select(fromTable.selectSelectedListElementsCount).subscribe(elementsCount => {
      if(elementsCount === 0) {
        this.onZero = true;
        this.onOne = false;
        this.onMany = false;
      } else if (elementsCount === 1) {
        this.onZero = false;
        this.onOne = true;
        this.onMany = true;
      } else if (elementsCount > 1) {
        this.onOne = false;
        this.onMany = true;
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if(this.elementsCountSub) this.elementsCountSub.unsubscribe();
  }

  add() {
    // this.addAction();
    console.log(this.addAction);
  }

  fossology() { }
  edit() { }
  remove() {}
  clone() {}

}

