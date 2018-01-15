import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO      = '[Router] Go';
export const BACK    = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const SET_ACTIVE_FEATURE_SELFLINK = '[Router] Set active element name';

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

export class SetActiveFeatureSelflink implements Action {
  readonly type = SET_ACTIVE_FEATURE_SELFLINK;
  constructor(public selflink: string) { }
}

export type Actions =
    Go
  | Back
  | Forward
  | SetActiveFeatureSelflink;