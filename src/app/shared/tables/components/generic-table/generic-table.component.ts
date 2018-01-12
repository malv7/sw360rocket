import { Component, Input, OnInit, OnDestroy, TemplateRef } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/observable/interval';

import { Store } from "@ngrx/store";
import * as TableActions from './../../../tables/state/table.actions';
import { State } from './../../../../state';
import * as fromTable from './../../../tables/state/table.reducer';

@Component({
  selector: 'sw-generic-table',
  templateUrl: './generic-table.component.html',
  styles: [`
    .selected-elements { background: red; }
    .selected-elements-count { margin-right: 0.5em; }
    .selected-elements-count-label { margin-right: 0.5em; font-weight: 400; }
    .selected-elements-count-label, .selected-elements-count { color: #AAA; }
    td { cursor: pointer; }
  `]
})
export class GenericTableComponent implements OnInit, OnDestroy {

  @Input('tableHeader') tableHeader: TemplateRef<Component>;
	@Input('tableBody') tableBody: TemplateRef<Component>;

  selectedElementsCount: Observable<number>;

  @Input() type: string; // TableTypes
  @Input() debug: boolean = false;

  constructor(private store: Store<State>) { }
  
  ngOnInit(): void {
    this.selectedElementsCount = this.store.select(fromTable.selectSelectedListElementsCount);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new TableActions.ClearTableSelections());
  }

}
