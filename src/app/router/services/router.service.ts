import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { State } from './../../state';
import * as RouterActions from './../state/router.actions';
import { RouteData, BreadCrumb, BreadcrumbSegment } from "../state/router.reducer";
import {
  isRouteSegmentList,
  ResourceListTypes,
  COMPONENTS,
  PROJECTS,
  RELEASES,
  CREATE,
  VULNERABILITIES,
  LICENSES,
  USERS,
  ATTACHMENTS,
  VENDORS
} from './../router.api';
import * as fromRouter from './../state/router.reducer';
import { ActivatedRoute } from "@angular/router";

import * as StructureActions from './../../structure/state/structure.actions';

import * as TableActions from './../../shared/tables/state/table.actions';

@Injectable()
export class RouterService {

  constructor(
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  // TODO:
  // Things to do on NavigationEnd

  // Always:
  //   Set page title

  // If it is a list 
  //   Set selection data
  //   Set pagination data

  // Extracted data
  title: string; // the active top bar title
  breadCrumb: BreadCrumb;
  isReleases: boolean;
  releaseContextRoute: string; // TODO: put this into store?

  // Process variables
  event: NavigationEnd
  route: string[];
  first: string;
  second: string;
  last: string;
  preultimate: string; // vorletzte
  id: string; // only exists on 3 and 5
  breadCrumbId: string; // only exists on 3 and 5



  // TODO:
  // Titles must be set async when item(s) arrive
  // Loading animation for message (list, details, overview, whatever, on content structure level)
  // set resourceLoading = true
  // wait until resourceLoading === false (set false when xhr has success, log message when error false)
  // set resourceLoading = true when http request ended
  // listen for resourceLoading:
  //   whenever it gets true,
  //   set current active element (project, release, ...)
  //   derive title from current route data and detail (it it is not a list)

  // TODO http
  // clean active items and lists with default state whenever route changes, so that
  // there never can be old content

  // determine if detail, if so set it for http handling
  // we need to get the name of the item back as the title

  handleNavigation(event: NavigationEnd) {

    // Clears neccessary
    this.initHandleNavigation(event);

    // Updates data
    this.updateBreadCrumb();

    switch (this.route.length) {
      case 0: {
        this.store.dispatch(new StructureActions.SetTitle("Welcome to SW360 Rocket!"));
        break;
      }
      case 1: {
        this.title = capitalizeFirstLetter(this.first);
        break;
      }
      case 2: {
        if (this.second === CREATE) {
          this.setCreateTitle(this.first);
        } else {
          // TODO: set title for corresponding item after request
        }
        break;
      }
      case 3: {
        // this.id
        // Detail title gets set in chain of http request handling
        // Releases table context, getting ready for release detail
        this.evalReleases();
        break;
      }
      case 4: {
        console.log(4);
        break;
      }
      case 5: {
        // this.id
        console.log(5);

        // is it release detail?

        break;
      }
      default:
        break;
    }

    // If title got set, update it in structure
    if (this.title) {
      this.store.dispatch(new StructureActions.SetTitle(this.title));
    }

    // Finally update route data
    this.store.dispatch(new RouterActions.UpdateRoute({
      breadcrumb: this.breadCrumb,
    }));
  }

  resetListData() {
    if (this.last && isRouteSegmentList(this.last))
      this.store.dispatch(new TableActions.InitializeTable());
  }

  updateBreadCrumb() {
    this.breadCrumb = { breadCrumbSegments: [], showBreadcrumb: false };

    let firstBreadCrumbSegment: BreadcrumbSegment;
    let secondBreadCrumbSegment: BreadcrumbSegment;

    if (this.first)
      firstBreadCrumbSegment = { name: capitalizeFirstLetter(this.first), path: this.first };

    if (this.second)
      secondBreadCrumbSegment = { name: '', path: this.first + '/' + this.second };

    switch (this.route.length) {
      case 2: {
        this.breadCrumb = {
          breadCrumbSegments: [firstBreadCrumbSegment],
          showBreadcrumb: true
        };
        return;
      }
      case 3: {
        this.breadCrumb = {
          breadCrumbSegments: [firstBreadCrumbSegment],
          showBreadcrumb: true
        };
        return;
      }
      case 4: {
        return;
      }
      case 5: {
        this.breadCrumb = {
          breadCrumbSegments: [firstBreadCrumbSegment, secondBreadCrumbSegment],
          showBreadcrumb: true
        };
        return;
      }
      default:
        break;
    }
  }



  // Initialization
  /////////////////

  initHandleNavigation(event: NavigationEnd) {
    this.event = event;
    this.title = undefined;
    this.initRoute();

    // release data init
    this.isReleases = false;
    this.releaseContextRoute = undefined;
  }

  // Initialize new route data
  // Set all semantic route segment member properties to undefined if they don't exist
  initRoute() {
    this.route = toSegmentArray(this.event.urlAfterRedirects);
    // console.log(this.route); // DEBUG

    switch (this.route.length) {
      case 3: { this.id = this.route[1]; break; }
      case 5: { this.id = this.route[3]; break; }
      case 7: { this.id = this.route[5]; break; }
      default: break;
    }

    this.first = this.route[0] ? this.route[0] : undefined;
    this.second = this.route[1] ? this.route[1] : undefined;
    this.last = this.route[this.route.length - 1] ? this.route[this.route.length - 1] : undefined;
    this.preultimate = this.route[this.route.length - 2] ? this.route[this.route.length - 2] : undefined;
  }



  // Determine the title of create pages depending on preultimate segment
  // Creation titles can have multiple occurences, not only main title,
  // TODO: check (embedded) release creation title
  setCreateTitle(preultimateSegment: string) {
    let title = 'Create ';
    switch (preultimateSegment) {
      case COMPONENTS: title + 'Component'; break;
      case PROJECTS: title + 'Project'; break;
      case RELEASES: title + 'Release'; break;
      case LICENSES: title + 'Licence'; break;
      case VULNERABILITIES: title + 'Vulnerability'; break;
      case USERS: title + 'User'; break;
      case ATTACHMENTS: title + 'Attachment'; break;
      case VENDORS: title + 'Vendor'; break;
      default: break;
    }
    this.title = title;
  }

  // Release specific
  ///////////////////

  // If the last segment is relesaes it must be a release table
  // Determine context if so
  evalReleases() {
    this.isReleases = (this.last === RELEASES) ? true : false;
    if (this.isReleases) {
      let type: string;
      const id = this.second;
      if (this.first === PROJECTS) type = this.first;
      if (this.first === COMPONENTS) type = this.first;
      this.store.dispatch(new TableActions.SetReleaseTableData({
        type: type,
        id: id
      }))
    }
  }











  // TODO: rework
  go(go: RouterActions.Go) {
    // navigate to a ressource self link
    const selfLink = go.payload.ressourceSelflink;
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
      this.router.navigate(go.payload.path)
    }
  }

}

const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const toSegmentArray = (urlSegments: string): string[] =>
  urlSegments.split('/').filter(segment => segment !== '');