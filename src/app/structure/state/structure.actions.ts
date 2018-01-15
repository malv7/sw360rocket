import { Action } from '@ngrx/store';
import { Message, Breadcrumb } from './structure.reducer';

export const SET_TITLE = '[Structure] Set Title';
export const SET_MESSAGE = '[Structure] Set Message'
export const SET_MESSAGE_ACTIVE = '[Structure] Set Message active'
export const SET_BREADCRUMB = '[Stucture] Set breadcrumb';

export class SetTitle implements Action {
  readonly type = SET_TITLE;
  constructor(public title: string) { }
}

export class SetMessage implements Action {
  readonly type = SET_MESSAGE;
  constructor(public message: Message) { }
}

export class SetBreadcrumb implements Action {
  readonly type = SET_BREADCRUMB;
  constructor(public breadcrumb: Breadcrumb) { }
}

export type All =
  SetTitle |
  SetMessage |
  SetBreadcrumb;