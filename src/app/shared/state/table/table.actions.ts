import { Action } from '@ngrx/store';

export const CLEAR  = '[List Selection] Clear';
export const ADD_MANY = '[List Selection] Add many';
export const TOGGLE_ONE = '[List Selection] Toggle one';
export const NEXT_PAGE = '[Pagination] Next page';
export const PREVIOUS_PAGE = '[Pagination] Previous page';
export const SET_PAGE = '[Pagination] Set page';
export const SET_TOTAL_ELEMENTS_AMOUNT = '[Pagionation] Set total elements amount';
export const SET_ELEMENTS_PER_PAGE ='[Pagionation] Set elements per page';
export class Clear implements Action {
  readonly type = CLEAR;
  constructor() { }
}

export class AddMany implements Action {
  readonly type = ADD_MANY;
  constructor(public ids: string[]) { }
}

export class ToggleOne implements Action {
  readonly type = TOGGLE_ONE;
  constructor(public id) { }
}

export class NextPage implements Action {
	readonly type = NEXT_PAGE;
	constructor(){}
}

export class PreviousPage implements Action {
	readonly type = PREVIOUS_PAGE;
	constructor(){}
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
  Clear |
  AddMany |
	ToggleOne |
	NextPage|
	PreviousPage|
	SetPage |
	SetTotalElementsAmount|
	SetSetElementsPerPage;
