// ng
import { Injectable } from '@angular/core';
// ngrx
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { PostsService } from './../services/posts.service';
import { Post } from './../models/post.model';
import * as fromRoot from './../../reducers';
import * as PostActions from './../actions/post.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class PostEffects {

  constructor(
    private store: Store<fromRoot.State>,
    private actions: Actions,
    private postService: PostsService
  ) { }

  @Effect()
  posts: Observable<Action> = this.actions.ofType(PostActions.GET_POSTS)
    .switchMap((action: PostActions.GetPosts) => this.postService.getPosts())
    // .delay(3000)
    .map(posts => new PostActions.GetPostsSuccess(posts));

  @Effect()
  create: Observable<Action> = this.actions.ofType(PostActions.CREATE_POST)
    .do((action: PostActions.CreatePost) => this.postService.post(action.post))
    .map(post => {
      console.log(post);
      return new PostActions.CreatePostSuccess()
    });

}