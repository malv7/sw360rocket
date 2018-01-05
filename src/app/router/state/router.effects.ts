import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter'
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import * as RouterActions from './router.actions';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { RouterService } from '../services/router.service';
import * as SelectListActions from './../../shared/state/list-select/list-select.actions';
import * as fromRoot from './../../reducers';
import { Store } from '@ngrx/store';

// Define feature routes to reuse them in a single place.
const ROUTES = [
  'components',
  'projects'
];

@Injectable()
export class RouterEffects {

  lastRouteSubject: Subject<string>;
  lastRoute: Observable<string>;

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO)
    .do(() => console.log("ROUTER GO"))
    .do(() => this.store.dispatch(new SelectListActions.Clear()))
    .map((action: RouterActions.Go) => action.payload)
    // .do(({ path, query: queryParams, extras}) => console.log('go to: ' + path))
    .do(({ path, query: queryParams, extras}) => this.router.navigate(path, { queryParams, ...extras }));

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(RouterActions.BACK)
    .do(() => this.location.back());

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(RouterActions.FORWARD)
    .do(() => this.location.forward());
    
  @Effect({ dispatch: false })
  checkRoute$ = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .map((event: NavigationEnd)=> this.routerService.parseRoute(event))
    
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private routerService: RouterService,
    private store: Store<fromRoot.State>
  ) {
    this.lastRouteSubject = new Subject<string>();
    this.lastRoute = this.lastRouteSubject.asObservable();
  }
}