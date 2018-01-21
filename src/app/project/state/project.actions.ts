import { Action } from '@ngrx/store';
import { SW360Project } from './../../resources/resources.api';

export const QUERY              = '[Projects] Query';
export const QUERY_SUCCESS      = '[Projects] Query Success';
export const REDUCE_PROJECTS  = '[Projects] Reduce projects';
export const GET                = '[Project]  Get';
export const GET_SUCCESS        = '[Project]  Get success';
export const REDUCE_PROJECT   = '[Project]  Reduce project';

export class Query implements Action {
  readonly type = QUERY;
}

export class QuerySuccess implements Action {
  readonly type = QUERY_SUCCESS;
  constructor(public response: any) { }
}

export class ReduceProjects implements Action {
  readonly type = REDUCE_PROJECTS;
  constructor(public projects: SW360Project[]) { }
}

export class Get implements Action {
  readonly type = GET;
  constructor(public href: string) { }
}

export class GetSuccess implements Action {
  readonly type = GET_SUCCESS;
  constructor(public response: any) { }
}

export class ReduceProject implements Action {
  readonly type = REDUCE_PROJECT;
  constructor(public project: SW360Project) { }
}

export type All =
  Query |
  QuerySuccess |
  ReduceProjects |
  Get |
  GetSuccess |
  ReduceProject;