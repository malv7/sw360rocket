import * as TableActions from './table.actions';
import * as fromRoot from './../../../reducers';

interface SelectedElements {
  [id: string]: boolean;
}

export interface Pagination{
	currentPage: number;
	elementsPerPage: number;
	totalElementsAmount: number;
}

export interface State {
  selectedElements: SelectedElements;
	selectedElementsCount: number;
	pagination: Pagination;
}

const initialState: State = {
  selectedElements: { },
	selectedElementsCount: 0,
	pagination: {currentPage: 1,
		elementsPerPage: 10,
		totalElementsAmount: 101}
};

export function tableReducer(state = initialState, action: TableActions.All): State {

  switch (action.type) {

    // TODO: has a bug, that the selectSelectedList observable does not fire when this performed
    // anyway, the store gets mutated
    // Workarround: Select the list each time when an action should be performed and use take(1)
    case TableActions.TOGGLE_ONE: {

      if (!state.selectedElements[action.id]) {
        state.selectedElements[action.id] = true;
      } else {
        delete state.selectedElements[action.id];
      }

      state.selectedElementsCount = Object.keys(state.selectedElements).length;
      return state;
    }

    case TableActions.ADD_MANY: {
      state = { ...state, selectedElements: {} };
      action.ids.forEach(id => state.selectedElements[id] = true);
      state.selectedElementsCount = action.ids.length;
      return state;
    }

    case TableActions.CLEAR: {
      return { ...state, selectedElements: {}, selectedElementsCount: 0 };
		}

		case TableActions.NEXT_PAGE: {
			let offset = state.pagination.elementsPerPage*state.pagination.currentPage;
			if(offset<state.pagination.totalElementsAmount){
				state.pagination.currentPage++;
			}
			return state;
		}

		case TableActions.PREVIOUS_PAGE: {
			if(state.pagination.currentPage>1){
				state.pagination.currentPage--;
			}

			return state;
		}

		case TableActions.SET_PAGE: {
			let maxPage = Math.ceil(state.pagination.totalElementsAmount/state.pagination.elementsPerPage);
			if(action.pageNumber >0 && action.pageNumber < maxPage) {
				state.pagination.currentPage = action.pageNumber;
			}
			return state
		}

		case TableActions.SET_TOTAL_ELEMENTS_AMOUNT: {
			if(action.totalElementsAmount > 0){
			state.pagination.totalElementsAmount = action.totalElementsAmount;
			}
			return state;
		}

		case TableActions.SET_ELEMENTS_PER_PAGE: {
			if(action.elementsPerPage >0) {
				state.pagination.elementsPerPage = action.elementsPerPage;
				state.pagination.currentPage = 1;
			}
			return state;
		}


    default: return state;
  }

}

export function selectPagination(state: fromRoot.State) {
  return state.table.pagination;
}

export function selectSelectedListElements(state: fromRoot.State) {
  return state.table.selectedElements;
}

export function selectSelectedListElementsCount(state: fromRoot.State) {
  return state.table.selectedElementsCount;
}
