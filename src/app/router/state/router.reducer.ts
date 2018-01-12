import * as RouterActions from './router.actions';
import * as RouterApi from './../router.api';

export interface BreadcrumbSegment {
  path: string;
  name: string;
}

export interface RouteData {
  // TODO
  showBreadcrumb: boolean;
  breadCrumbSegments: BreadcrumbSegment[];

  ressourceType: string;
  ressourceContext: string;
}

export interface State {
  currentRoute: RouteData;
  lastRoute: RouteData;
}

const initialState: State = {
  currentRoute: RouterApi.emptyCurrentRouteData,
  lastRoute: RouterApi.emptyCurrentRouteData
}

export function routerReducer(state = initialState, action: RouterActions.Actions): State {
 
  switch (action.type) {

    case RouterActions.UPDATE_CURRENT_ROUTE: {
      return { ...state, currentRoute: action.currentRoute }
    }

    case RouterActions.UPDATE_LAST_ROUTE: {
      return { ...state, lastRoute: state.currentRoute };
    }
      
    default: return state;
  }

}
