import { SW360Release } from './../../../../resources/resources.api';
import { Component } from "@angular/core";
import * as fromModel from './../../../../state/model.reducer';
import { State } from './../../../../state';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { EmbeddedRelease } from "../../../../state/models";
import { Subscription } from "rxjs/Subscription";
import * as StructureActions from './../../../../structure/state/structure.actions';
import * as fromRelease from './../../../state/release.reducer';

@Component({
		selector: 'sw-release-details',
		templateUrl: './release-details.component.html',
		styleUrls: ['./release-details.component.scss']
})
export class ReleaseDetailsComponent {

  release: Observable<SW360Release>;
  constructor(private store: Store<State>) {
    this.release = store.select(fromRelease.selectRelease);
  }

}
