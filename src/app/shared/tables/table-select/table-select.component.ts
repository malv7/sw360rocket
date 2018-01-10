import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromRoot from './../../../reducers';
import * as fromTable from './../../state/table/table.reducer';
import { Store } from '@ngrx/store';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: '[sw-table-select]',
  template: '<input type="checkbox" [checked]="selected" (click)="select()">'
})

export class TableSelectComponent implements OnInit, OnDestroy {
	@Input() selected: boolean = false;
	@Output() selectEvent = new EventEmitter();

	areAllElementsSelectedSub: Subscription;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
		this.areAllElementsSelectedSub = this.store.select(fromTable.selectAreAllElementsSelected)
			.subscribe(areAllElementsSelected => this.selected = areAllElementsSelected ? true : false);
	}

	ngOnDestroy(): void {
		this.areAllElementsSelectedSub.unsubscribe();
	}

	select() {
		this.selected = !this.selected;
		this.selectEvent.emit(this.selected);
	}



}
