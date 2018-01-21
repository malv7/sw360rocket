import * as ComponentActions from './component.actions';
import { SW360Component, SW360ComponentTypes } from './../../resources/resources.api';
import * as fromRoot from './../../state';

export interface State {
  components: SW360Component[];
  component?: SW360Component;
}

const initialState: State = {
  components: [],
}

export function componentReducer(state = initialState, action: ComponentActions.All): State {

  switch (action.type) {

    case ComponentActions.REDUCE_COMPONENTS: {
      return { ...state, components: action.components }
    }

    case ComponentActions.REDUCE_COMPONENT: {
      return { ...state, component: action.component }
    }

    default: return state;
  }

}

export const selectComponents = (state: fromRoot.State) => state.component.components;
export const selectComponent = (state: fromRoot.State) => state.component.component;

