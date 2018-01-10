import { Component, Input, OnInit, OnDestroy, TemplateRef } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/observable/interval';

import { Store } from "@ngrx/store";
import * as TableActions from './../../state/table/table.actions';
import * as RouterActions from './../../../router/state/router.actions';
import * as fromRoot from './../../../reducers';
import * as fromTable from './../../state/table/table.reducer';
import * as fromModel from './../../../state/model.reducer';

import {
  EmbeddedRelease,
  EmbeddedProject,
  EmbeddedResource,
  TableTypes,
  EmbeddedSW360Component,
  EmbeddedRessourceX
} from "../../../state/models";

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

  // Selection state
  selectedElementsCount: Observable<number>;

  // Table size affects styling
  tableSize: string = '';

  @Input() type: string; // TableTypes
  @Input() debug: boolean = false;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedElementsCount = this.store.select(fromTable.selectSelectedListElementsCount);
  }

  ///// Lifecycle
  ///////////////
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.store.dispatch(new TableActions.ClearTableSelections());
  }

  ///// Style
  ///////////
  setTableSize(size: string) {
    this.tableSize = size; // small, normal, large
    // TODO: Action
  }
}

// TODO:
////// Buttons
//////////////

// Request the resolved selflink data,
// derive "createFormData"
// route to createResource
// TODO: Distinction between edit / clone?
// const clone = () => ;
// const edit = () => ;

// Route to add ressource
// Release cases:
// 1. Components:
//    Route to new release
// 2. Projects
//    Route to "find releases or projects"
// const add = () => ;

// Remove
// Dispatch ressource deletion
// Rerequest current route data
// Release cases:
// 1. Components:
//    Delete the release
// 2. Projects:
//    Remove release from particular project
// const delete = () => ;

// Release only:
// const fossology = () =>;
