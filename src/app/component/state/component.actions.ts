import { Action } from '@ngrx/store';
import { ComponentDataLayout } from './component.models';

export const QUERY  = '[Component] Query';
export const CREATE = '[Component] Create';
export const UPDATE = '[Component] Update';
export const DELETE = '[Component] Delete';

export const PROVIDE_MOCK_DATA = 'ProvideMockData';
export class ProvideMockData implements Action {
  readonly type = PROVIDE_MOCK_DATA;
  constructor(public components: ComponentDataLayout[]) { }
}

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

export type All =
  ProvideMockData;