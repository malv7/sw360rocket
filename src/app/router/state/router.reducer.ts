import * as RouterActions from './router.actions';
import * as RouterApi from './../router.api';
import * as fromRoot from './../../state';

export interface BreadCrumb {
  showBreadcrumb: boolean;
  breadCrumbSegments: BreadcrumbSegment[];
}

export interface BreadcrumbSegment {
  path: string;
  name: string;
}

export interface RouteData {
  breadcrumb: BreadCrumb;
}

export interface State {
  route: RouteData;
}

const initialState: State = {
  route: {
    breadcrumb: {
      showBreadcrumb: false,
      breadCrumbSegments: []
    },
  }
}

export function routerReducer(state = initialState, action: RouterActions.Actions): State {
 
  switch (action.type) {

    case RouterActions.UPDATE_ROUTE: {
      return { ...state, route: action.routeData }
    }
      
    default: return state;
  }

}

export function selectCurrentRoute(state: fromRoot.State) {
  return state.router.route;
}

export function selectBreadcrumbSegments(state: fromRoot.State) {
  return state.router.route.breadcrumb.breadCrumbSegments;
}
