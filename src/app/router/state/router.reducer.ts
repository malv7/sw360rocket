import * as RouterActions from './router.actions';

export interface State {
  
}

const initialState = {
  
}

export function routerReducer(state = initialState, action: RouterActions.Actions): State {
 
  switch (action.type) {
    // case RouterActions.PROVIDE_MOCK_DATA: {
    //   return { ...state, components: action.components };
    // }
      
    default: return state;
  }

}
