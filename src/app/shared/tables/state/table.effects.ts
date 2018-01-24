import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { State } from './../../../state';
import { Store } from '@ngrx/store';
import * as TableActions from './table.actions';
import * as fromTable from './table.reducer';

@Injectable()
export class TableEffects {

	constructor(
		private actions$: Actions,
		private store: Store<State>
	) { }

}
