import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
import * as RouterActions from './../../router/state/router.actions';

@Component({
  selector: 'router-test',
  template: `
  
    <button class="ui button" (click)="go()">Go (components)</button>
    <button class="ui button" (click)="back()">Back</button>
    <button class="ui button" (click)="forward()">Forward</button>
  
    <!-- <router-outlet name="test"></router-outlet> -->
  `
})
export class RouterTestComponent {

  constructor(private store: Store<fromRoot.State>) {
    
  }

  go(): void {
    this.store.dispatch(new RouterActions.Go({
      // path: ['/rxjs'],
      path: ['/rxjs', { routeParam: 1 }],
      // query: { page: 1 },
      // extras: { replaceUrl: false }
    }));
  }

  back(): void {
    this.store.dispatch(new RouterActions.Back());
  }

  forward(): void {
    this.store.dispatch(new RouterActions.Forward());
  }

}