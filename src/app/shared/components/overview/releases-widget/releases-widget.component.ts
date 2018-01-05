import { Component, OnInit } from '@angular/core';
import { ComponentDataLayout } from '../../../../component/state/component.models';
import * as fromRoot from './../../../../reducers';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'sw-releases-widget',
  templateUrl: './releases-widget.component.html',
  styleUrls: ['./releases-widget.component.scss']
})
export class ReleasesWidgetComponent implements OnInit {

	components: Observable<ComponentDataLayout[]>;
	currentComponent: ComponentDataLayout;
  constructor(private store: Store<fromRoot.State>, public router: Router) { }


	ngOnInit() {
		this.components = this.store.select(fromRoot.selectComponents);
		this.components.subscribe(componentData => this.currentComponent=componentData[0])
	}

}
