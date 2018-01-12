import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers';
import * as RouterActions from './../../../../router/state/router.actions';
import { RouteData, BreadcrumbSegment } from '../../../../router/state/router.reducer';
import { Observable } from 'rxjs/Observable';

interface RouteSegment {
  name: string;
  route: string;
}

@Component({
  selector: 'sw-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  segments: RouteSegment[] = [
    { name: 'Apache2', route: 'components' },
    { name: 'Apache2 1.3.2', route: 'projects' },
  ];

  currentRouteData: Observable<RouteData>;
  breadcrumbSegments: Observable<BreadcrumbSegment[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.currentRouteData = this.store.select(fromRoot.selectCurrentRoute);
    this.breadcrumbSegments = this.store.select(fromRoot.selectBreadcrumbSegments);
  }

  ngOnInit() {
  }

  go(route: string) {
    this.store.dispatch( new RouterActions.Go({
      path: [`${route}`]
    }));
  }

}
