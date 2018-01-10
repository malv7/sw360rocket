import { Component, OnInit } from '@angular/core';
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

  constructor(private store: Store<fromRoot.State>) { }

	ngOnInit() {
		// this.components = this.store.select(fromRoot.selectComponents);
		// this.components.subscribe(componentData => this.currentComponent=componentData[0])
	}

}