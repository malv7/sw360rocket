import { Action } from '@ngrx/store';

export const SET_TITLE = '[Structure] Set Title';

export class SetTitle implements Action {
  readonly type = SET_TITLE;
  constructor(public title: string) { }
}

export type All = SetTitle;