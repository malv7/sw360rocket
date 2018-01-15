import * as RouterActions from './router.actions';
import * as RouterApi from './../router.api';
import * as fromRoot from './../../state';

export interface State {
  activeFeatureSelflink: string;
}

const initialState: State = {
  activeFeatureSelflink: ''
}

export function routerReducer(state = initialState, action: RouterActions.Actions): State {
 
  switch (action.type) {

    case RouterActions.SET_ACTIVE_FEATURE_SELFLINK: {
      return { ...state, activeFeatureSelflink: action.selflink }
    }
      
    default: return state;
  }

}



