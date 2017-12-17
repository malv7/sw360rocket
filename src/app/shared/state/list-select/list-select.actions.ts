import { Action } from '@ngrx/store';

export const CLEAR  = '[List Selection] Clear';
export const ADD_MANY = '[List Selection] Add many';
export const TOGGLE_ONE = '[List Selection] Toggle one';

export class Clear implements Action {
  readonly type = CLEAR;
  constructor() { }
}

export class AddMany implements Action {
  readonly type = ADD_MANY;
  constructor(public ids: string[]) { }
}

export class ToggleOne implements Action {
  readonly type = TOGGLE_ONE;
  constructor(public id) { }
}

export type All = 
  Clear |
  AddMany |
  ToggleOne;