import { Component, Input, OnInit, OnDestroy } from "@angular/core";

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

  // Ressources
  components: Observable<EmbeddedSW360Component[]>
  projects: Observable<EmbeddedProject[]>
  releases: Observable<EmbeddedRelease[]>

  // Selection state
  areAllSelected: boolean;
  selectedElementsCount: number;
  selectedElementsCountSub: Subscription;

  // Table size affects styling
  tableSize: string = '';

  // DEBUG
  debug_tableIterator = 1;
  debug_tabletypes = [TableTypes.projects, TableTypes.components, TableTypes.releases];

  @Input() type: string; // TableTypes
  @Input() debug: boolean = false;

  constructor(private store: Store<fromRoot.State>) {

    this.selectedElementsCountSub = this.store.select(fromTable.selectSelectedListElementsCount)
      .subscribe(selectedElementsCount => {
        this.selectedElementsCount = selectedElementsCount;
        if (selectedElementsCount === 0)
          this.areAllSelected = false;
      });

    // Observable.interval(5000).subscribe(() => this.next());
  }

  // DEBUG
  next() {
    this.debug_tableIterator++;
    if (this.debug_tableIterator > this.debug_tabletypes.length - 1) this.debug_tableIterator = 0;
    this.type = this.debug_tabletypes[this.debug_tableIterator];
    this.store.dispatch(new TableActions.ClearTableSelections());
    this.areAllSelected = false;
  }

  ///// Lifecycle
  ///////////////
  ngOnInit(): void {
    this.initializeTable();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new TableActions.ClearTableSelections());
    if (this.selectedElementsCountSub) this.selectedElementsCountSub.unsubscribe();
  }

  ///// Initialize
  ////////////////
  // TODO: Suscribe to NewTableData Action here and reinit the table
  // This happpens when pagination changes
  initializeTable() {
    if (this.debug) {
      this.type = this.debug_tabletypes[this.debug_tableIterator];
    }
    // console.log(this.type);

    // TODO: Get type from store here
    // TODO: Wait for finished route
    this.initializeTableResource();
    this.initializeSelection();
  }

  initializeSelection() {
    this.areAllSelected = false;
    this.selectedElementsCount = 0;
    this.store.dispatch(new TableActions.ClearTableSelections());
  }

  initializeTableResource() {

    // DEBUG
    if (this.debug) {
      this.projects = this.store.select(fromModel.selectProjects);
      this.components = this.store.select(fromModel.selectComponents);
      this.releases = this.store.select(fromModel.selectReleases);
    }

    switch (this.type) {
      case TableTypes.projects: {
        this.projects = this.store.select(fromModel.selectProjects);
        break;
      }
      case TableTypes.components: {
        this.components = this.store.select(fromModel.selectComponents);
        break;
      }
      case TableTypes.releases: {
        this.releases = this.store.select(fromModel.selectReleases);
        break;
      }
      default: {
        break;
      }
    }
  }

  ///// Routing
  go(resource: EmbeddedResource) {
    this.store.dispatch(new RouterActions.Go({ path: [], ressourceSelflink: resource._links.self.href }));
  };

  ///// Selections
  ////////////////
  selectOne(resource: EmbeddedResource) {
    this.store.dispatch(new TableActions.ToggleTableSelection(resource._links.self.href));
  }

  selectAll() {
    if (this.areAllSelected) {
      this.store.dispatch(new TableActions.ClearTableSelections());
    } else {
      const selfLinks: string[] = [];
      const resources: Observable<EmbeddedRessourceX[]> = this.getTableResource();
      resources.take(1).subscribe(resources => {
        resources.forEach(resource => selfLinks.push(resource._links.self.href));
        this.store.dispatch(new TableActions.AddTableSelections(selfLinks));
      });
    }
  }

  ///// Style
  ///////////
  setTableSize(size: string) {
    this.tableSize = size; // small, normal, large
    // TODO: Action
  }

  ///// Helpers
  /////////////
  getTableResource() {
    switch (this.type) {
      case TableTypes.projects: return this.projects;
      case TableTypes.components: return this.components;
      case TableTypes.releases: return this.releases;
      default: return undefined; // never happens
    }
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
