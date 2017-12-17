import * as ProjectActions from './project.actions';
import { getEmbeddedProducts, EmbeddedProject } from './project.models';

export interface State {
  projects: EmbeddedProject[];
}

const initialState: State = {
  projects: []
}

export function projectReducer(state = initialState, action: ProjectActions.All) {

  switch (action.type) {
    case ProjectActions.GET_MOCKED_PROJECTS: {
      return { projects: getEmbeddedProducts() }
    }
      
    default:
      return state;
  }

}