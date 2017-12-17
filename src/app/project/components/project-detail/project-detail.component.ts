import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import * as RouterActions from './../../../router/state/router.actions';

@Component({
  selector: 'sw-project-detail',
  template: `
    <button class="ui button" (click)="go()">releases</button>
    <router-outlet></router-outlet>
  `
})
export class ProjectDetailComponent {
  
  constructor(private store: Store<fromRoot.State>) {
    
  }

  go() {
    this.store.dispatch(new RouterActions.Go({
      path: ['projects/productus1/releases']
    }));
  }
}