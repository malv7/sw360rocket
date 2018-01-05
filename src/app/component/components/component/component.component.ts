import { RouteConfiguration } from './../../../router/state/router.models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import { ComponentDataLayout } from '../../state/component.models';

@Component({
  selector: 'sw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {

	tabs: RouteConfiguration[] = [
		{ route: 'details', title: 'Details' },
		{ route: 'releases', title: 'Releases' },
    { route: 'attachments', title: 'Attachments' }
  ];

  components: Observable<ComponentDataLayout[]>;
  
  currentComponent: ComponentDataLayout;
  
	constructor(private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.components = this.store.select(fromRoot.selectComponents);
		this.components.subscribe(componentData => this.currentComponent=componentData[0])

		// console.log(this.currentComponent);
	}

}
