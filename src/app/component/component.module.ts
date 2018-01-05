// ng
import { NgModule } from '@angular/core';

// Shared
import { SharedModule } from '../shared/shared.module';

// Store
import { StoreModule } from '@ngrx/store';
import { componentReducer } from './state/component.reducer';

// Components
import { ComponentListComponent } from './components/component-list/component-list.component';
import { ComponentComponent } from './components/component/component.component';
import { ComponentDetailsComponent } from './components/component/details/component-details.component';
import { CreateComponentComponent } from './components/create-component/create-component.component';

// TODO: check
import { TableSelectService } from '../shared/services/tables/table-select.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpService } from './components/create-component/pop-up.service';
import { FormValidationService } from './components/create-component/form-validation.service';
import { EmployeListComponent, FilterPipe } from './components/create-component/employe-list/employe-list.component';
import { SuiModule, SuiRatingModule, SuiCheckboxModule } from 'ng2-semantic-ui';

@NgModule({
  imports: [
    SharedModule,
		StoreModule.forFeature('component', componentReducer),
    FormsModule,
    ReactiveFormsModule,
    SuiModule, SuiRatingModule, SuiCheckboxModule
	],
	providers:[TableSelectService, PopUpService, FormValidationService],
  declarations: [
    ComponentListComponent,
    ComponentComponent,
    ComponentDetailsComponent,
    CreateComponentComponent,
    EmployeListComponent,
    FilterPipe
  ]
})
export class ComponentModule { }
