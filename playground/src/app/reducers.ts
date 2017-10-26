import * as fromPost from './posts/state/reducers/post.reducer';
import { Post } from './posts/state/models/post.model';

// The store. This State collects all partial States.
export interface State {
  post: fromPost.State,
}

// Reducers. Collects all reducer functions.
export const reducers = {
  post: fromPost.reducer
}

// Selectors
// Selector functions are used to retrieve data from the store.

export function selectPosts(state: State): Post[] {
  return state.post.posts;
}

export function selectPostIsFetching(state: State): boolean {
  return state.post.isFetching;
}