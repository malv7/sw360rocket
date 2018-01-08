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

@Component({
  selector: 'sw-action-buttons',
  template: `
  <div class="ui basic buttons" fxLayout="row" fxLayoutWrap>
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

  listType: string;
  listTypeSubscription: Subscription;
  elementsCountSub: Subscription;

  onOne: boolean = false;
  onMany: boolean = false;

  constructor(private store: Store<fromRoot.State>) {
    // retrieves and handles possible actions from selected elements state
    // store.select(fromRoot.selectSelectedListElements).subscribe(x => console.log(x));
    this.elementsCountSub = store.select(fromTable.selectSelectedListElementsCount).subscribe(elementsCount => {
      if(elementsCount === 0) {
        this.onOne = false;
        this.onMany = false;
      } else if (elementsCount === 1) {
        this.onOne = true;
        this.onMany = true;
      } else if (elementsCount > 1) {
        this.onOne = false;
        this.onMany = true;
      }
    });
  }

  ngOnInit() {
    this.listTypeSubscription = this.store.select(fromRoot.selectCurrentRouteData)
      .map(crd => crd.listType)
      .subscribe(listType => this.listType = listType);
  }

  ngOnDestroy(): void {
    if(this.listTypeSubscription) this.listTypeSubscription.unsubscribe();
    if(this.elementsCountSub) this.elementsCountSub.unsubscribe();
  }

  add() {
    console.log('--- list type in action buttons compnent add() ---')
    console.log(this.listType);
    switch (this.listType) {

      case 'projects': {
        // console.log("action buttons of type projects");
        break;
      }

      case 'components': {
        // console.log("action buttons of type components");
        this.store.dispatch(new RouterActions.Go({
          path: ['components/create']
        }));
        break;
      }

      case 'releases': {
        // TODO:
        // if in projects: select existing releases
        // if in components: create new release
        console.log("action list buttons add")
      }

      default: break;
    }
  }
  fossology() { }
  edit() { }

  remove() {
    // TODO: has a bug, that the selectSelectedList observable does not fire when this performed
    // anyway, the store gets mutated
    // Workarround: Select the list each time when an action should be performed and use take(1)
    // see selectListReducer
    // this.store.select(fromRoot.selectSelectedListElements).take(1).subscribe(x => console.log(x));
  }

  clone() {}

}
