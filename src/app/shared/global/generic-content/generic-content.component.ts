import { Component, OnInit, Input } from '@angular/core';
import { RouteConfiguration } from '../../../router/router.api';

@Component({
	selector: 'sw-generic-content',
	template: `
		<div class="tab-navigation-wrapper">
		<sw-tab-navigation [tabs]="tabs"></sw-tab-navigation>
		</div>
		<div fxLayout="row">
			<div fxFlex="1 1 auto">
				<router-outlet></router-outlet>
			</div>
			<sw-overview fxHide.lt-lg="true">
				<ng-content></ng-content>
			</sw-overview>
		</div>
	`,
	styles: [` SW-overview { min-width: 23em; } `]
})
export class GenericContentComponent implements OnInit {

	@Input() tabs: RouteConfiguration[];

	constructor() { }

	ngOnInit() {
	}

}
