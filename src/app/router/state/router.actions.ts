import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { RouteData, BreadCrumb } from './router.reducer';

export const GO      = '[Router] Go';
export const BACK    = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const UPDATE_ROUTE = '[Router] Update current route';
export const UPDATE_BREADCRUMB = '[Router] Update breadcrumb';

export class Go implements Action {
  readonly type = GO;

  constructor(public payload: {
    path: any[];

    // TODO: needed?
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

export class UpdateRoute implements Action {
  readonly type = UPDATE_ROUTE;
  constructor(public routeData: RouteData) { }
}

export class UpdateBreadCrumb implements Action {
  readonly type = UPDATE_BREADCRUMB;
  constructor(public breadcrumb: BreadCrumb) { }
}

export type Actions =
    Go
  | Back
  | Forward
  | UpdateRoute
  | UpdateBreadCrumb;