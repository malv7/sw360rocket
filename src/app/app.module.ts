import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// App root component
import { AppComponent } from './app.component';

// Structure
import { StructureModule } from './structure/structure.module';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '../../playground/node_modules/@ngrx/store-devtools';
import { reducers } from './reducers';

// Features
import { ComponentModule } from './component/component.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Store
    StoreModule.forRoot(reducers),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 10 // retains only last 10 states.
    // }),
    
    // Layout
    StructureModule,

    // Features
    ComponentModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
