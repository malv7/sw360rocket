import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { componentReducer } from './state/component.reducer';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { SingleComponentComponent } from './components/single-component/single-component.component';
import { ReleasesComponent } from './components/single-component/releases/releases.component';
import { ComponentRootComponent } from './components/component-root/component-root.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
		StoreModule.forFeature('component', componentReducer),
		RouterModule

	],
  declarations: [ComponentListComponent, SingleComponentComponent, ComponentRootComponent, ReleasesComponent]
})
export class ComponentModule { }
