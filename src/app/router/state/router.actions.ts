import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { CurrentRouteData } from './router.reducer';

export const GO      = '[Router] Go';
export const BACK    = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const STORE_CURRENT_ROUTE_DATA = '[Router] Store current route data';

export class Go implements Action {
  readonly type = GO;

  constructor(public payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export class StoreCurrentRouteData implements Action {
  readonly type = STORE_CURRENT_ROUTE_DATA;
  constructor(public currentRouteData: CurrentRouteData) {}
}

export type Actions =
    Go
  | Back
  | Forward
  | StoreCurrentRouteData;