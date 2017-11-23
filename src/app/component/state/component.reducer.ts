import * as ComponentActions from './component.actions';
import { ComponentDataLayout } from './component.models';

export interface State {
  components: ComponentDataLayout[];
}

const initialState = {
  components: []
}

export function componentReducer(state = initialState, action: ComponentActions.All): State {
 
  switch (action.type) {
    case ComponentActions.PROVIDE_MOCK_DATA: {
      return { ...state, components: action.components };
    }
      
    default: return state;
  }

}
