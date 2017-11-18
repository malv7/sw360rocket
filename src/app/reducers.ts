import { ActionReducerMap } from '@ngrx/store';

// Feature reducers
import { componentReducer } from './component/state/component.reducer';

export const reducers: ActionReducerMap<any> = {
  component: componentReducer
};