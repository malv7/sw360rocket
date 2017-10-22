import { PostEffects } from './posts/effects/post.effects';
import { PostsModule } from './posts/posts.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import{ StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      PostEffects
    ]),
    StoreDevtoolsModule.instrument(), // TODO: remove for production
    // Feature Modules
    PostsModule,
    SuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
