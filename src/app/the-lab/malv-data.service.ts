import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/retry';
import { Store } from "@ngrx/store";
import * as fromRoot from './../reducers';
import * as ComponentActions from './../component/state/component.actions';
import { componentDataLayoutFactory } from './../component/state/component.models';

// Lets start with the interfaces to interact with the component feature
// There are two differtent GET requests:
// https://sw360.org/api/components for a list of all components
// https://sw360.org/api/components/17653524 for a particular component

interface ResUser {
  email: string;
  href: string;
}

interface ResolvedModerator {
  email: string;
  href: string;
}

interface ComponentsResponse {
  _embedded: EmbeddedComponent[];
}

interface ComponentResponse {
  type: string;
  name: string;
  description: string;
  createdOn: string;
  componentType: string;
  _links: Links;
  _embedded: Embedded;
}

interface EmbeddedComponent {
  name: string;
  componentType: string;
  _links: Links;
}

function resolveComponents(componentsResponse: ComponentsResponse) {
  componentsResponse._embedded.forEach(c => {
    let compact = {
      name: c.name,
      componentType: c.componentType,
      selfLink: c._links.self.href
    }

    // let componentResult: ComponentResult = http.get(compact.selfLink)
  });
}
export interface Resources {
  users: User[];
}

export interface User {
  email: string;
  userGroup: string;
  _links: Links;
}

export interface GetUsersResponse {
  // _embedded:
}

// TODO: needs resolver
export interface Links {
  curies?: Curie[];
  self?: Self;
}

export interface Curie {
  href: string;
  name: string;
  templated: boolean;
}

export interface Self { href: string; }

// TODO: what is embedded? how to resolve it?
export interface Embedded {
  createdBy: CreatedBy;
  vendors: string[];
  releases: Release[];
  moderators: Moderator[];
}

export interface CreatedBy {
  email: string;
  _links: Links;
}

export interface Release {
  name: string;
  version: string;
  _links: Links;
}

export interface Moderator {
  email: string;
  _links: Links;
}

// Resources
const USERS = 'sw360:users';
const PROJECTS = 'sw360:projects';
const COMPONENTS = 'sw360:components';
const RELEASES = 'sw360:releases';
const ATTACHMENTS = 'sw360:attachments';
const VENDORS = 'sw360:vendors';
const LICENSES = 'sw360:licenses';
const CURIES = 'curies';
const PROFILE = 'profile';

@Injectable()
export class MalvDataService {

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    store.dispatch(new ComponentActions.ProvideMockData(componentDataLayoutFactory(20)));
    this.store.select(fromRoot.selectComponents).subscribe(x => console.log(x));
  }

}

function handleError(err: HttpErrorResponse) {
  if (err.error instanceof Error) {
    console.log(`A client-side or network error occurred: ${err.error.message}`);
  } else {
    console.log(`The backend returned an unsuccessful response code ${err.status}, body was: ${err.error}`);
  }
}

function resolveResourceType(type: string) {

  switch (type) {
    // case USERS:       { return resolveToNumber('x', {n1: 2, n2: 3})};
    // case PROJECTS:    { return resolveToConstantString('y', {n1: 0, n2: 3})};
    // case COMPONENTS: { return resolveComponent(null) };
    // case RELEASES:    { } break;
    // case ATTACHMENTS: { } break;
    // case VENDORS:     { } break;
    // case LICENSES:    { } break;
    // case CURIES:      { } break;
    // case PROFILE:     { } break;
    default: break;
  }
}

const resolveComponent = (c: ComponentResponse): Component => {
  const type = c.type;
  const name = c.name;
  const description = c.description;
  const createdOn = c.createdOn; // date
  const createdByEmail = c._embedded.createdBy.email;
  const moderators = c._embedded.moderators;
  const moderatorEmails = moderators.map(m => m.email);
  const vendors = c._embedded.vendors;
  const releases = c._embedded.releases;
  const releaseNames = releases.map(r => r.name)
  const releaseVersions = releases.map(r => r.version)

  let component: Component = {
    type: c.type,
    name: c.name,
    description: c.description,
    createdOn: c.createdOn, // date
    createdByEmail: c._embedded.createdBy.email,
    moderatorEmails: moderators.map(m => m.email),
    vendors: c._embedded.vendors,
    releaseNames: releases.map(r => r.name),
    releaseVersions: releases.map(r => r.version)
  }
  return (component)
};

interface Component {
  type: string; // component type?
  name: string;
  description: string;
  createdOn: string; // date
  createdByEmail: string;
  moderatorEmails: string[];
  vendors: string[];
  releaseNames: string[];
  releaseVersions: string[];
  // Homepage, Blog, Wiki, Mailing list
}

const log = (x: any) => console.log(x);
