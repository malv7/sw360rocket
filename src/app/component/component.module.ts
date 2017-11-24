import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { componentReducer } from './state/component.reducer';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { SingleComponentComponent } from './components/single-component/single-component.component';
import { ComponentRootComponent } from './components/component-root/component-root.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  imports: [
		Ng2SmartTableModule,
    SharedModule,
    StoreModule.forFeature('component', componentReducer)
  ],
  declarations: [ComponentListComponent, SingleComponentComponent, ComponentRootComponent]
})
export class ComponentModule { }
