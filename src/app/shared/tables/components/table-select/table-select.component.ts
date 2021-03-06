import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from'./../../../../state';
import * as fromTable from './../../../tables/state/table.reducer';
import { Store } from '@ngrx/store';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: '[sw-table-select]',
	template: `
	<input *ngIf="multiselect" type="checkbox" [checked]="selected" (click)="select()">
	<input *ngIf="!multiselect" type="radio" name="table-select" [checked]="selected" (click)="select()">
	`
})

export class TableSelectComponent implements OnInit, OnDestroy {

	@Input() selected: boolean = false;
	@Input() multiselect: boolean = true;
	@Output() selectEvent = new EventEmitter();

	areAllElementsSelectedSub: Subscription;

  constructor(private store: Store<State>) { }

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
