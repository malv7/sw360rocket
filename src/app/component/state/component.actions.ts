import { Action } from '@ngrx/store';

export const QUERY  = '[Component] Query';
export const CREATE = '[Component] Create';
export const UPDATE = '[Component] Update';
export const DELETE = '[Component] Delete';

export class Query implements Action {
  readonly type = QUERY;
  constructor() { }
}

export class Create implements Action {
  readonly type = CREATE;
  constructor() { }
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor() { }
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor() { }
}