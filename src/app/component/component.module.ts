import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { componentReducer } from './state/component.reducer';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { SingleComponentComponent } from './components/single-component/single-component.component';
import { ComponentRootComponent } from './components/component-root/component-root.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CreateComponentComponent } from './components/create-component/create-component.component';
import { EmployeListComponent, FilterPipe } from './components/create-component/employe-list/employe-list.component';
import {SuiCheckboxModule, SuiRatingModule, SuiModule} from 'ng2-semantic-ui';
import { PopUpService } from './components/create-component/pop-up.service';
@NgModule({
  imports: [
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('component', componentReducer),
    SuiModule, SuiRatingModule,SuiCheckboxModule
  ],
  declarations: [ComponentListComponent, SingleComponentComponent, ComponentRootComponent, CreateComponentComponent, EmployeListComponent, FilterPipe],
  exports:[FilterPipe],
  providers: [
    PopUpService
  ]
})
export class ComponentModule { }
