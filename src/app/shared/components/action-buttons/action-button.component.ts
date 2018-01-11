import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import * as fromTable from './../../state/table/table.reducer';
import { Subscription } from "rxjs/Subscription";

// TODO: Check [ngStyle] settings and fix margin of sw-action-buttons in a group
@Component({
  selector: 'sw-action-button',
  template: `
    <button class="ui button basic" (click)="invokeCallback()" *ngIf="active"
      [ngStyle]="{
        'background': 'red',
        'margin': '0'
      }">
      <ng-content></ng-content>
    </button>
  `
})
export class ActionButtonComponent implements OnInit, OnDestroy {
  
  active: boolean = false;

  @Input() zero: boolean = false;
  @Input() one: boolean = false;
  @Input() many: boolean = false;
  @Input() callback: Function;

  selectedElementsCountSub: Subscription;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.selectedElementsCountSub =
      this.store.select(fromTable.selectSelectedListElementsCount).subscribe(elementsCount => {
        if (elementsCount === 0)
          this.active = this.zero ? true : false;
        else if (elementsCount === 1)
          this.active = (this.one || this.many) ? true : false;
        else if (elementsCount > 1)
          this.active = this.many ? true : false;
      });
  }

  ngOnDestroy(): void {
    if (this.selectedElementsCountSub)
      this.selectedElementsCountSub.unsubscribe();
  }

  invokeCallback() {
    // only if set
    if (this.callback) this.callback();
  }
}
