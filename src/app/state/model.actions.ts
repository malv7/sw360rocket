import { Action } from '@ngrx/store';
import { EmbeddedUser, User } from './models';

export const GET_USERS = '[User] Get Users';
export const GET_USER = '[User] Get User';

export class GetUsers implements Action {
  readonly type = GET_USERS;
  constructor(public users: EmbeddedUser[]) { }
}

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public user: User) { }
}

export type All = GetUsers | GetUser;