import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, HostBinding } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from './../../../../state';
import * as fromTable from './../../../tables/state/table.reducer';
import { Subscription } from "rxjs/Subscription";

// TODO: Check [ngStyle] settings and fix margin of sw-action-buttons in a group
@Component({
  selector: 'sw-action-button',
	template: `
    <button class="ui button basic" (click)="invokeCallback()">
      <ng-content></ng-content>
		</button>
	`,
	styles: []
})
export class ActionButtonComponent implements OnInit, OnDestroy {

	@HostBinding("style.display") display = "none";

  @Input() zero: boolean = false;
  @Input() one: boolean = false;
  @Input() many: boolean = false;
	@Input() callback: Function;

  selectedElementsCountSub: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.selectedElementsCountSub =
      this.store.select(fromTable.selectSelectedListElementsCount).subscribe(elementsCount => {
        if (elementsCount === 0)
          this.setHostDisplay(this.zero ? true : false);
        else if (elementsCount === 1)
					this.setHostDisplay((this.one || this.many) ? true : false);
        else if (elementsCount > 1)
					this.setHostDisplay(this.many ? true : false);
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

	setHostDisplay(active: boolean) {
		this.display = active ? "inline" : "none";
	}
}
