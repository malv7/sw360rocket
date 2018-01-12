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
import { ComponentCreateComponent } from './components/component-create/component-create.component';

// TODO: check
import { TableSelectService } from '../shared/services/tables/table-select.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpService } from './components/component-create/pop-up.service';
import { FormValidationService } from './components/component-create/form-validation.service';
import { EmployeListComponent, FilterPipe } from './components/component-create/employe-list/employe-list.component';
import { SuiModule, SuiRatingModule, SuiCheckboxModule } from 'ng2-semantic-ui';
import { ComponentOverviewComponent } from './components/component-overview/component-overview.component';
import { ReleasesWidgetComponent } from './components/releases-widget/releases-widget.component';

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
    ComponentCreateComponent,
    EmployeListComponent,
    FilterPipe,
		ComponentOverviewComponent,
		ReleasesWidgetComponent
  ]
})
export class ComponentModule { }
