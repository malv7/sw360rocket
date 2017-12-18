import * as Models from './models';
import * as ModelActions from './model.actions';
import * as fromRoot from './../reducers';

interface HashMap {
  [key: string]: Models.User;
}

export interface State {
  users?: Models.EmbeddedUser[];
  user?: Models.User;
  userMap?: HashMap;
}

const initialState: State = {
  userMap: { }
};

export function modelReducer(state = initialState, action: ModelActions.All) {
  switch (action.type) {

    case ModelActions.GET_USERS: {
      return { ...state, users: action.users };
    }

    case ModelActions.GET_USER: {
      state.userMap[action.user._links.self.href] = action.user;
      return { ...state, user: action.user };
    }
  
    default:
      return state;
  }
}

export const selectUser = (state: fromRoot.State) => state.model.user;
export const selectUsers = (state: fromRoot.State) => state.model.users;
export const selectUserMap = (state: fromRoot.State) => state.model.userMap;
