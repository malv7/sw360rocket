import { Action } from '@ngrx/store';
import { Pizza } from './pizza.reducer';

export const CREATE = '[Pizza] Create';
export const UPDATE = '[Pizza] Update';
export const DELETE = '[Pizza] Delete';

export class Create implements Action {
  readonly type = CREATE;
  constructor(public pizza: Pizza) { }
}

// Read

export class Update implements Action {
  readonly type = UPDATE;
  constructor(
    public id: string,
    public changes: Partial<Pizza>
  ) { }
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) { }
}

export type PizzaActions
  = Create
  | Update
  | Delete;