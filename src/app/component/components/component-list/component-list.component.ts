// ng
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as fromModel from './../../../state/model.reducer';
import * as RouterActions from './../../../router/state/router.actions';
import { EmbeddedSW360Component } from './../../../state/models';

// check
import { Router, Routes } from '@angular/router';

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  components: Observable<EmbeddedSW360Component[]>;

  constructor(private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.components = this.store.select(fromModel.selectComponents);
		this.components.subscribe(x => console.log(x));
	}

  go(id: string) {
    this.store.dispatch(new RouterActions.Go({ path: ['/components', id]}));
  }

}
