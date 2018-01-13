import { Action } from '@ngrx/store';
import * as fromTable from './table.reducer';
import { ReleaseContextRoute } from '../../../router/router.api';

// Table selections
export const CLEAR_TABLE_SELECTIONS  = '[List Selection] Clear table selections';
export const SELECT_ALL = '[List Selection] Select all rendered table-elements';
export const TOGGLE_TABLE_SELECTION = '[List Selection] Toggle table selection';

export const NEXT_PAGE = '[Pagination] Next page';
export const PREVIOUS_PAGE = '[Pagination] Previous page';
export const SET_PAGE = '[Pagination] Set page';
export const SET_TOTAL_ELEMENTS_AMOUNT = '[Pagionation] Set total elements amount';
export const SET_ELEMENTS_PER_PAGE ='[Pagionation] Set elements per page';
export const CHANGE_PAGE = '[Pagination] Change Page';

export const INITIALIZE_TABLE = '[Table] Initialize';

export const SET_RELEASE_TABLE_DATA = '[Table] Set Release table data'

// Table selections
export class ClearTableSelections implements Action {
  readonly type = CLEAR_TABLE_SELECTIONS;
  constructor() { }
}
export class SelectAll implements Action {
  readonly type = SELECT_ALL;
  constructor(public ids: string[]) { }
}
export class ToggleTableSelection implements Action {
  readonly type = TOGGLE_TABLE_SELECTION;
  constructor(public id: string) { }
}

export class NextPage implements Action {
	readonly type = NEXT_PAGE;
	constructor() { }
}

export class PreviousPage implements Action {
	readonly type = PREVIOUS_PAGE;
	constructor(){}
}

export class ChangePage implements Action {
  readonly type = CHANGE_PAGE;
  constructor(public pageNumber: number) { }
}

export class SetPage implements Action {
	readonly type = SET_PAGE;
	constructor(public pageNumber: number){}
}

export class SetTotalElementsAmount implements Action {
	readonly type = SET_TOTAL_ELEMENTS_AMOUNT;
	constructor(public totalElementsAmount: number){}
}

export class SetSetElementsPerPage implements Action {
	readonly type = SET_ELEMENTS_PER_PAGE;
	constructor(public elementsPerPage: number){}
}

export class InitializeTable implements Action {
  readonly type = INITIALIZE_TABLE;
}

export class SetReleaseTableData implements Action {
  readonly type = SET_RELEASE_TABLE_DATA;
  constructor(public releaseContextRoute: ReleaseContextRoute) { }
}

export type All =
  ClearTableSelections |
  SelectAll |
  ToggleTableSelection |
	NextPage|
	PreviousPage|
	SetPage |
	SetTotalElementsAmount|
  SetSetElementsPerPage |
  ChangePage | // TODO: needed?
  InitializeTable |
  SetReleaseTableData;
