// ng
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Store
import { Store } from '@ngrx/store';
import { State } from './../../../state';
import * as fromModel from './../../../state/model.reducer';
import * as RouterActions from './../../../router/state/router.actions';

// Data
import { EmbeddedRelease } from './../../../state/models';

// Router
import { PROJECTS, COMPONENTS, RELEASES, CREATE } from './../../../router/router.api';

// Table
import { TableService } from '../../../shared/tables/services/table.service';

enum ReleaseContext {
  project,
  component
}

@Component({
	selector: 'sw-component-list',
	templateUrl: './release-list.component.html',
})
export class ReleaseListComponent implements OnInit {

  // TODO: get from store?
  // TODO: get route from store as well?
  context: ReleaseContext;

  releases: Observable<EmbeddedRelease[]>;
  constructor(private store: Store<State>, private tableService: TableService) { }

	ngOnInit() {
		this.releases = this.store.select(fromModel.selectReleases);
	}

  // TODO: how to route based on context?
  go(release: EmbeddedRelease) {
    // if (this.context === ReleaseContext.component)
      // this.store.dispatch(new RouterActions.Go({ path: [] }))
    // if (this.context === ReleaseContext.project)
      // this.store.dispatch(new RouterActions.Go({ path: [] }))
	}

	selectOne(release: EmbeddedRelease) {
		this.tableService.selectOne(release);
	}

	selectAll() {
		this.tableService.selectAll(this.releases);
  }
  
  // Actions
  // TODO: which component?
  create = () => this.store.dispatch(new RouterActions.Go({ path: [RELEASES + CREATE] }));
  
  add    = () => console.log("ReleaseListComponent add relation release action");
  clone  = () => console.log("ReleaseListComponent clone action");
  delete = () => console.log("ReleaseListComponent delete action");

};
