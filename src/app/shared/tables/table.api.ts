import * as fromTable from './state/table.reducer';

export const getInitialState = (): fromTable.State => {
  return {
    selectedElements: [],
    selectedElementsCount: 0,
    areAllElementsSelected: false,
    pagination: {
      currentPage: 1,
      elementsPerPage: 10,
      totalElementsAmount: 100
    },
    releaseContextRoute: {
      type: '',
      id: ''
    }
  }
};