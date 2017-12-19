import { Component } from "@angular/core";
import * as fromRoot from './../../../../reducers';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { CurrentRouteData } from "../../../../router/state/router.reducer";

@Component({
  selector: 'sw-title',
  template: `
    <div class="activeRoute" *ngIf="(currentRouteData | async).showTitle">
      {{ (currentRouteData | async).title }}
    </div>
  `,
  styleUrls: ['./content-title.component.scss']
})
export class ContentTitleComponent {
  currentRouteData: Observable<CurrentRouteData>;
  constructor(private store: Store<fromRoot.State>) {
    this.currentRouteData = this.store.select(fromRoot.selectCurrentRouteData);
  }

}