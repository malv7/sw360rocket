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
// entire app layout
import { LayoutModule }                 from './layout/layout.module';
import { PostsModule }                  from './posts/posts.module';
import { RxjsModule }                   from './rxjs/rxjs.module';
import { AppRoutingModule }             from './app-routing.module';
import { SemanticPlaygroundModule }     from './semantic-playground/semantic-playground.module';
import { PizzaModule } from './pizza/pizza.module';

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
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }), // TODO: remove for production
    
    // Feature Modules
    LayoutModule,
    PostsModule,
    RxjsModule,
    SemanticPlaygroundModule,
    PizzaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
