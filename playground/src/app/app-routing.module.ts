import { SemanticRootComponent } from './semantic-playground/components/root/semantic-root.component';
import { LayoutRootComponent } from './layout/components/root/layout-root.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PostsRootComponent } from './posts/components/posts-root/posts-root.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SemanticRootComponent
  },
  {
    path: 'posts',
    component: PostsRootComponent
  },
  {
    path: 'rxjs',
    component: RxjsComponent
  },
  {
    path: 'semantic',
    component: SemanticRootComponent
  }

];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
