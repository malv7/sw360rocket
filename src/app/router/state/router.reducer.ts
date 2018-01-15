import * as RouterActions from './router.actions';
import * as RouterApi from './../router.api';
import * as fromRoot from './../../state';
import { ActiveFeatures } from './../router.api';

export interface State {
  activeFeatures: ActiveFeatures[];
}

const initialState: State = {
  activeFeatures: []
}

export function routerReducer(state = initialState, action: RouterActions.Actions): State {
 
  switch (action.type) {

    case RouterActions.SET_ACTIVE_FEATURES: {
      return { ...state, activeFeatures: action.activeFeatures };
    }
      
    default: return state;
  }

}

export const selectActiveFeatures = (state: fromRoot.State) => state.router.activeFeatures;


