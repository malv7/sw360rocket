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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from './components/component-create/form-validation.service';
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
	providers:[FormValidationService],
  declarations: [
    ComponentListComponent,
    ComponentComponent,
    ComponentDetailsComponent,
    ComponentCreateComponent,
		ComponentOverviewComponent,
		ReleasesWidgetComponent
  ]
})
export class ComponentModule { }
