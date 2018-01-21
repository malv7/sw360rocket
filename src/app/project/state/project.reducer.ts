import * as ProjectActions from './project.actions';
import { SW360Project } from './../../resources/resources.api';
import * as fromRoot from './../../state';

export interface State {
  projects: SW360Project[];
  project?: SW360Project;
}

const initialState: State = {
  projects: [],
}

export function projectReducer(state = initialState, action: ProjectActions.All): State {

  switch (action.type) {

    case ProjectActions.REDUCE_PROJECTS: {
      return { ...state, projects: action.projects }
    }

    case ProjectActions.REDUCE_PROJECT: {
      return { ...state, project: action.project }
    }

    default: return state;
  }

}

export const selectProjects = (state: fromRoot.State) => state.project.projects;
export const selectProject = (state: fromRoot.State) => state.project.project;

