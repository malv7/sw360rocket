import { ActionReducerMap } from '@ngrx/store';
import * as fromComponent from './component/state/component.reducer';
import * as fromProject from './project/state/project.reducer';
import * as fromListSelect from './shared/state/list-select/list-select.reducer';
import { ComponentDataLayout } from './component/state/component.models';
import { EmbeddedProject } from './project/state/project.models';

export interface State {
  component: fromComponent.State;
  project: fromProject.State;
  listSelect: fromListSelect.State;
}

// Feature reducers
// import { componentReducer } from './component/state/component.reducer';

export const reducers: ActionReducerMap<any> = {
  // TODO: collect all reducers globally or register by feature modules?
};

export function selectComponents(state: State): ComponentDataLayout[] {
  return state.component.components;
}

export function selectSelectedListElements(state: State) {
  return state.listSelect.selectedElements;
}

export function selectProjects(state: State): EmbeddedProject[] {
  return state.project.projects;
}