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
    private activatedRoute: ActivatedRoute) { }

  // Process variables
  event: NavigationEnd
  route: string[];
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  last: string;
  preultimate: string; // vorletzte
  id: string;

  handleNavigation(event: NavigationEnd) {
    this.initNavigation(event);
    this.processNavigation();
  }

  initNavigation(event: NavigationEnd) {
    // update event
    this.event = event;
    // update route
    this.route = toSegmentArray(this.event.urlAfterRedirects);
    // 1-7 semantic segments
    this.one = this.route[0] ? this.route[0] : undefined;
    this.two = this.route[1] ? this.route[1] : undefined;
    this.three = this.route[2] ? this.route[2] : undefined;
    this.four = this.route[3] ? this.route[3] : undefined;
    this.five = this.route[4] ? this.route[4] : undefined;
    this.six = this.route[5] ? this.route[5] : undefined;
    this.seven = this.route[6] ? this.route[6] : undefined;
    // last and preultimate
    this.last = this.route[this.route.length - 1] ? this.route[this.route.length - 1] : undefined;
    this.preultimate = this.route[this.route.length - 2] ? this.route[this.route.length - 2] : undefined;
  }

  // 1 list || main navigation
  // 2 create
  // 3 detail
  // 4 create
  // 5 detail
  // 6 create
  // 7 detail
  // ...
  processNavigation() {
    this.store.dispatch(new TableActions.InitializeTable());
    this.setActiveFeatures();
    this.setTitleAndBreadcrumb();
  }

  setActiveFeatures() {
    const activeFeatures: ActiveFeatures[] = [];

    if (this.route.length > 0) {
      if (this.one === UrlSegments.components)
        activeFeatures.push(ActiveFeatures.isComponents);
      else if (this.one === UrlSegments.projects)
        activeFeatures.push(ActiveFeatures.isProjects);
      // TODO: rest
    }

    if (this.route.length === 5) {
      if (this.three === UrlSegments.releases)
        activeFeatures.push(ActiveFeatures.isReleases);
    }

    this.store.dispatch(new RouterActions.SetActiveFeatures(activeFeatures));
  }

  // Sets title and breadcrumb as good as it can at this point
  setTitleAndBreadcrumb() {
    switch (this.route.length) {

      case 0: {
        this.store.dispatch(new StructureActions.SetTitle('Welcome to SW360Rocket'));
        this.store.dispatch(new StructureActions.SetBreadcrumb({ active: false, segments: [] }));
        return;
      }

      case 1: {
        this.store.dispatch(new StructureActions.SetTitle(capitalizeFirstLetter(this.one)));
        this.store.dispatch(new StructureActions.SetBreadcrumb({ active: false, segments: [] }));
        return;
      }

      case 2: {
        if (this.two === UrlSegments.create)
          this.store.dispatch(new StructureActions.SetTitle('Create ' + capitalizeFirstLetter(this.one)));
        this.store.dispatch(new StructureActions.SetBreadcrumb({ active: true, segments: [{ name: capitalizeFirstLetter(this.one), route: this.one }] }));
        return;
      }

      case 3: {
        if (this.one === UrlSegments.components) {
          this.store.select(fromComponent.selectComponent).take(1).map(component => component.name).subscribe(name => this.store.dispatch(new StructureActions.SetTitle(name)));
        }
        this.store.dispatch(new StructureActions.SetBreadcrumb({ active: true, segments: [{ name: capitalizeFirstLetter(this.one), route: this.one }] }));
        return;
      }

      default:
        break;
    }
  }

  goToResource() {
    this.store.select(fromRouter.selectActiveFeatures).take(1).subscribe(activeFeatures => {
      console.log(activeFeatures);
    })
  }

  goToRelease(release: any) {
    this.store.select(fromRouter.selectActiveFeatures).take(1).subscribe(activeFeatures => {
      if (activeFeatures.includes(ActiveFeatures.isComponents)) {

        // Set title
        this.store.dispatch(new StructureActions.SetTitle(release.name));

        // Get active component data
        this.store.select(fromComponent.selectComponent).take(1).subscribe(component => {
          // Dispatch breadcrumb
          this.store.dispatch(new StructureActions.SetBreadcrumb({
            active: true, segments: [
              { name: capitalizeFirstLetter(this.one), route: this.one },
              { name: component.name, route: component._links.self.href },
            ]
          }));
          // Dispatch routing
          this.store.dispatch(new RouterActions.Go({
            path: [
              UrlSegments.components + '/' +
              this.getIdFromSelflink(component._links.self.href) + '/' +
              UrlSegments.releases + '/' +
              this.getIdFromSelflink(release._links.self.href)
            ]
          }))
        });

      } else if (activeFeatures.includes(ActiveFeatures.isReleases)) {
        // TODO:
      }
    })
  }

  getIdFromSelflink(link: string) {
    const segments = toSegmentArray(link);
    return segments[segments.length - 1];
  }

  getSelflinksFromRoute() {
    
    // jede tabelle, sowie breadcrumb routet über den router service
    // sie gibt das jeweilige embedded feature oder link mit
    // der router service hat eine go methode für jedes feature oder gotoselfink oder goto route (partielle bredcrumb wie projects)
    // router service extrahiert name o.Ä. und id aus selflink für die breadcrumb in jeweiliger methode
    // router service entscheidet ob neuer content erhoben werden muss, macht dies und speichert es in den jeweiligen selected features ab
    // detail komponenten ziehen ihre daten immer aus dem selected feature aus dem store



    // wenn auf tabelle geklickt wird, wird das jeweilige feature aktiviert und im store abgelegt
    // router 
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

export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const toSegmentArray = (urlSegments: string): string[] =>
  urlSegments.split('/').filter(segment => segment !== '');








export const handleActiveFeature = (activeFeature: ActiveFeatures) => {
  switch (activeFeature) {

    case ActiveFeatures.isComponent: {
      this.store.select(fromComponent.selectComponent).take(1).map(component => component.name).subscribe(name => this.store.dispatch(new StructureActions.SetTitle(name)));
      return;
    }

    case ActiveFeatures.isComponents: {
      this.store.dispatch(new StructureActions.SetTitle("Components"));
      return;
    }

    case ActiveFeatures.isLicense: {
      // this.store.select(fromLicense.selectLicense).take(1).map(license => license.name).subscribe(name => this.store.dispatch(new StructureActions.SetTitle(name)));
      return;
    }

    case ActiveFeatures.isLicenses: {
      this.store.dispatch(new StructureActions.SetTitle("Licenses"));
      return;
    }

    case ActiveFeatures.isProject: {
      // this.store.select(fromProject.selectProject).take(1).map(project => project.name).subscribe(name => this.store.dispatch(new StructureActions.SetTitle(name)));
      return;
    }

    case ActiveFeatures.isProjects: {
      this.store.dispatch(new StructureActions.SetTitle("Projects"));
      return;
    }

    case ActiveFeatures.isRelease: {
      // this.store.select(fromRelease.selectRelease).take(1).map(release => release.name).subscribe(name => this.store.dispatch(new StructureActions.SetTitle(name)));
      return;
    }

    case ActiveFeatures.isReleases: {
      // no title since it is embedded
      return;
    }

    case ActiveFeatures.isAttachment: {
      // this.store.select(fromAttachment.selectAttachment).take(1).map(attachment => attachment.name).subscribe(name => this.store.dispatch(new StructureActions.SetTitle(name)));
      return;
    }

    case ActiveFeatures.isAttachments: {
      // no title since it is embedded
      return;
    }

    default:
      break;
  }
}