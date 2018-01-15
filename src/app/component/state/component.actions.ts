import { Action } from '@ngrx/store';
import { SW360Component } from './../../resources/resources.api';

export const QUERY              = '[Components] Query';
export const QUERY_SUCCESS      = '[Components] Query Success';
export const REDUCE_COMPONENTS  = '[Components] Reduce components';
export const GET                = '[Component]  Get';
export const GET_SUCCESS        = '[Component]  Get success';
export const REDUCE_COMPONENT   = '[Component]  Reduce component';

export class Query implements Action {
  readonly type = QUERY;
}

export class QuerySuccess implements Action {
  readonly type = QUERY_SUCCESS;
  constructor(public response: any) { }
}

export class ReduceComponents implements Action {
  readonly type = REDUCE_COMPONENTS;
  constructor(public components: SW360Component[]) { }
}

export class Get implements Action {
  readonly type = GET;
  constructor(public href: string) { }
}

export class GetSuccess implements Action {
  readonly type = GET_SUCCESS;
  constructor(public response: any) { }
}

export class ReduceComponent implements Action {
  readonly type = REDUCE_COMPONENT;
  constructor(public component: SW360Component) { }
}

export type All =
  Query |
  QuerySuccess |
  ReduceComponents |
  Get |
  GetSuccess |
  ReduceComponent;