import { ActionReducerMap } from '@ngrx/store';
import * as fromComponent from './component/state/component.reducer';
import * as fromProject from './project/state/project.reducer';
import * as fromTable from './shared/state/table/table.reducer';
import * as fromRouter from './router/state/router.reducer';
import * as fromModel from './state/model.reducer';
import * as fromStructure from './structure/state/structure.reducer';

export interface State {
  component: fromComponent.State;
  project: fromProject.State;
  table: fromTable.State;
  customRouter: fromRouter.State;
  model: fromModel.State;
  structure: fromStructure.State;
}

// Feature reducers
// import { componentReducer } from './component/state/component.reducer';

export const reducers: ActionReducerMap<any> = {
  // TODO: collect all reducers globally or register by feature modules?
};

export function selectComponents(state: State) {
  return state.component.components;
}
export function selectProjects(state: State) {
  return state.project.projects;
}

export function selectLastRoute(state: State) {
  return state.customRouter.lastRoute;
}

export function selectCurrentRoute(state: State) {
  return state.customRouter.currentRoute;
}

export function selectBreadcrumbSegments(state: State) {
  return state.customRouter.currentRoute.breadCrumbSegments;
}

