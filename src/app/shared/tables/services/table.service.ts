import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ListSelectActions from './../../state/list-select/list-select.actions';
import * as RouterActions from './../../../router/state/router.actions';
import * as fromRoot from './../../../reducers';
import { Observable } from "rxjs/Observable";
import { EmbeddedResource } from "../../../state/models";

@Injectable()
export class TableService {

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

}