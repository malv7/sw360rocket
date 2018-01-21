import { HttpService } from './../../http/services/http.service';
import { selectComponent } from './../../component/state/component.reducer';
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { State } from './../../state';
import * as RouterActions from './../state/router.actions';
import {
  isRouteSegmentList,
  UrlSegments,
  COMPONENTS,
  PROJECTS,
  RELEASES,
  CREATE,
  VULNERABILITIES,
  LICENSES,
  USERS,
  ATTACHMENTS,
  VENDORS,
  ActiveFeatures
} from './../router.api';
import * as fromRouter from './../state/router.reducer';
import { ActivatedRoute } from "@angular/router";

import * as StructureActions from './../../structure/state/structure.actions';

import * as TableActions from './../../shared/tables/state/table.actions';

import * as ComponentActions from './../../component/state/component.actions';
import * as fromComponent from './../../component/state/component.reducer';
import * as fromStructure from './../../structure/state/structure.reducer';
import { Breadcrumb } from './../../structure/state/structure.reducer';

@Injectable()
export class RouterService {

  constructor(
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService) { }

  // Process variables
  route: string[];
  first: string;
  preultimate: string;
  last: string;

  goSelflink(selflink: string) {
    const segments = toSegmentArray(selflink);
    const id = segments[segments.length - 1];
    this.router.navigate([this.router.url + '/' + id]);
  }

  handleNavigation(event: NavigationEnd) {
    this.initNavigation(event);
    this.processNavigation();
  }

  processNavigation() {

    //components/id/releases/id/vulnerabilities/id/tolle/id/details

    if(this.route.length === 0) {
      this.store.dispatch(new StructureActions.SetTitle('Welcome to SW360Rocket'));
      this.store.dispatch(new StructureActions.SetBreadcrumb({ active: false, segments: [] }));
    }

    if(this.route.length === 1) {
      this.store.dispatch(new StructureActions.SetTitle(capitalizeFirstLetter(this.first)));
      this.store.dispatch(new StructureActions.SetBreadcrumb({ active: false, segments: [] }));
      if (this.first === UrlSegments.components || this.first === UrlSegments.projects)
        this.httpService.handleRequest(this.first);
    }

    if(this.route.length === 2) {
      if (this.last === 'create')
        this.store.dispatch(new StructureActions.SetTitle('Create ' + capitalizeFirstLetter(this.preultimate)));
      this.store.dispatch(new StructureActions.SetBreadcrumb({ active: true, segments: [{ name: capitalizeFirstLetter(this.first), route: this.first }] }));
    }

    if (this.route.length >= 3 && this.last !== 'create') {
      this.store.dispatch(new StructureActions.SetBreadcrumb({ active: true, segments: [{ name: capitalizeFirstLetter(this.first), route: this.first }] }));
      const feature = this.route[this.route.length - 3];
      const id = this.preultimate;
      this.httpService.handleRequest(feature, id);
    } 

  }

  initNavigation(event: NavigationEnd) {
    this.store.dispatch(new TableActions.InitializeTable());
    this.route = toSegmentArray(event.urlAfterRedirects);
    this.first = this.route[0] ? this.route[0] : undefined;
    this.last = this.route[this.route.length - 1] ? this.route[this.route.length - 1] : undefined;
    this.preultimate = this.route[this.route.length - 2] ? this.route[this.route.length - 2] : undefined;
  }

  // TODO: rework
  go(go: RouterActions.Go) {
    
    const selfLink = go.payload.ressourceSelflink;
    if (selfLink) {
      const segments = selfLink.split('/').filter(segment => segment !== '');
      const id = segments[segments.length - 1];
      const type = segments[segments.length - 2];
      const route = type + '/' + id;
      this.router.navigate([route]);

      // TODO: handle release embedded specific stuff ??
      if (type === 'releases') {

      }
    } else {
      // default
      this.router.navigate(go.payload.path)
    }
  }

}

export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const toSegmentArray = (urlSegments: string): string[] =>
  urlSegments.split('/').filter(segment => segment !== '');
