import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import * as fromModel from './../../../state/model.reducer';
import { Observable } from "rxjs/Observable";
import { EmbeddedRelease } from "../../../state/models";
import * as ListSelectActions from './../../state/list-select/list-select.actions';
import * as RouterActions from './../../../router/state/router.actions';
import { TableService } from "../services/table.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'sw-release-table',
  templateUrl: './release-table.component.html',
  styles: [`
    .collapsing {
      min-width: 250px;
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

    row-hover {
      background: red !important;
    }
  `]
})
export class ReleaseTableComponent implements OnDestroy {

  sortedBy: string = '';
  isAscending: boolean = false;
  areAllSelected: boolean = false;
  releases: Observable<EmbeddedRelease[]>;
  selectedElementsCountSub: Subscription;
  count = 0;

  constructor(private store: Store<fromRoot.State>, private tableService: TableService) {
    this.releases = this.store.select(fromModel.selectReleases);
    this.selectedElementsCountSub = this.store.select(fromRoot.selectSelectedListElementsCount)
      .subscribe(selectedElementsCount => {
        if (selectedElementsCount === 0) this.areAllSelected = false;
        this.count = selectedElementsCount;
      });
  }

  selectAll() {
    this.tableService.selectAll(this.areAllSelected, this.releases);
  }

  selectOne(release: EmbeddedRelease) {
    this.tableService.selectOne(release);
  }

  go(release: EmbeddedRelease) {
    this.tableService.go(release);
  }

  ngOnDestroy(): void {
    if (this.selectedElementsCountSub) this.selectedElementsCountSub.unsubscribe();
  }



	onSorted($event){
		this.releases = this.tableService.sortByRow($event, this.releases);
  }
}
