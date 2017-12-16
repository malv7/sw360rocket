import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO      = '[Router] Go';
export const BACK    = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const STORE_ROUTES = '[Router] Store routes';

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

export class StoreRoutes implements Action {
  readonly type = STORE_ROUTES;
  constructor(public payload: {

  }) {
    console.log("store routes action");
  }
}

export type Actions
  = Go
  | Back
  | Forward;