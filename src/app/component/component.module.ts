import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { componentReducer } from './state/component.reducer';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { RenderArrayInNgSmartTableComponent } from './components/component-list/render-array-in-ng-smart-table.component';
import { RenderCreatorInNgSmartTableComponent } from './components/component-list/render-creator-in-ng-smart-table.component';
import { SingleComponentComponent } from './components/single-component/single-component.component';
import { ComponentRootComponent } from './components/component-root/component-root.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
		Ng2SmartTableModule,
    SharedModule,
		StoreModule.forFeature('component', componentReducer),
		RouterModule

	],
	entryComponents: [RenderArrayInNgSmartTableComponent,RenderCreatorInNgSmartTableComponent],
  declarations: [ComponentListComponent, SingleComponentComponent, ComponentRootComponent, RenderArrayInNgSmartTableComponent,RenderCreatorInNgSmartTableComponent]
})
export class ComponentModule { }
