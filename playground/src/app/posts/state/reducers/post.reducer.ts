import { Post } from './../models/post.model';
import * as PostActions from './../actions/post.actions';

type Action = PostActions.All;

export interface State {
  posts: Post[],
  isFetching: boolean,
  isCreating: boolean
}

const initialState: State = {
  posts: [],
  isFetching: false,
  isCreating: false
}

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {
  
    case PostActions.GET_POSTS: {
      return { ...state, isFetching: true }
    }

    case PostActions.GET_POSTS_SUCCESS: {
      return { ...state, posts: action.posts, isFetching: false }
    }

    case PostActions.CREATE_POST: {
      return { ...state, isCreating: true }
    }

    case PostActions.CREATE_POST_SUCCESS: {
      return { ...state, isCreating: false }
    }
  
    default: { return state; }

  } // switch

}