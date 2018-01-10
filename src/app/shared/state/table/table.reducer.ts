import * as TableActions from './table.actions';
import * as fromRoot from './../../../reducers';

export interface Pagination {
  currentPage: number;
  elementsPerPage: number;
  totalElementsAmount: number;
}

export interface State {
  selectedElements: string[];
  selectedElementsCount: number;
  pagination: Pagination;
}

const initialState: State = {
  selectedElements: [],
  selectedElementsCount: 0,
  pagination: {
    currentPage: 1,
    elementsPerPage: 10,
    totalElementsAmount: 101
  }
};

export function tableReducer(state = initialState, action: TableActions.All): State {

  switch (action.type) {

    case TableActions.ADD_TABLE_SELECTIONS: {
      const selectedElements = state.selectedElements;
      action.ids.forEach(e => {
        if (!selectedElements.includes(e)) selectedElements.push(e);
      });
      return {
        ...state,
        selectedElements: selectedElements,
        selectedElementsCount: selectedElements.length
      };
    }

    case TableActions.CLEAR_TABLE_SELECTIONS: {
      return {
        ...state,
        selectedElements: [],
        selectedElementsCount: 0
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

    case TableActions.NEXT_PAGE: {
      let offset = state.pagination.elementsPerPage * state.pagination.currentPage;
      if (offset < state.pagination.totalElementsAmount) {
        state.pagination.currentPage++;
      }
      return state;
    }

    case TableActions.PREVIOUS_PAGE: {
      if (state.pagination.currentPage > 1) {
        state.pagination.currentPage--;
      }

      return state;
    }

    case TableActions.SET_PAGE: {
      state.pagination.currentPage = action.pageNumber;
      return state;
    }

    case TableActions.SET_TOTAL_ELEMENTS_AMOUNT: {
      if (action.totalElementsAmount > 0) {
        state.pagination.totalElementsAmount = action.totalElementsAmount;
      }
      return state;
    }

    case TableActions.SET_ELEMENTS_PER_PAGE: {
      if (action.elementsPerPage > 0) {
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
