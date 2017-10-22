import * as fromPost from './posts/reducers/post.reducer';
import { Post } from './posts/models/post.model';

export interface State {
  post: fromPost.State,
}

export const reducers = {
  post: fromPost.reducer
}

export function selectPosts(state: State): Post[] {
  return state.post.posts;
}

export function selectIsFetching(state: State): boolean {
  return state.post.isFetching;
}