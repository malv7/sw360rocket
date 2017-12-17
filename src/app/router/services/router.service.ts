import { Injectable } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
import * as RouterActions from './../state/router.actions';
import { CurrentRouteData } from "../state/router.reducer";

@Injectable()
export class RouterService {

  constructor(private store: Store<fromRoot.State>) {
    // console.log("wo")

    const path = '/components/id/details';
    const x = path.split('/');

    const splits = uris.map(uri => uri.split('/'));
    const y = splits.map(split => split[split.length - 2] + '/' + split[split.length - 1]);
    // console.log(y);

  }

  parseRoute(event: NavigationEnd) {

    console.log(event);

    // on the way down modify and dispatch currentRouteData
    let currentRouteData: CurrentRouteData = {
      showTitle: false,
      title: '',
      showBreadcrumb: false,
      breadCrumbSegments: [],
      isList: false,
      listType: '',
      isDetail: false,
      detailType: ''
    };

    const segments = event.urlAfterRedirects.split('/').filter(segment => segment !== '');

    // it must be home
    if (segments.length === 0) {
      // console.log(currentRouteData);
      this.store.dispatch(new RouterActions.StoreCurrentRouteData(currentRouteData));
      return;
    }

    // it must be a list or main navigation page like home, about, ...
    if (segments.length === 1) {

      const title = segments[0][0].toUpperCase() + segments[0].slice(1, segments[0].length);
      currentRouteData.title = title;
      currentRouteData.showTitle = true;

      const isList = this.isList(segments[0]);
      if (isList) {
        currentRouteData.isList = true;
        currentRouteData.listType = segments[0];
      }

      // console.log(currentRouteData);
      this.store.dispatch(new RouterActions.StoreCurrentRouteData(currentRouteData));
      return;
    }

    // it must be a list/id
    // TODO: implement 3 itself
    if (segments.length === 2 || segments.length === 3) {
      const isFirstList = this.isList(segments[0]);
      if (isFirstList) {
        currentRouteData.title = segments[1] // TODO: title from store, not id
        currentRouteData.showTitle = true;
        currentRouteData.isList = false;
        currentRouteData.isDetail = true;
        currentRouteData.detailType = segments[0];
        currentRouteData.showBreadcrumb = true;
        currentRouteData.breadCrumbSegments = [{
          name: (segments[0][0].toUpperCase() + segments[0].slice(1, segments[0].length)),
          path: segments[0]
        }]
      }
      // console.log(currentRouteData);
      this.store.dispatch(new RouterActions.StoreCurrentRouteData(currentRouteData));
      return;
    }

    // it must be a list/id/list | detail
    if (segments.length === 3) {

    }

  }

  getTitleFromListSegment(listSegment: string) {
    switch (listSegment) {
      case 'components': return 'Components'
      case 'releases': return 'Releases'
      case 'attachments': return 'Attachments'
      case 'projects': return 'Projects'
      case 'users': return 'Users'
      case 'licenses': return 'Licenses'
      default: break;
    }
  }

  isList(segment: string): boolean {
    return listRoutes.includes(segment) ? true : false;
  }

  isDetail(segments: string[]): boolean {

    const isLastList = this.isList(segments[segments.length - 1]);
    const isPenultimateList = this.isList(segments[segments.length - 2]);

    if (isLastList) {
      return false;
    }

    if (!isLastList) {
      if (isPenultimateList) {
        return true;
      }
    }

  }



}

interface RouteType {
  isList: boolean;

}


const listRoutes = [
  'components',
  'releases',
  'attachments',
  'projects',
  'users',
  'vendors',
  'licenses'
  // TODO: vulnerabilities?
];

const possibleRoutes = [
  '/components',
  '/components/id',
  '/components/id/details',
  '/components/id/releases',
  '/components/id/attachments',

  '/projects',
  '/projects/id',
  '/projects/id/details',
  '/projects/id/releases',
  '/projects/id/attachments',
];

const uris = [
  'https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn',
  'https://sw360.org/api/projects/376576',
  'https://sw360.org/api/components/17653524',
  'https://sw360.org/api/releases/3765276512',
  'https://sw360.org/api/attachments/76537653',
  'https://sw360.org/api/vendors/987567468',
  'https://sw360.org/api/licenses/apache20'
]