import { PostsService } from './../../services/posts.service';
import { Post } from './../../models/post.model';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as PostActions from './../../actions/post.actions';

interface Bash {
  n: number;
}

@Component({
  selector: 'posts-root',
  templateUrl: './posts-root.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [` .gap { margin-bottom: 2em } `]
})
export class PostsRootComponent { 

  posts: Observable<Post[]>;
  isFetching: Observable<boolean>;
  title: string;
  asdas: Bash;
  asdasd: number;

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
    this.asdasd = Math.random();
    this.asdas.n = Math.random();
  }

  getPosts(): void {
    this.store.dispatch(new PostActions.GetPosts());
  }

}
