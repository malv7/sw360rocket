// ng
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Store
import { Store } from '@ngrx/store';
import { State } from './../../../state';
import * as fromModel from './../../../state/model.reducer';
import * as RouterActions from './../../../router/state/router.actions';

// Data
import { EmbeddedRelease } from './../../../state/models';

// Router
import { PROJECTS, COMPONENTS, RELEASES, CREATE, ReleaseContextRoute } from './../../../router/router.api';

// Table
import { TableService } from '../../../shared/tables/services/table.service';
import * as fromTable from './../../../shared/tables/state/table.reducer';
import { Subscription } from 'rxjs/Subscription';

enum ReleaseContext {
  project,
  component
}

@Component({
  selector: 'sw-component-list',
  templateUrl: './release-list.component.html',
})
export class ReleaseListComponent implements OnInit, OnDestroy {

  releases: Observable<EmbeddedRelease[]>;
  
  releaseContextRoute: ReleaseContextRoute;
  releaseContextRouteSub: Subscription;
  isProjects: boolean = false;
  isComponents: boolean = false;

  constructor(private store: Store<State>, private tableService: TableService) { }

  ngOnInit() {
    this.releases = this.store.select(fromModel.selectReleases);
    this.releaseContextRouteSub = this.store.select(fromTable.selectReleaseContextRoute)
      .subscribe(releaseContextRoute => {
        this.releaseContextRoute = releaseContextRoute;
        this.releaseContextRoute.type === PROJECTS
          ? this.isProjects = true
          : this.isComponents = true;
      });
  }

  ngOnDestroy(): void {
    if (this.releaseContextRouteSub) this.releaseContextRouteSub.unsubscribe();
  }

  go(release: EmbeddedRelease) {
    this.store.dispatch(new RouterActions.Go({ path: [
      this.releaseContextRoute.type + '/' + this.releaseContextRoute.id  + '/' + RELEASES + '/' + release.id
    ]}));
  }

  selectOne(release: EmbeddedRelease) {
    this.tableService.selectOne(release);
  }

  selectAll() {
    this.tableService.selectAll(this.releases);
  }

  // Actions
  // TODO: which component?
  create = () => this.store.dispatch(new RouterActions.Go({ path: [
    COMPONENTS + '/' + this.releaseContextRoute.id + '/' + RELEASES + '/' + CREATE]
  }));

  add = () => console.log("ReleaseListComponent add relation release action");
  clone = () => console.log("ReleaseListComponent clone action");
  delete = () => console.log("ReleaseListComponent delete action");
  fossology = () => console.log("ReleaseListComponent fossology action");

};
