import { Component } from "@angular/core";
import * as fromModel from './../../../../state/model.reducer';
import * as fromRoot from './../../../../reducers';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Release } from "../../../../state/models";

@Component({
    selector: 'sw-release-details',
    template: `
        {{ release | async | json }}

        Release Mainline State: Open || Closed || LONG_LONG_LONG
        
        type: OSS || FREESOFTWARE || LONG_LONG_LONG
    `
})
export class ReleaseDetailsComponent {

  release: Observable<Release>;
  constructor(private store: Store<fromRoot.State>) {
    this.release = store.select(fromModel.selectRelease);
  }

}