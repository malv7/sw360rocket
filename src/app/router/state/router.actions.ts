import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { RouteData } from './router.reducer';

export const GO      = '[Router] Go';
export const BACK    = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const UPDATE_CURRENT_ROUTE = '[Router] Update current route';
export const UPDATE_LAST_ROUTE = '[Router] Update last route';

export class Go implements Action {
  readonly type = GO;

  constructor(public payload: {
    path: any[];
    query?: object; // not used yet
    extras?: NavigationExtras; // not used yet

    // Ressource information
    ressourceSelflink?: string;
  }) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export class UpdateLastRoute implements Action {
  readonly type = UPDATE_LAST_ROUTE;
}

export class UpdateCurrentRoute implements Action {
  readonly type = UPDATE_CURRENT_ROUTE;
  constructor(public currentRoute: RouteData) { }
}

export type Actions =
    Go
  | Back
  | Forward
  | UpdateCurrentRoute
  | UpdateLastRoute;