import { FormsModule } from '@angular/forms';
import { PostsService } from './services/posts.service';
import { PostsRootComponent } from './components/posts-root/posts-root.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PostsRootComponent
  ],
  providers: [
    PostsService
  ],
  exports: [
    PostsRootComponent
  ]
})
export class PostsModule { }