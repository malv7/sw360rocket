import * as TableActions from './table.actions';
import * as fromRoot from './../../../state';
import { getInitialState } from '../table.api';
import { ReleaseContextRoute } from '../../../router/router.api';

export interface Pagination {
  currentPage: number;
  elementsPerPage: number;
  totalElementsAmount: number;
}

export interface State {
  selectedElements: string[];
	selectedElementsCount: number;
	areAllElementsSelected: boolean;
  pagination: Pagination;
  releaseContextRoute: ReleaseContextRoute;
}

// TODO: check all state returns because of bugs
export function tableReducer(state = getInitialState(), action: TableActions.All): State {
  
  switch (action.type) {

    // TODO: check if subscribe updates
    case TableActions.SELECT_ALL: {
      const selectedElements = state.selectedElements;
      action.ids.forEach(e => {
        if (!selectedElements.includes(e)) selectedElements.push(e);
			});
			state.areAllElementsSelected = true;
			state.selectedElements = selectedElements;
			state.selectedElementsCount = selectedElements.length;
      return state;
    }

    case TableActions.CLEAR_TABLE_SELECTIONS: {
      return {
        ...state,
        selectedElements: [],
				selectedElementsCount: 0,
				areAllElementsSelected: false
      };
    }

    case TableActions.TOGGLE_TABLE_SELECTION: {
      const selectedElements = state.selectedElements;
      const index = selectedElements.indexOf(action.id, 0);
      (index > -1)
        ? selectedElements.splice(index, 1)
        : selectedElements.push(action.id);

      return {
        ...state,
        selectedElements: selectedElements,
        selectedElementsCount: selectedElements.length
      };
    }

    // TODO: check if subscribe updates
    case TableActions.NEXT_PAGE: {
      let offset = state.pagination.elementsPerPage * state.pagination.currentPage;
      if (offset < state.pagination.totalElementsAmount) {
        state.pagination.currentPage++;
      }
      return state;
    }

    // TODO: check if subscribe updates
    case TableActions.PREVIOUS_PAGE: {
      if (state.pagination.currentPage > 1) {
        state.pagination.currentPage--;
      }

      return state;
    }

    case TableActions.SET_PAGE: {
      return {
        ...state,
        pagination: {
          currentPage: action.pageNumber,
          elementsPerPage: state.pagination.elementsPerPage,
          totalElementsAmount: state.pagination.totalElementsAmount
        }
      };
    }

    // TODO: check if subscribe updates
    case TableActions.SET_TOTAL_ELEMENTS_AMOUNT: {
      if (action.totalElementsAmount > 0) {
        state.pagination.totalElementsAmount = action.totalElementsAmount;
      }
      return state;
    }

    case TableActions.SET_ELEMENTS_PER_PAGE: {
      return {
        ...state,
        pagination: {
          currentPage: 1,
          elementsPerPage: action.elementsPerPage,
          totalElementsAmount: state.pagination.totalElementsAmount
        }
      }
    }

    case TableActions.INITIALIZE_TABLE: {
      return getInitialState();
    }

    case TableActions.SET_RELEASE_TABLE_DATA: {
      return { ...state, releaseContextRoute: action.releaseContextRoute }
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

export const selectAreAllElementsSelected = (state: fromRoot.State) => {
	return state.table.areAllElementsSelected;
};

export const selectReleaseContextRoute = (state: fromRoot.State) => {
  return state.table.releaseContextRoute;
};