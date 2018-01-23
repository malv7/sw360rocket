import { ReleaseContext } from './release.reducer';
import { Action } from '@ngrx/store';
import { SW360Release } from './../../resources/resources.api';

export const QUERY              = '[Releases] Query';
export const QUERY_SUCCESS      = '[Releases] Query Success';
export const REDUCE_RELEASES  = '[Releases] Reduce releases';
export const GET                = '[Release]  Get';
export const GET_SUCCESS        = '[Release]  Get success';
export const REDUCE_RELEASE   = '[Release]  Reduce release';

export class Query implements Action {
  readonly type = QUERY;
}

export class QuerySuccess implements Action {
  readonly type = QUERY_SUCCESS;
  constructor(public response: any) { }
}

export class ReduceReleases implements Action {
  readonly type = REDUCE_RELEASES;
  constructor(public releases: SW360Release[], public context: ReleaseContext) { }
}

export class Get implements Action {
  readonly type = GET;
  constructor(public href: string) { }
}

export class GetSuccess implements Action {
  readonly type = GET_SUCCESS;
  constructor(public response: any) { }
}

export class ReduceRelease implements Action {
  readonly type = REDUCE_RELEASE;
  constructor(public release: SW360Release) { }
}

export type All =
  Query |
  QuerySuccess |
  ReduceReleases |
  Get |
  GetSuccess |
  ReduceRelease;