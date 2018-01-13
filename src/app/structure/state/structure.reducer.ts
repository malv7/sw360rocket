import * as StructureActions from './structure.actions';
import * as fromRoot from './../../state';

export interface State {
  title: string;
}

const initialState: State = {
  title: 'INITIAL TITLE STATE'
}

export function structureReducer(state = initialState, action: StructureActions.All) {
  switch (action.type) {
    case StructureActions.SET_TITLE: {
      return { ...state, title: action.title }
    }
    default: {
      return state;
    }
  }
}

export const selectTitle = (state: fromRoot.State) => state.structure.title;