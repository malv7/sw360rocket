import { ColumnSortedEvent } from './table.service';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ListSelectActions from './../../state/list-select/list-select.actions';
import * as RouterActions from './../../../router/state/router.actions';
import * as fromRoot from './../../../reducers';
import { Observable } from "rxjs/Observable";
import { EmbeddedResource } from "../../../state/models";
import { Subject } from 'rxjs/Subject';
@Injectable()
export class TableService {

	private columnSortedSource = new Subject<ColumnSortedEvent>();

  constructor(private store: Store<fromRoot.State>) { }

  selectAll(areAllSelected: boolean, resources: Observable<EmbeddedResource[]>) {
    if(areAllSelected) {
      this.store.dispatch(new ListSelectActions.Clear());
    }

    if(!areAllSelected) {
      const selfLinks: string[] = [];
      resources.take(1).subscribe(resources => {
        resources.forEach(resource => selfLinks.push(resource._links.self.href));
      });
      this.store.dispatch(new ListSelectActions.AddMany(selfLinks));
    }
  }

  selectOne(resource: EmbeddedResource) {
    this.store.dispatch(new ListSelectActions.ToggleOne(resource._links.self.href));
  }

  // TODO: implement router
  go(resource: EmbeddedResource) {
    this.store.dispatch(new RouterActions.Go({
      path: ['/projects', resource.id]
    }));
  }

	sortByRow($event: ColumnSortedEvent, data:Observable<any>){
		let out;

		if($event.sortDirection==='asc'){
			out = data.map(data => data.sort((x, y) =>
			 x[$event.sortColumn] > y[$event.sortColumn] ? 1 : x[$event.sortColumn] < y[$event.sortColumn] ? -1 : 0
			));
		}
		if($event.sortDirection==='desc') {
			out = data.map(data => data.sort((x, y) =>
			x[$event.sortColumn] < y[$event.sortColumn] ? 1 : x[$event.sortColumn] > y[$event.sortColumn] ? -1 : 0
		));
		}

		return out

	}

	columnSorted$ = this.columnSortedSource.asObservable();

	columnSorted(event: ColumnSortedEvent) {
			this.columnSortedSource.next(event);
	}
}

export interface ColumnSortedEvent {
	sortColumn: string;
	sortDirection: string;
}
