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
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
  seventh: string;
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
    this.first = this.route[0] ? this.route[0] : undefined;
    this.second = this.route[1] ? this.route[1] : undefined;
    this.third = this.route[2] ? this.route[2] : undefined;
    this.fourth = this.route[3] ? this.route[3] : undefined;
    this.fifth = this.route[4] ? this.route[4] : undefined;
    this.sixth = this.route[5] ? this.route[5] : undefined;
    this.seventh = this.route[6] ? this.route[6] : undefined;
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

    // TODO: gather and dispatch
    let activeFeature: ActiveFeatures;

    const m = this.route.length % 2;
    if (m === 0) {
      switch (this.route.length) {
        case 0: {
          this.store.dispatch(new StructureActions.SetBreadcrumb({ active: false, segments: [] }));
          this.store.dispatch(new StructureActions.SetTitle('Welcome to SW360Rocket'));
          break;
        }
        case 2: {
          if (this.second === UrlSegments.create) this.setCreateTitle(this.first);
          break;
        }
        case 4: break;
        default: break;
      }
    } else {
      const capitalizedFirst = capitalizeFirstLetter(this.first);
      switch (this.route.length) {
        case 1: {
          this.store.dispatch(new TableActions.InitializeTable());
          this.store.dispatch(new StructureActions.SetBreadcrumb({ active: false, segments: [] }));
          this.store.dispatch(new StructureActions.SetTitle(capitalizedFirst));
          break;
        }
        case 3: {
          this.store.dispatch(new StructureActions.SetBreadcrumb({ active: true, segments: [{ name: capitalizedFirst, route: this.first }] }));
          this.store.dispatch(new TableActions.InitializeTable());
          this.store.dispatch(new TableActions.SetReleaseTableData({
            type: this.first,
            id: this.second
          }));
          break;
        }
        case 5: {
          const capitalizedThird = capitalizeFirstLetter(this.third);

          // releases
          if (this.third === UrlSegments.releases) {
            if (this.first === UrlSegments.components) {
              this.store.select(fromComponent.selectComponent)
                .take(1)
                .subscribe(component => {
                  console.log(component)
                  this.dispatchBreadcrumb({
                    active: true,
                    segments: [
                      { name: capitalizedFirst, route: this.first },
                      { name: component.name, route: component._links.self.href },
                    ]
                  })
                });
            } else if (this.first === UrlSegments.projects) {
              // TODO: projects
            }
          }


          this.store.dispatch(new StructureActions.SetBreadcrumb({
            active: true,
            segments: [
              { name: capitalizedFirst, route: this.first },
              // TODO: get
            ]
          }));
          this.store.dispatch(new TableActions.InitializeTable());
          break;
        }
        default: break;
      }
    }
  }

  dispatchBreadcrumb(breadcrumb: Breadcrumb) {
    console.log(breadcrumb);
    console.log("asda34927349ß732ß947 329ß749237293472973ß4927349ß")
    this.store.dispatch(new StructureActions.SetBreadcrumb(breadcrumb));
  }

  setCreateTitle(segment: string) {
    let title = 'Create ';
    switch (segment) {
      // TODO: others?
      case UrlSegments.components: title = title + 'Component'; break;
      case UrlSegments.projects: title = title + 'Project'; break;
      default: break;
    }
    this.store.dispatch(new StructureActions.SetTitle(title));
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