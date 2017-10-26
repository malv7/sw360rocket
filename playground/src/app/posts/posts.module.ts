import { NewPostComponent } from './components/new-post/new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from './services/posts.service';
import { PostsRootComponent } from './components/posts-root/posts-root.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuiModule
  ],
  declarations: [
    PostsRootComponent,
    NewPostComponent
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }