// ng
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as fromModel from './../../../state/model.reducer';
import * as StructureActions from './../../../structure/state/structure.actions';
import * as RouterActions from './../../../router/state/router.actions';
import { EmbeddedSW360Component } from './../../../state/models';

// check
import { Router, Routes } from '@angular/router';
import { TableService } from '../../../shared/tables/services/table.service';

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  components: Observable<EmbeddedSW360Component[]>;

  constructor(private store: Store<fromRoot.State>, private tableService: TableService) { }

	ngOnInit() {
    this.store.dispatch(new StructureActions.SetTitle('Components'));
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
}
