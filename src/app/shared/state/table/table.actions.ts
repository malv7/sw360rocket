import { Action } from '@ngrx/store';

// Table selections
export const CLEAR_TABLE_SELECTIONS  = '[List Selection] Clear table selections';
export const ADD_TABLE_SELECTIONS = '[List Selection] Add table selections';
export const TOGGLE_TABLE_SELECTION = '[List Selection] Toggle table selection';

export const NEXT_PAGE = '[Pagination] Next page';
export const PREVIOUS_PAGE = '[Pagination] Previous page';
export const SET_PAGE = '[Pagination] Set page';
export const SET_TOTAL_ELEMENTS_AMOUNT = '[Pagionation] Set total elements amount';
export const SET_ELEMENTS_PER_PAGE ='[Pagionation] Set elements per page';
export const CHANGE_PAGE = '[Pagination] Change Page';



// Table selections
export class ClearTableSelections implements Action {
  readonly type = CLEAR_TABLE_SELECTIONS;
  constructor() { }
}
export class AddTableSelections implements Action {
  readonly type = ADD_TABLE_SELECTIONS;
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



export type All =
  ClearTableSelections |
  AddTableSelections |
  ToggleTableSelection |
	NextPage|
	PreviousPage|
	SetPage |
	SetTotalElementsAmount|
  SetSetElementsPerPage |
  ChangePage;
