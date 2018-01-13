// ng
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Store
import { Store } from '@ngrx/store';
import { State } from './../../../state';
import * as fromModel from './../../../state/model.reducer';
import * as RouterActions from './../../../router/state/router.actions';

// Data
import { EmbeddedSW360Component } from './../../../state/models';

// Router
import { COMPONENTS, CREATE } from './../../../router/router.api';

// Table
import { TableService } from '../../../shared/tables/services/table.service';

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html'
})
export class ComponentListComponent implements OnInit {

  components: Observable<EmbeddedSW360Component[]>;
  constructor(private store: Store<State>, private tableService: TableService) { }

	ngOnInit() {
		this.components = this.store.select(fromModel.selectComponents);
	}

  go(component: EmbeddedSW360Component) {
		this.tableService.go(component);
	}

	selectOne(component: EmbeddedSW360Component) {
		this.tableService.selectOne(component);
	}

	selectAll() {
		this.tableService.selectAll(this.components);
  }
  
  // Actions
  create = () => this.store.dispatch(new RouterActions.Go({ path: [COMPONENTS + '/' + CREATE] }));
  clone  = () => console.log("ComponentListComponent clone action");
  delete = () => console.log("ComponentListComponent delete action");

};
