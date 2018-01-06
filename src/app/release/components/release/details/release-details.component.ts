import { Component } from "@angular/core";
import * as fromModel from './../../../../state/model.reducer';
import * as fromRoot from './../../../../reducers';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Release } from "../../../../state/models";
import { Subscription } from "rxjs/Subscription";
import * as StructureActions from './../../../../structure/state/structure.actions';

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
  titleSub: Subscription;

  constructor(private store: Store<fromRoot.State>) {
    this.release = store.select(fromModel.selectRelease);
    this.titleSub = this.release.subscribe(release => {
      if(release.name) this.store.dispatch(new StructureActions.SetTitle(release.name));
    });
  }

  ngOnDestroy() {
    if(this.titleSub) this.titleSub.unsubscribe();
  }

}