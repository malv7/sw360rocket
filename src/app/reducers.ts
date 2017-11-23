import { ActionReducerMap } from '@ngrx/store';
import * as fromComponent from './component/state/component.reducer';
import { ComponentDataLayout } from './component/state/component.models';

export interface State {
  component: fromComponent.State;
}

// Feature reducers
// import { componentReducer } from './component/state/component.reducer';

export const reducers: ActionReducerMap<any> = {
  // TODO: collect all reducers globally or register by feature modules?
};

export function selectComponents(state: State): ComponentDataLayout[] {
  return state.component.components;
}