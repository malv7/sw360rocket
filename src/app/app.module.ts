import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// App root component
import { AppComponent } from './app.component';

// Structure
import { StructureModule } from './structure/structure.module';

// Store
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';
import { RouterEffects } from './router/state/router.effects';

// Features
import { ComponentModule } from './component/component.module';
import { ProjectModule } from './project/project.module';
import { ReleaseModule } from './release/release.module';
import { UserModule } from './user/user.module';

import { Params, RouterStateSnapshot } from '@angular/router';
import { SwRouterModule } from './router/sw-router.module';

// Data
import { ModelModule } from './state/model.module';
import { TableEffects } from './shared/state/table/table.effects';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    const params = route.params;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export const routerReducers: ActionReducerMap<State> = {
  routerReducer: routerReducer
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // !!! Don't register modules that register store features
    // !!! before the store got initialized

    // Store
    StoreModule.forRoot(routerReducer),
    EffectsModule.forRoot([
			RouterEffects,
			TableEffects
    ]),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25 // retains only last n states.
    }),

    // Router
    SwRouterModule,

    // Layout
    StructureModule,

    // Data
    ModelModule,

    // Features
    ComponentModule,
    ProjectModule,
    ReleaseModule,
    UserModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
