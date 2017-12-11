import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import { ComponentDataLayout } from '../../state/component.models';
import {Tab} from '../../../shared/components/tab-navigation/tab-navigation.component'
@Component({
  selector: 'sw-single-component',
  templateUrl: './single-component.component.html',
  styleUrls: ['./single-component.component.scss']
})
export class SingleComponentComponent implements OnInit {

	tabs: Tab[] = [
		{routerlink: '', title: 'Summary', classActive: 'ui button blue', classInactive: 'ui button grey'},
		{routerlink: 'releases', title: 'Releases', classActive: 'ui button green', classInactive: 'ui button grey'},
		{routerlink: 'vulnerabilities', title: 'Vulnerabilities', classActive: 'ui button red', classInactive: 'ui button grey'},
		{routerlink: 'attachments', title: 'Attachments', classActive: 'ui button yellow', classInactive: 'ui button grey'}]
	components: Observable<ComponentDataLayout[]>;
	currentComponent: ComponentDataLayout;
	constructor(private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.components = this.store.select(fromRoot.selectComponents);
		this.components.subscribe(componentData => this.currentComponent=componentData[0])

		console.log(this.currentComponent);
	}

}
