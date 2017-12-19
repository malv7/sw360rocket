import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import { Observable } from "rxjs/Observable";
import * as RouterActions from './../../../router/state/router.actions';
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import 'rxjs/add/operator/take';

@Component({
  selector: 'sw-action-buttons',
  template: `
  <div class="ui basic buttons">
    <button class="ui button fossology" *ngIf="hasFossology" (click)="fossology()"><i class="icon add"></i>Fosssology</button>
    <button class="ui button edit" *ngIf="hasEdit" (click)="edit()"><i class="icon add"></i>Edit</button>
    <button class="ui button remove" *ngIf="hasRemove" (click)="remove()"><i class="icon add"></i>Remove</button>

    <button class="ui button add" *ngIf="hasAdd" (click)="add()">
      <i class="icon add"></i>Add
    </button>
  </div>
  `,
  styles: [`
    .add {
      color: green;
    }
    .remove { }
    .edit { }
    .fossology { }
  `]
})
export class ActionButtonsComponent implements OnInit, OnDestroy {
  
  @Input() hasAdd: boolean;
  @Input() hasEdit: boolean;
  @Input() hasRemove: boolean;
  @Input() hasFossology: boolean;
  
  listType: string;
  listTypeSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>) {
    // retrieves and handles possible actions from selected elements state
    // store.select(fromRoot.selectSelectedListElements).subscribe(x => console.log(x));
  }
  
  ngOnInit() {
    this.listTypeSubscription = this.store.select(fromRoot.selectCurrentRouteData)
      .map(crd => crd.listType)
      .subscribe(listType => this.listType = listType);

    // console.log("sub");
  }
  
  ngOnDestroy(): void {
    if(this.listTypeSubscription) this.listTypeSubscription.unsubscribe();
    // console.log("unsub");
  }

  add() {
    switch (this.listType) {
      
      case 'projects': {
        // console.log("action buttons of type projects");
        break;
      }

      case 'components': {
        // console.log("action buttons of type components");
        this.store.dispatch(new RouterActions.Go({
          path: ['components/add']
        }));
        break;
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

}