import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { State } from './../../state';
import * as RouterActions from './../state/router.actions';
import { RouteData } from "../state/router.reducer";
import {
  emptyCurrentRouteData,
  isRouteSegmentList,
  RouteLists,
  COMPONENTS,
  PROJECTS,
  RELEASES
} from './../router.api';
import * as fromRouter from './../state/router.reducer';

@Injectable()
export class RouterService {

  constructor(private store: Store<State>, private router: Router, ) { }

  /**
   * Parse the route each time a navigation finished and build current route data.
   * 
   * @param event The NavigationEnd events gets always fired when a navigation of the router ended.
   */

  // TODO: Wichtig!!!
  handleNavigation(event: NavigationEnd) {
    // DEBUG
    console.log(event);
    // Update last route
    this.store.dispatch(new RouterActions.UpdateLastRoute());
    let routeData: RouteData = emptyCurrentRouteData;
    const route = event.urlAfterRedirects.split('/').filter(segment => segment !== '');
  } // parseRoute

  go(action: RouterActions.Go) {
    // navigate to a ressource self link
    const selfLink = action.payload.ressourceSelflink;
    if (selfLink) {
      const segments = selfLink.split('/').filter(segment => segment !== '');
      const id = segments[segments.length - 1];
      const type = segments[segments.length - 2];
      const route = type + '/' + id;
      this.router.navigate([route]);

      // handle release embedded specific stuff
      if (type === 'releases') {
      //   this.store.select(fromRoot.selectCurrentRoute).subscribe(currentRoute => {
      //     this.store.select(fromRoot.selectLastRoute).subscribe(lastRoute => {
      //       // console.log('lastRoute: ', lastRoute);
      //       // console.log('currentRoute: ', currentRoute);
      //     });;
      //   });



      }
    } else {
      // default
      this.router.navigate(action.payload.path)
    }
  }

}