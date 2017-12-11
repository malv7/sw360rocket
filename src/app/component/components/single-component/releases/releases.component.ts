import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers';
import { ComponentDataLayout, ResolvedRelease } from '../../../state/component.models';
import { Router, Routes } from '@angular/router';
import * as RouterActions from './../../../../router/state/router.actions';

@Component({
	selector: 'releases',
	templateUrl: './releases.component.html',
	styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  checked = [];

	components: Observable<ComponentDataLayout[]>;
	currentComponent: ComponentDataLayout;
  constructor(private store: Store<fromRoot.State>, public router: Router) { }

	ngOnInit() {
		this.components = this.store.select(fromRoot.selectComponents);
		this.components.subscribe(componentData => this.currentComponent=componentData[0])
	}

  goToRelease(release: ResolvedRelease) {
    this.store.dispatch(new RouterActions.Go({
      path: ['/release'],
    }));
	}
  
	all(){
		console.log('All checked"')
	}

	check(release: ResolvedRelease){
		console.log( 'Release checked!');
	}

}
