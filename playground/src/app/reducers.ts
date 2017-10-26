import { ActionReducerMap } from '@ngrx/store';
import * as fromPost from './posts/state/reducers/post.reducer';
import { Post } from './posts/state/models/post.model';
import { pizzaReducer } from './pizza/pizza.reducer';

// The store. This State collects all partial States.
export interface State {
  post: fromPost.State,
}

// Reducers. Collects all reducer functions.
export const reducers: ActionReducerMap<any> = {
  post: fromPost.reducer,
  pizza: pizzaReducer
}

// Selectors
// Selector functions are used to retrieve data from the store.

export function selectPosts(state: State): Post[] {
  return state.post.posts;
}

export function selectPostIsFetching(state: State): boolean {
  return state.post.isFetching;
}