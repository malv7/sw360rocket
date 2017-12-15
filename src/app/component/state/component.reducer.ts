import * as ComponentActions from './component.actions';
import { ComponentDataLayout, AttachmentDataLayout } from './component.models';

export interface State {
	components: ComponentDataLayout[];
	attachments: AttachmentDataLayout[];
}

const initialState = {
	components: [],
	attachments: []
}

export function componentReducer(state = initialState, action: ComponentActions.All): State {

  switch (action.type) {
    case ComponentActions.PROVIDE_MOCK_DATA: {
      return { ...state, components: action.components };
		};

		case ComponentActions.PROVIDE_MOCK_DATA_ATTACHMENTS: {
      return { ...state, attachments: action.attachments };
    }

    default: return state;
  }

}
