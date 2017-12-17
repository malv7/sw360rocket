import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { componentReducer } from './state/component.reducer';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { SingleComponentComponent } from './components/single-component/single-component.component';

import { ReleasesComponent } from './components/single-component/releases/releases.component';
import { ComponentRootComponent } from './components/component-root/component-root.component';
import { RouterModule, Routes } from '@angular/router';

import { TableSelectService } from '../shared/services/tables/table-select.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttachmentsComponent } from './components/single-component/attachments/attachments.component';

import { VulnerabilitiesComponent } from './components/single-component/vulnerabilities/vulnerabilities.component';
//import { AttachmentsComponent } from './components/single-component/attachments/attachments.component';
import { DetailComponent } from './components/single-component/detail/detail.component';
import { CreateComponentComponent } from './components/create-component/create-component.component';
import { PopUpService } from './components/create-component/pop-up.service';
import { FormValidationService } from './components/create-component/form-validation.service';
import { EmployeListComponent, FilterPipe } from './components/create-component/employe-list/employe-list.component';
import { SuiModule, SuiRatingModule, SuiCheckboxModule } from 'ng2-semantic-ui';

@NgModule({
  imports: [
    SharedModule,
		StoreModule.forFeature('component', componentReducer),
		RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SuiModule, SuiRatingModule, SuiCheckboxModule
	],
	providers:[TableSelectService, PopUpService, FormValidationService],
  declarations: [
    ComponentListComponent,
    SingleComponentComponent,
    ComponentRootComponent,
    ReleasesComponent,
    VulnerabilitiesComponent,
    DetailComponent,
    CreateComponentComponent,
    EmployeListComponent,
    FilterPipe
  ]
})
export class ComponentModule { }
