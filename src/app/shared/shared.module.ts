import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// https://github.com/angular/flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabNavigationComponent } from './details/components/tab-navigation/tab-navigation.component';
import { OverviewComponent } from './details/components/overview/overview.component';
import { NotImplementedYetComponent } from './global/components/not-implemented-yet/not-implemented-yet.component';
import { StoreModule } from '@ngrx/store';
import { tableReducer } from './tables/state/table.reducer';

import { ActionButtonsComponent } from './tables/components/action-buttons/action-buttons.component';
import { SearchFilterComponent } from './tables/components/search-filter/search-filter.component';
import { FormsModule } from '@angular/forms';
import { TableService } from './tables/services/table.service';
import { GenericFormElementComponent } from './forms/components/generic-form-element/generic-form-element.component';
import { PaginationComponent } from './tables/components/pagination/pagination.component';
import { GenericTableComponent } from './tables/components/generic-table/generic-table.component';
import { TableSelectComponent } from './tables/components/table-select/table-select.component';
import { ActionButtonComponent } from './tables/components/action-buttons/action-button.component';
import { EffectsModule } from '@ngrx/effects';
import { TableEffects } from './tables/state/table.effects';
import { GenericContentComponent } from './global/generic-content/generic-content.component';
import { AttachmentsTableComponent } from './attachments-table/attachments-table.component';
import { TagComponent } from './forms/components/tag/tag.component';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule,
    StoreModule.forFeature('table', tableReducer),
    EffectsModule.forFeature([TableEffects]),
    FormsModule
	],
	declarations: [
		TabNavigationComponent,
    OverviewComponent,
    NotImplementedYetComponent,
    ActionButtonsComponent,
    SearchFilterComponent,
    GenericFormElementComponent,
    PaginationComponent,
    GenericTableComponent,
    TableSelectComponent,
    ActionButtonComponent,
    GenericContentComponent,
    AttachmentsTableComponent,
    TagComponent,
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
    GenericFormElementComponent,
    GenericTableComponent,
    TableSelectComponent,
		ActionButtonComponent,
    GenericContentComponent,
    TagComponent,
  ],
  providers: [TableService]
})
export class SharedModule { }
