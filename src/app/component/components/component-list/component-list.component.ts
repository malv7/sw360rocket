import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import { ComponentDataLayout } from '../../state/component.models';
import { RenderArrayInNgSmartTableComponent } from './render-array-in-ng-smart-table.component';
import { RenderCreatorInNgSmartTableComponent } from './render-creator-in-ng-smart-table.component';
import { RouterModule, Routes } from '@angular/router';

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  components: Observable<ComponentDataLayout[]>;

	selected;
	settings = {
		actions: {
			add: false,
			edit: false,
			delete: false,
			position: 'right'
		},
		selectMode: 'multi',
		mode: 'external',
		columns: {
			vendors: {
				title: 'Vendor',
				type: 'custom',
        renderComponent: RenderArrayInNgSmartTableComponent
			},
			name: {
        title: 'Component Name'
			},
			// mainLicences: {
			// 	title: 'Main Licences'
			// },
			componentType: {
				title: 'Component Type'
			},
			createdOn: {
				title: 'created on'
			},
			createdBy: {
				title: 'created by',
				type: 'custom',
        renderComponent: RenderCreatorInNgSmartTableComponent
			}
		}
	};

	constructor(private store: Store<fromRoot.State>, public router: RouterModule) { }

	ngOnInit() {
    this.components = this.store.select(fromRoot.selectComponents);
	}

	rowSelected (event) {
		console.log('rowSelected')
		console.log(event);
		this.selected=event.selected;
		this.router.navigate(['your-route'])
	}

}
