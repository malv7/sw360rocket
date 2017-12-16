import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers';
import * as RouterActions from './../../../../router/state/router.actions';

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

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  go(route: string) {
    this.store.dispatch( new RouterActions.Go({
      path: [`${route}`]
    }));
  }

}
