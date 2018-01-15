import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './../../../../state';
import * as RouterActions from './../../../../router/state/router.actions';
import * as fromRouter from './../../../../router/state/router.reducer';
import { Breadcrumb } from '../../../state/structure.reducer';
import * as fromStructure from './../../../state/structure.reducer';

interface RouteSegment {
  name: string;
  route: string;
}

@Component({
  selector: 'sw-breadcrumb',
  template: `
    <div *ngIf="breadcrumb.active">
      <span *ngFor="let segment of breadcrumb.segments" class="routeSegment" (click)="go(segment.route)">
        {{ segment.name }}
      </span>
    </div>
    <!-- {{ breadcrumb | async | json }} -->
  `,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  
  segments: RouteSegment[] = [
    { name: 'Apache2', route: 'components' },
    { name: 'Apache2 1.3.2', route: 'projects' },
  ];
  
  // routeData: Observable<RouteData>;
  // breadcrumbSegments: Observable<BreadcrumbSegment[]>;
  breadcrumb: Breadcrumb;
  breadcrumbSub: Subscription;
  
  constructor(private store: Store<State>) { }
  
  ngOnInit() {
    this.breadcrumbSub = this.store.select(fromStructure.selectBreadcrumb).subscribe(breadcrumb => this.breadcrumb = breadcrumb);
  }
  
  ngOnDestroy(): void {
    if (this.breadcrumbSub) this.breadcrumbSub.unsubscribe();
  }

  go(route: string) {
    this.store.dispatch( new RouterActions.Go({
      path: [`${route}`]
    }));
  }

}
