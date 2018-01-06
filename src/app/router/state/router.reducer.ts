import * as RouterActions from './router.actions';

export interface BreadcrumbSegment {
  path: string;
  name: string;
}

export interface CurrentRouteData {
  // title: string;
  // showTitle: boolean;
  
  showBreadcrumb: boolean;
  breadCrumbSegments: BreadcrumbSegment[];

  isList: boolean;
  listType: string;  // TODO: components, releases ... as enum and array

  isDetail: boolean;
  detailType: string; // TODO: components, releases ... as enum and array

  feature: string;
}

export interface State {
  currentRouteData: CurrentRouteData;
}

const initialState: State = {
  currentRouteData: {
    // title: '',
    // showTitle: false,
    showBreadcrumb: false,
    breadCrumbSegments: [],
    isList: false,
    listType: '',
    isDetail: false,
    detailType: '',
    feature: ''
  }
}

export function routerReducer(state = initialState, action: RouterActions.Actions): State {
 
  switch (action.type) {

    case RouterActions.STORE_CURRENT_ROUTE_DATA: {
      return {
        ...state,
        currentRouteData: action.currentRouteData
      }
    }
      
    default: return state;
  }

}
