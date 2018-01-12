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
import { State } from './../../state';
import { Store } from '@ngrx/store';
import * as TableActions from './../../shared/tables/state/table.actions';

// Define feature routes to reuse them in a single place.
const ROUTES = [
  'components',
  'projects'
];

@Injectable()
export class RouterEffects {

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO)
    .do((action: RouterActions.Go) => this.routerService.go(action));

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(RouterActions.BACK)
    .do(() => this.location.back());

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(RouterActions.FORWARD)
    .do(() => this.location.forward());
    
  @Effect({ dispatch: false })
  checkRoute$ = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .do((event: NavigationEnd) => this.routerService.handleNavigation(event)) // type
    
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private routerService: RouterService,
    private store: Store<State>
  ) { }
}