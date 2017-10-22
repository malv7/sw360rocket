import { PostsService } from './../../services/posts.service';
import { Post } from './../../models/post.model';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as PostActions from './../../actions/post.actions';

@Component({
  selector: 'posts-root',
  template: `
    <h2 class="title" *ngIf="isFetching | async">IS FETCHING!!!!</h2>
    <button class="button" (click)="getPosts()">Get posts</button>
    <div class="message" *ngFor="let post of posts | async">
      {{ post | json }}
    </div>
    <input class="input" [(ngModel)]="title">
    <button class="button" (click)="post()">post</button>
  `
})
export class PostsRootComponent { 

  posts: Observable<Post[]>;
  isFetching: Observable<boolean>;
  title: string;

  constructor(private store: Store<fromRoot.State>) {
    this.posts = this.store.select(fromRoot.selectPosts);
    this.isFetching = this.store.select(fromRoot.selectIsFetching);
  }

  post(): void {

    const post: Post = {
      userId: 1,
      id: 1,
      title: this.title,
      body: ""
    }

    this.store.dispatch(new PostActions.CreatePost(post));
  }

  getPosts(): void {
    this.store.dispatch(new PostActions.GetPosts());
  }

}
