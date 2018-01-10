import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// https://github.com/angular/flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NotImplementedYetComponent } from './components/not-implemented-yet/not-implemented-yet.component';
import { StoreModule } from '@ngrx/store';
import { tableReducer } from './state/table/table.reducer';

import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ReleaseTableComponent } from './tables/release-table/release-table.component';
import { FormsModule } from '@angular/forms';
import { TableService } from './tables/services/table.service';
import { GenericFormElementComponent } from './components/forms/generic-form-element/generic-form-element.component';
import { PaginationComponent } from './tables/pagination/pagination.component';
import { GenericTableComponent } from './tables/generic-table/generic-table.component';
import { ReleaseTableHeaderComponent } from './tables/generic-table/release-table/release-table-header.component';
import { ReleaseTableBodyComponent } from './tables/generic-table/release-table/release-table-body.component';
import { ProjectTableHeaderComponent } from './tables/generic-table/project-table/project-table-header.component';
import { ProjectTableBodyComponent } from './tables/generic-table/project-table/project-table-body.component';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule,
    StoreModule.forFeature('table', tableReducer),
    FormsModule
	],
	declarations: [
		TabNavigationComponent,
    OverviewComponent,
    NotImplementedYetComponent,
    ActionButtonsComponent,
    SearchFilterComponent,
    ReleaseTableComponent,
    GenericFormElementComponent,
    PaginationComponent,
    GenericTableComponent,
    ReleaseTableHeaderComponent,
    ReleaseTableBodyComponent,
    ProjectTableHeaderComponent,
		ProjectTableBodyComponent
	],
	exports: [
		// modules
		CommonModule,
		FlexLayoutModule,
		RouterModule,

		// components
		TabNavigationComponent,
    OverviewComponent,
    ActionButtonsComponent,
    SearchFilterComponent,
    ReleaseTableComponent,
    GenericFormElementComponent,
    PaginationComponent,
    GenericTableComponent,
    ReleaseTableHeaderComponent,
    ReleaseTableBodyComponent,
    ProjectTableHeaderComponent,
		ProjectTableBodyComponent,

  ],
  providers: [TableService]
})
export class SharedModule { }
