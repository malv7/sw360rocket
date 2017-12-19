import * as ListSelectActions from './list-select.actions';

interface SelectedElements {
  [id: string]: boolean; 
}

export interface State {
  selectedElements: SelectedElements;
  selectedElementsCount: number;
}

const initialState: State = {
  selectedElements: { },
  selectedElementsCount: 0
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

      state.selectedElementsCount = Object.keys(state.selectedElements).length;
      return state;
    }

    case ListSelectActions.ADD_MANY: {
      state = { ...state, selectedElements: {} };
      action.ids.forEach(id => state.selectedElements[id] = true);
      state.selectedElementsCount = action.ids.length;
      return state;
    }

    case ListSelectActions.CLEAR: {
      return { ...state, selectedElements: {}, selectedElementsCount: 0 };
    }
      
    default: return state;
  }

}
