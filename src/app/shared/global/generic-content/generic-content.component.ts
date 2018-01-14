import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'sw-generic-content',
	template: `
		<div class="tab-navigation-wrapper">
		<sw-tab-navigation [tabs]="tabs"></sw-tab-navigation>
		</div>
		<div fxLayout="row">
			<div fxFlex>
			<router-outlet></router-outlet>
			</div>
			<sw-overview fxFlex="23em" fxHide.lt-lg="true">
				<ng-content></ng-content>
			</sw-overview>
		</div>
	`
})
export class GenericContentComponent implements OnInit {

	@Input() tabs;

	constructor() { }

	ngOnInit() {
	}

}
