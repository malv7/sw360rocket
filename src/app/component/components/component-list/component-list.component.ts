import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


interface sw360Component {
	type: string,
	vendorNames: string[],
	name: string,
	mainLicences: string,
	componentType: string,
	createdOn: string
}

const DUMMY_COMPONENT: sw360Component[] = [{
	type: 'component',
	vendorNames: ['Apache'],
	name: 'Tomcat',
	mainLicences: 'MIT',
	componentType: 'OSS',
	createdOn: '2010-09-08'
},
{
	type: 'component',
	vendorNames: ['Bosh'],
	name: 'sw360',
	mainLicences: 'CC',
	componentType: 'OSS',
	createdOn: '2017-11-24'
}];

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

	settings = {
		actions: {
			add: false,
			edit: true,
			delete: true,
			position: 'right'
		},
		mode: 'external',
		columns: {
			vendorNames: {
				title: 'Vendor'
			},
			name: {
				title: 'Component Name'
			},
			mainLicences: {
				title: 'Main Licences'
			},
			componentType: {
				title: 'Component Type'
			},
			createdOn: {
				title: 'created on'
			}
		}
	};


	data:sw360Component[];

	constructor() { }

	ngOnInit() {
		this.getDummyData().subscribe(data=>this.data = data);
		console.log(this.settings);
	}

	getDummyData(): Observable<sw360Component[]> {
		return Observable.of(DUMMY_COMPONENT);
	}

}
