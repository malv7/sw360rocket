import { Component, Input, OnInit } from "@angular/core";
import { TableService } from "../services/table.service";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import * as TableActions from './../../state/table/table.actions';
import { Observable } from "rxjs/Observable";
import { EmbeddedRelease } from "../../../state/models";
import * as fromModel from './../../../state/model.reducer';

@Component({
  selector: 'sw-generic-table',
  templateUrl: './generic-table.component.html',
  styles: [`
    .table-selection-count-label, .table-selection-count { color: #AAA; }
    .table-selection-count-label { margin-right: 0.5em; font-weight: 400; }
    .table-selection-count { margin-right: 1.5em; }
    .cell-hover { cursor: pointer; }
  `]
})
export class GenericTableComponent implements OnInit {

  @Input() data: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>,
    private tableService: TableService)
  { }

  ngOnInit(): void {
    this.data.subscribe(x => console.log(x));
    /*
      store select type subscribe {
      switch(types) {
        data = store.subscribe...
        data = store.subscribe...
        data = store.subscribe...
      }
    }
    */
  }

}

// set type in routing depending on route
// let table initialize upon that data