import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import { ComponentDataLayout } from '../../state/component.models';
import { RenderArrayInNgSmartTableComponent } from './render-array-in-ng-smart-table.component';
import { RenderCreatorInNgSmartTableComponent } from './render-creator-in-ng-smart-table.component';
import { Router, Routes } from '@angular/router';
import * as RouterActions from './../../../router/state/router.actions';

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  edit = false;

  components: Observable<ComponentDataLayout[]>;
  
  constructor(private store: Store<fromRoot.State>, public router: Router) { }

	ngOnInit() {
    this.components = this.store.select(fromRoot.selectComponents);
	}

  go(component: ComponentDataLayout) {
    this.store.dispatch(new RouterActions.Go({
      path: ['/component'],
    }));
  }

}
