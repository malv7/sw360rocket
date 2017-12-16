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
import { FormsModule } from '@angular/forms';

import { AttachmentsComponent } from './components/single-component/attachments/attachments.component';

import { VulnerabilitiesComponent } from './components/single-component/vulnerabilities/vulnerabilities.component';
//import { AttachmentsComponent } from './components/single-component/attachments/attachments.component';
import { DetailComponent } from './components/single-component/detail/detail.component';

@NgModule({
  imports: [
    SharedModule,
		StoreModule.forFeature('component', componentReducer),
		RouterModule,
		FormsModule
	],
	providers:[TableSelectService],
  declarations: [
    ComponentListComponent,
    SingleComponentComponent,
    ComponentRootComponent,
    ReleasesComponent,
    VulnerabilitiesComponent,
    DetailComponent
  ]
})
export class ComponentModule { }
