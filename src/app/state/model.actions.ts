import { Action } from '@ngrx/store';
import { EmbeddedUser, User, EmbeddedProject, Project, EmbeddedSW360Component, SW360Component, EmbeddedRelease, Release, Attachment, EmbeddedVendor, Vendor, License, EmbeddedLicense } from './models';

export const GET_USERS = '[User] Get users';
export const GET_USER = '[User] Get user';
export const GET_PROJECTS = '[Project] Get projects';
export const GET_PROJECT = '[Project] Get project';
export const GET_COMPONENTS = '[Component] Get components';
export const GET_COMPONENT = '[Component] Get component';
export const GET_RELEASES = '[Release] Get releases';
export const GET_RELEASE = '[Release] Get release';
export const GET_ATTACHMENT = '[Attachment] Get attachment';
export const GET_VENDORS = '[Vendor] Get vendors';
export const GET_VENDOR = '[Vendor] Get vendor';
export const GET_LICENSES = '[License] Get licenses';
export const GET_LICENSE = '[License] Get license';

export class GetUsers implements Action {
  readonly type = GET_USERS;
  constructor(public users: EmbeddedUser[]) { }
}

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public user: User) { }
}

export class GetProjects implements Action {
  readonly type = GET_PROJECTS;
  constructor(public projects: EmbeddedProject[]) { }
}

export class GetProject implements Action {
  readonly type = GET_PROJECT;
  constructor(public project: Project) { }
}

export class GetComponents implements Action {
  readonly type = GET_COMPONENTS;
  constructor(public components: EmbeddedSW360Component[]) { }
}

export class GetComponent implements Action {
  readonly type = GET_COMPONENT;
  constructor(public component: SW360Component) { }
}

export class GetReleases implements Action {
  readonly type = GET_RELEASES;
  constructor(public releases: EmbeddedRelease[]) { }
}

export class GetRelease implements Action {
  readonly type = GET_RELEASE;
  constructor(public release: Release) { }
}

export class GetAttachment implements Action {
  readonly type = GET_ATTACHMENT;
  constructor(public attachment: Attachment) { }
}

export class GetVendors implements Action {
  readonly type = GET_VENDORS;
  constructor(public vendors: EmbeddedVendor[]) { }
}

export class GetVendor implements Action {
  readonly type = GET_VENDOR;
  constructor(public vendor: Vendor) { }
}

export class GetLicenses implements Action {
  readonly type = GET_LICENSES;
  constructor(public licenses: EmbeddedLicense[]) { }
}

export class GetLicense implements Action {
  readonly type = GET_LICENSE;
  constructor(public license: License) { }
}

export type All = 
  GetUsers | GetUser |
  GetProjects | GetProject |
  GetComponents | GetComponent |
  GetReleases | GetRelease |
  GetAttachment |
  GetVendors | GetVendor |
  GetLicenses | GetLicense;