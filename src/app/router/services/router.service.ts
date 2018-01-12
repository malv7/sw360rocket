import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
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

@Injectable()
export class RouterService {

  constructor(private store: Store<fromRoot.State>, private router: Router, ) { }

  /**
   * Parse the route each time a navigation finished and build current route data.
   * 
   * @param event The NavigationEnd events gets always fired when a navigation of the router ended.
   */

  // TODO: Wichtig!!!
  handleNavigation(event: NavigationEnd) {

    // DEBUG
    // console.log(event);

    // Update last route
    this.store.dispatch(new RouterActions.UpdateLastRoute());

    let routeData: RouteData = emptyCurrentRouteData;

    const route = event.urlAfterRedirects.split('/').filter(segment => segment !== '');
    switch (route.length) {

      // home or 404
      case 0: {
        this.store.dispatch(new RouterActions.UpdateCurrentRoute(routeData));
        return;
      }

      // it must be a ressource list or main navigation page like home, about, ...
      case 1: {
        const isList = isRouteSegmentList(route[0]);
        // console.log("einser")
        if (isList) {
          const type = route[0];
          routeData.ressourceType = type;
          routeData.ressourceContext = type;
          this.store.dispatch(new RouterActions.UpdateCurrentRoute(routeData));
        }
        return;
      }

      /* 2 segment routes:
        components/id
        projects/id
        releases/id
        ... */
      case 2: {
        const isFirstList = isRouteSegmentList(route[0]);
        if (isFirstList) {
          // breadcrumb as 3
          routeData.showBreadcrumb = true;
          routeData.breadCrumbSegments = [{
            name: route[0][0].toUpperCase() + route[0].slice(1, route[0].length),
            path: route[0]
          }];
          // context is equal to type
          routeData.ressourceType = route[0];
          routeData.ressourceContext = route[0];
        }
        this.store.dispatch(new RouterActions.UpdateCurrentRoute(routeData));
        return;
      }

      case 3: {
        this.store.select(fromRoot.selectLastRoute).take(1).subscribe(lastRoute => {
          // TODO: check
          routeData.ressourceContext = lastRoute.ressourceContext;
          routeData.ressourceType = route[2];
          routeData.showBreadcrumb = true;
          routeData.breadCrumbSegments = [
            {
              name: (route[0][0].toUpperCase() + route[0].slice(1, route[0].length)),
              path: route[0]
            },
          ];
          this.store.dispatch(new RouterActions.UpdateCurrentRoute(routeData));
          return;
        });
      }

      case 4: {
        // console.log(route);
        this.store.select(fromRoot.selectLastRoute).take(1).subscribe(lastRoute => {
          // console.log(lastRoute.ressourceContext);
          if (route[0] === 'releases' && lastRoute.ressourceContext === 'projects') {
            console.log("yooooo")
            routeData.showBreadcrumb = true;
            routeData.breadCrumbSegments = [
              {
                name: lastRoute.ressourceContext[0].toUpperCase() + lastRoute.ressourceContext.slice(1, lastRoute.ressourceContext.length),
                path: route[0]
              },
              {
                name: "Element n",
                path: route[0] + '/' + route[1]
              }
            ];
          } else {
            // TODO: set context
          }
          this.store.dispatch(new RouterActions.UpdateCurrentRoute(routeData));
          return;
        });
      }

      default: {
        break;
      }
    }

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
        this.store.select(fromRoot.selectCurrentRoute).subscribe(currentRoute => {
          this.store.select(fromRoot.selectLastRoute).subscribe(lastRoute => {
            // console.log('lastRoute: ', lastRoute);
            // console.log('currentRoute: ', currentRoute);
          });;
        });



      }
    } else {
      // default
      this.router.navigate(action.payload.path)
    }
  }

}