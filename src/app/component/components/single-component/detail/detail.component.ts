import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers';
import { ComponentDataLayout, ResolvedRelease } from '../../../state/component.models';
import { Router, Routes } from '@angular/router';
import * as RouterActions from './../../../../router/state/router.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'sw-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

	currentComponent: ComponentDataLayout;
	componentSub: Subscription;

	constructor(private store: Store<fromRoot.State>, public router: Router) { }

  ngOnInit() {
		this.componentSub = this.store.select(fromRoot.selectComponents).subscribe(componentData => {
      this.currentComponent=componentData[0];
      console.log(this.currentComponent);
    })
	}

	ngOnDestroy() {
		if(this.componentSub) this.componentSub.unsubscribe();
	}

}
