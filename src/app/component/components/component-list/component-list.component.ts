import { SW360ComponentTypes, SW360Component } from './../../../resources/resources.api';
// ng
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Store
import { Store } from '@ngrx/store';
import { State } from './../../../state';
import * as RouterActions from './../../../router/state/router.actions';
import * as fromComponent from './../../state/component.reducer';
import * as ComponentActions from './../../state/component.actions';
import * as fromTable from './../../../shared/tables/state/table.reducer';

// Data
import { EmbeddedSW360Component } from './../../../state/models';

// Router
import { COMPONENTS, CREATE, UrlSegments } from './../../../router/router.api';

// Table
import { TableService } from '../../../shared/tables/services/table.service';

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html'
})
export class ComponentListComponent implements OnInit {

	components: Observable<SW360Component[]>;
	constructor(private store: Store<State>, private tableService: TableService) { }

	ngOnInit() {
		this.components = this.store.select(fromComponent.selectComponents);
	}

	go(component: SW360Component) {
		this.store.dispatch(new RouterActions.GoSelfLink(component._links.self.href));
	}

	selectOne(component: EmbeddedSW360Component) {
		this.tableService.selectOne(component);
	}

	selectAll() {
		this.tableService.selectAll(this.components);
	}

	// Actions
	create = () => this.store.dispatch(new RouterActions.Go({ path: [UrlSegments.components + '/' + UrlSegments.create] }));
	clone = () => console.log("ComponentListComponent clone action");
	delete = () => this.store.select(fromTable.selectSelectedListElements).take(1).subscribe(selflinks => this.store.dispatch(new ComponentActions.Delete(selflinks)));


};
