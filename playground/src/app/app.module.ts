// angular
import { NgModule }                     from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { BrowserModule }                from '@angular/platform-browser';
import { HttpClientModule }             from '@angular/common/http'

// root component
import { AppComponent }                 from './app.component';

// ngrx
import { StoreModule }                  from '@ngrx/store';
import{ StoreDevtoolsModule }           from '@ngrx/store-devtools';
// store
import { reducers }                     from './reducers';
// effects
import { EffectsModule }                from '@ngrx/effects';
import { PostEffects }                  from './posts/state/effects/post.effects';

// Feature Modules
import { NavigationModule } from './navigation/navigation.module';
import { PostsModule }                  from './posts/posts.module';
import { RxjsModule }                   from './rxjs/rxjs.module';
import { AppRoutingModule }             from './app-routing.module';
import { SemanticPlaygroundModule }     from './semantic-playground/semantic-playground.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      PostEffects
      // <-- register new effects
    ]),
    StoreDevtoolsModule.instrument(), // TODO: remove for production
    
    // Feature Modules
    PostsModule,
    RxjsModule,
    SemanticPlaygroundModule,
    NavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
