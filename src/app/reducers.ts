import { ActionReducerMap } from '@ngrx/store';
import * as fromComponent from './component/state/component.reducer';
import * as fromProject from './project/state/project.reducer';
import * as fromListSelect from './shared/state/list-select/list-select.reducer';
import * as fromRouter from './router/state/router.reducer';
import * as fromModel from './state/model.reducer';

export interface State {
  component: fromComponent.State;
  project: fromProject.State;
  listSelect: fromListSelect.State;
  customRouter: fromRouter.State;
  model: fromModel.State;
}

// Feature reducers
// import { componentReducer } from './component/state/component.reducer';

export const reducers: ActionReducerMap<any> = {
  // TODO: collect all reducers globally or register by feature modules?
};

export function selectComponents(state: State) {
  return state.component.components;
}

export function selectSelectedListElements(state: State) {
  return state.listSelect.selectedElements;
}

export function selectSelectedListElementsCount(state: State) {
  return state.listSelect.selectedElementsCount;
}

export function selectProjects(state: State) {
  return state.project.projects;
}

export function selectCurrentRouteData(state: State) {
  return state.customRouter.currentRouteData;
}

export function selectBreadcrumbSegments(state: State) {
  return state.customRouter.currentRouteData.breadCrumbSegments;
}

