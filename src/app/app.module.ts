import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// App root component
import { AppComponent } from './app.component';

// Structure
import { StructureModule } from './structure/structure.module';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
// Features
// The lab module is the new playground!
import { TheLabModule } from './the-lab/the-lab.module';
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
    StoreDevtoolsModule.instrument({
      maxAge: 25 // retains only last n states.
    }),

    // Layout
    StructureModule,

    // Features
		ComponentModule,
		TheLabModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
