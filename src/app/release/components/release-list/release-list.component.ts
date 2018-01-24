import { RouterService, toSegmentArray } from './../../../router/services/router.service';
// ng
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Store
import { Store } from '@ngrx/store';
import { State } from './../../../state';
import * as RouterActions from './../../../router/state/router.actions';

// Router
import { UrlSegments } from './../../../router/router.api';

// Table
import { TableService } from '../../../shared/tables/services/table.service';
import { SW360Release } from '../../../resources/resources.api';
import * as fromRelease from './../../state/release.reducer';
import { Subscription } from 'rxjs/Subscription';
import { ReleaseContext } from './../../state/release.reducer';

import * as fromComponent from './../../../component/state/component.reducer';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Component({
  selector: 'sw-component-list',
  templateUrl: './release-list.component.html',
})
export class ReleaseListComponent implements OnInit, OnDestroy {

  releases: Observable<SW360Release[]>;
  releaseContext: ReleaseContext;
  releaseContextSub: Subscription;
  isProjects: boolean = false;
  isComponents: boolean = false;

  constructor(
    private store: Store<State>,
    private tableService: TableService,
    private routerService: RouterService
  ) { }

  ngOnInit() {
    this.releases = this.store.select(fromRelease.selectReleases);
    this.updateContext();
  }

  updateContext() {
    this.releaseContextSub = this.store.select(fromRelease.selectReleaseContext)
    .subscribe(releaseContext => {
      if (releaseContext === 'projects') {
        this.isProjects = true;
        this.isComponents = false;
      } else if (releaseContext === 'components') {
        this.isProjects = false;
        this.isComponents = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.releaseContextSub) this.releaseContextSub.unsubscribe();
  }

  go(release: SW360Release) {
    this.store.dispatch(new RouterActions.GoSelfLink(release._links.self.href));
  }

  selectOne(release: SW360Release) {
    this.tableService.selectOne(release);
  }

  selectAll() {
    this.tableService.selectAll(this.releases);
  }

  // Actions
  // TODO: which component?
  create = () => {
    this.store.select(fromComponent.selectComponent).take(1).map(component => component._links.self.href).subscribe(selflink => {
      const segments = toSegmentArray(selflink);
      const componentId = segments[segments.length - 1];
      const path = UrlSegments.components + '/' + componentId + '/' + UrlSegments.releases + '/' + UrlSegments.create;
      this.store.dispatch(new RouterActions.Go({ path: [path]}))
    });
  };

  add = () => console.log("ReleaseListComponent add relation release action");
  clone = () => console.log("ReleaseListComponent clone action");
  delete = () => console.log("ReleaseListComponent delete action");
  fossology = () => console.log("ReleaseListComponent fossology action");

};
