import { Action } from '@ngrx/store';
import { EmbeddedProject } from './project.models';

export const GET_MOCKED_PROJECTS = '[Project] Get Projects';

export class GetMockedProjects implements Action {
  readonly type = GET_MOCKED_PROJECTS;
}

export type All = GetMockedProjects;