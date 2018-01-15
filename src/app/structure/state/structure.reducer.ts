import * as StructureActions from './structure.actions';
import * as fromRoot from './../../state';

export interface Breadcrumb {
  active: boolean;
  segments: BreadcrumbSegment[];
}

export interface BreadcrumbSegment {
  route: string;
  name: string;
}


export enum MessageType {
  default,
  success,
  warning,
  error,
}

export interface Message {
  active: boolean;
  type: MessageType;
  text: string;
  durationInMs: number;
}

export interface State {
  title: string;
  message: Message;
  breadcrumb: Breadcrumb;
}

const initialState: State = {
  title: 'INITIAL TITLE STATE',
  message: {
    active: false,
    type: MessageType.default,
    text: '',
    durationInMs: 0
  },
  breadcrumb: {
    active: false,
    segments: []
  }
}

export function structureReducer(state = initialState, action: StructureActions.All) {
  switch (action.type) {

    case StructureActions.SET_TITLE: {
      return { ...state, title: action.title }
    }

    case StructureActions.SET_MESSAGE: {
      return { ...state, message: action.message }
    }

    case StructureActions.SET_BREADCRUMB: {
      return { ...state, breadcrumb: action.breadcrumb }
    }

    default: {
      return state;
    }
  }
}

export const selectTitle = (state: fromRoot.State) => state.structure.title;
export const selectMessage = (state: fromRoot.State) => state.structure.message;
export const selectBreadcrumb = (state: fromRoot.State) => state.structure.breadcrumb;
export const selectBreadcrumbActive = (state: fromRoot.State) => state.structure.breadcrumb.active;
export const selectBreadcrumbSegments = (state: fromRoot.State)  => state.structure.breadcrumb.segments;
