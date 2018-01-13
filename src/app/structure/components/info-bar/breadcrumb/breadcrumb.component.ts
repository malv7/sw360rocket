import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './../../../../state';
import * as RouterActions from './../../../../router/state/router.actions';
import { RouteData, BreadcrumbSegment } from '../../../../router/state/router.reducer';
import { Observable } from 'rxjs/Observable';
import * as fromRouter from './../../../../router/state/router.reducer';

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

  routeData: Observable<RouteData>;
  breadcrumbSegments: Observable<BreadcrumbSegment[]>;

  constructor(private store: Store<State>) {
    this.routeData = this.store.select(fromRouter.selectCurrentRoute);
    this.breadcrumbSegments = this.store.select(fromRouter.selectBreadcrumbSegments);
  }

  ngOnInit() {
  }

  go(route: string) {
    this.store.dispatch( new RouterActions.Go({
      path: [`${route}`]
    }));
  }

}
