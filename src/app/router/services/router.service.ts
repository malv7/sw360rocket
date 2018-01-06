import { Injectable } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
import * as RouterActions from './../state/router.actions';
import { CurrentRouteData } from "../state/router.reducer";
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

  constructor(private store: Store<fromRoot.State>) { }

  /**
   * Parse the route each time a navigation finished and build current route data.
   * 
   * @param event The NavigationEnd events gets always fired when a navigation of the router ended.
   */
  parseRoute(event: NavigationEnd) {

    // console.log(event);

    // on the way down modify and dispatch currentRouteData
    let currentRouteData: CurrentRouteData = emptyCurrentRouteData;

    const segments = event.urlAfterRedirects.split('/').filter(segment => segment !== '');



    // 0 segment route --> must be home or 404
    if (segments.length === 0) {
      this.store.dispatch(new RouterActions.StoreCurrentRouteData(currentRouteData));
      return;
    }

    // 1 segment route --> it must be a list or main navigation page like home, about, ...
    if (segments.length === 1) {

      currentRouteData.feature = segments[0];

      const title = segments[0][0].toUpperCase() + segments[0].slice(1, segments[0].length);
      // currentRouteData.title = title;
      // currentRouteData.showTitle = true;

      const isList = isRouteSegmentList(segments[0]);
      if (isList) {
        currentRouteData.isList = true;
        currentRouteData.listType = segments[0];
      }

      this.store.dispatch(new RouterActions.StoreCurrentRouteData(currentRouteData));
      return;
    }

    /* 2 segment routes:
      components/id
      projects/id
      releases/id
      ... */
    if (segments.length === 2) {
      const isFirstList = isRouteSegmentList(segments[0]);
      if (isFirstList) {
        currentRouteData.feature = segments[0];
        currentRouteData.isList = false;
        currentRouteData.isDetail = true;
        currentRouteData.detailType = segments[0];
        currentRouteData.showBreadcrumb = true;
        currentRouteData.breadCrumbSegments = [{
          name: (segments[0][0].toUpperCase() + segments[0].slice(1, segments[0].length)),
          path: segments[0]
        }]
      }
      this.store.dispatch(new RouterActions.StoreCurrentRouteData(currentRouteData));
      return;
    }

    /* 3 segment routes:
      components/id/details
      components/id/releases
      components/id/attachments
      
      projects/id/details
      projects/id/releases
      projects/id/attachments

      projects/id/details
      projects/id/attachments
      projects/id/vulnerabilites
      projects/id/ecc // IS THIS A LIST? */
    if (segments.length === 3) {
      const isFirstList = isRouteSegmentList(segments[0]);
      if (isFirstList) {
        currentRouteData.feature = segments[0];
        currentRouteData.isList = false;
        currentRouteData.isDetail = true;
        currentRouteData.detailType = segments[0];
        currentRouteData.showBreadcrumb = true;
        currentRouteData.breadCrumbSegments = [{
          name: (segments[0][0].toUpperCase() + segments[0].slice(1, segments[0].length)),
          path: segments[0]
        }]
      }
      this.store.dispatch(new RouterActions.StoreCurrentRouteData(currentRouteData));
      return;
    }

    // The action buttons depend on the previous route
    if (segments[0] === COMPONENTS && segments[2] === RELEASES) {
      // console.log("release table inside components");
    }

    if (segments[0] === PROJECTS && segments[2] === RELEASES) {
      // console.log("release table inside projects");
    }

  } // parseRoute

}