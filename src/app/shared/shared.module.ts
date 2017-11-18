import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// https://github.com/angular/flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule
	],
	declarations: [
		TabNavigationComponent,
		OverviewComponent
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
