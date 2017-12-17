import * as ListSelectActions from './list-select.actions';

interface SelectedElements {
  [id: string]: boolean; 
}

export interface State {
  selectedElements: SelectedElements;
}

const initialState = {
  selectedElements: { }
};

export function listSelectReducer(state = initialState, action: ListSelectActions.All): State {
 
  switch (action.type) {
    
    // TODO: has a bug, that the selectSelectedList observable does not fire when this performed
    // anyway, the store gets mutated
    // Workarround: Select the list each time when an action should be performed and use take(1)
    case ListSelectActions.TOGGLE_ONE: {

      if (!state.selectedElements[action.id]) {
        state.selectedElements[action.id] = true;
      } else {
        delete state.selectedElements[action.id];
      }

      return state;
    }

    case ListSelectActions.ADD_MANY: {
      state = { selectedElements: {} };
      action.ids.forEach(id => state.selectedElements[id] = true);
      return state;
    }

    case ListSelectActions.CLEAR: {
      return { selectedElements: {} };
    }
      
    default: return state;
  }

}
