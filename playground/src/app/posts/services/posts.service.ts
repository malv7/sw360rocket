import { Observable } from 'rxjs/Observable';
import { Post } from './../state/models/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  post(post: Post): void {
    this.http.post(POSTS_URL, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(POSTS_URL);
  }

}