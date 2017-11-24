import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import { ComponentDataLayout } from '../../state/component.models';

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  components: Observable<ComponentDataLayout[]>

	settings = {
		actions: {
			add: true,
			edit: false,
			delete: false,
			position: 'right'
		},
		mode: 'external',
		columns: {
			vendors: {
				title: 'Vendor'
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
			}
		}
	};

	constructor(private store: Store<fromRoot.State>) { }

	ngOnInit() {
    this.components = this.store.select(fromRoot.selectComponents);
	}

}
