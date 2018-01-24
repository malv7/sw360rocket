import { SW360Resource } from './../../../resources/resources.api';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as TableActions from './../../tables/state/table.actions';
import * as RouterActions from './../../../router/state/router.actions';
import { State } from './../../../state';
import { Observable } from "rxjs/Observable";
import * as fromTable from "../../tables/state/table.reducer"
import * as StructureActions from './../../../structure/state/structure.actions';

@Injectable()
export class TableService {

	constructor(private store: Store<State>) { }

	selectOne(resource: SW360Resource) {
		this.store.dispatch(new TableActions.ToggleTableSelection(resource._links.self.href));
	}

	selectAll(resources: Observable<SW360Resource[]>) {
		this.store.select(fromTable.selectAreAllElementsSelected).take(1).subscribe(areAllElementsSelected => {
			if (areAllElementsSelected) {
				this.store.dispatch(new TableActions.ClearTableSelections);
			} else {
				const selfLinks: string[] = [];
				resources.take(1).subscribe(resources => {
					resources.forEach(resource => selfLinks.push(resource._links.self.href));
					this.store.dispatch(new TableActions.SelectAll(selfLinks));
				});
			}
		})
	}
}
