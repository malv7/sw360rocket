import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface MichiDummyComponent {
	name: string;
	description: string;
}

const DUMMY_COMPONENT: MichiDummyComponent = {
	name: 'xyz',
	description: 'abc'
};

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		this.getDummyData();
	}

	getDummyData(): Observable<MichiDummyComponent> {
		return Observable.of(DUMMY_COMPONENT);
	}

}
