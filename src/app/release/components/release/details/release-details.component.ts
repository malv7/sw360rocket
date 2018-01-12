import { Component } from "@angular/core";
import * as fromModel from './../../../../state/model.reducer';
import { State } from './../../../../state';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Release } from "../../../../state/models";
import { Subscription } from "rxjs/Subscription";
import * as StructureActions from './../../../../structure/state/structure.actions';

@Component({
		selector: 'sw-release-details',
		templateUrl: './release-details.component.html',
		styleUrls: ['./release-details.component.scss']
})
export class ReleaseDetailsComponent {

  release: Observable<Release>;
  titleSub: Subscription;

  constructor(private store: Store<State>) {
    this.release = store.select(fromModel.selectRelease);
    this.titleSub = this.release.subscribe(release => {
      if(release.name) this.store.dispatch(new StructureActions.SetTitle(release.name));
    });
  }

  ngOnDestroy() {
    if(this.titleSub) this.titleSub.unsubscribe();
  }

}
