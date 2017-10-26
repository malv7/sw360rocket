import { Action } from '@ngrx/store';
import { Post } from './../models/post.model';

export const GET_POSTS =           '[Post] Get';
export const GET_POSTS_SUCCESS =   '[Post] Get Success';
export const CREATE_POST =         '[Post] Create';
export const CREATE_POST_SUCCESS = '[Post] Create Success';

export class GetPosts implements Action {
  readonly type = GET_POSTS;
}

export class GetPostsSuccess implements Action {
  readonly type = GET_POSTS_SUCCESS;
  constructor(public posts: Post[]) { }
}

export class CreatePost implements Action {
  readonly type = CREATE_POST;
  constructor(public post: Post) { }
}

export class CreatePostSuccess implements Action {
  readonly type = CREATE_POST_SUCCESS;
}

export type All
  = GetPosts
  | GetPostsSuccess
  | CreatePost
  | CreatePostSuccess;