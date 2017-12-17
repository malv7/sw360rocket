import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// https://github.com/angular/flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NotImplementedYetComponent } from './components/not-implemented-yet/not-implemented-yet.component';
import { StoreModule } from '@ngrx/store';
import { listSelectReducer } from './state/list-select/list-select.reducer';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
    RouterModule,
    StoreModule.forFeature('listSelect', listSelectReducer)
	],
	declarations: [
		TabNavigationComponent,
    OverviewComponent,
    NotImplementedYetComponent
	],
	exports: [
		// modules
		CommonModule,
		FlexLayoutModule,
		RouterModule,

		// components
		TabNavigationComponent,
		OverviewComponent
	],
})
export class SharedModule { }
