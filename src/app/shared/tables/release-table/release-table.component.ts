import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import * as fromModel from './../../../state/model.reducer';
import { Observable } from "rxjs/Observable";
import { EmbeddedRelease } from "../../../state/models";
import * as RouterActions from './../../../router/state/router.actions';
import { TableService } from "../services/table.service";
import { Subscription } from "rxjs/Subscription";
import { Pagination } from "./../../state/table/table.reducer"
import * as TableActions from './../../state/table/table.actions';
import * as fromTable from './../../state/table/table.reducer';

@Component({
  selector: 'sw-release-table',
  templateUrl: './release-table.component.html',
  styles: [`

    .collapsing {
      // min-width: 200px;
    }

    .table-selection-count-label, .table-selection-count {
      color: #AAA;
    }

    .table-selection-count-label {
      margin-right: 0.5em;
      font-weight: 400;
    }

    .table-selection-count {
      margin-right: 1.5em;
    }

    .sort {
      color: #AAA;
      cursor: pointer;
    }

    .sort:hover {
      color: #777;
    }

    .cell-hover {
      cursor: pointer;
    }
  `]
})
export class ReleaseTableComponent implements OnDestroy {

  areAllSelected: boolean = false;
  releases: Observable<EmbeddedRelease[]>;
	selectedElementsCountSub: Subscription;
  selectedElementCount = 0;

  constructor(private store: Store<fromRoot.State>, private tableService: TableService) {
    this.releases = this.store.select(fromModel.selectReleases);
    this.selectedElementsCountSub = this.store.select(fromTable.selectSelectedListElementsCount)
      .subscribe(selectedElementsCount => {
        if (selectedElementsCount === 0)
          this.areAllSelected = false;
        this.selectedElementCount = selectedElementsCount;
      });

    // TODO: Hashmap does not update, see reducer
    // this.store.select(fromTable.selectSelectedListElements).subscribe(x => console.log(x));
  }

  // TODO: should take selflink
  go(release: EmbeddedRelease) {
    this.store.dispatch(new RouterActions.Go({ path: [`releases/${release.id}`] }));
  }

  ngOnDestroy(): void {
    if (this.selectedElementsCountSub) this.selectedElementsCountSub.unsubscribe();
  }

  selectAll() {
    // this.tableService.selectAll(this.areAllSelected, this.releases);
  }

  selectOne(release: EmbeddedRelease) {
    // this.tableService.selectOne(release);
  }

}
