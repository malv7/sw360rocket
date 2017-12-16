import { markParentViewsForCheckProjectedViews } from "@angular/core/src/view/util";

export enum ComponentTypes {
  INTERNAL = 'INTERNAL',
  OSS = 'OSS',
  COTS = 'COTS',
  FREESOFTWARE = 'FREESOFTWARE',
  INNER_SOURCE = 'INNER_SOURCE',
  SERVICE = 'SERVICE'
}

export const COMPONENT_TYPES = [
  ComponentTypes.INTERNAL,
  ComponentTypes.OSS,
  ComponentTypes.COTS,
  ComponentTypes.FREESOFTWARE,
  ComponentTypes.INNER_SOURCE,
  ComponentTypes.SERVICE
];

export interface ComponentDataLayout {
  name: string;
  description: string;
  createdOn: string;
  type: string; // always 'compnent
  componentType: ComponentTypes;
  createdBy: ResolvedCreatedBy; // has self
  vendors: string[]; //
  releases: ResolvedRelease[]
}

export interface ResolvedCreatedBy {
  email: string;
  href: string;
}

export interface ResolvedRelease {
  name: string;
  version: string;
  href: string;
}

const MOCK_NAMES = ['Apache2', 'Angular', 'Linux Kernel', 'SW360'];

const MOCK_DESCRIPTIONS = [

  `Angular (commonly referred to as "Angular 2+" or "Angular 2") is a
  TypeScript-based open-source front-end web application platform led by
  the Angular Team at Google and by a community of individuals and corporations
  to address all of the parts of the developer's workflow while building
  complex web applications. Angular is a complete rewrite from the same team
  that built AngularJS.`,

  `The Apache HTTP Server, colloquially called Apache (/əˈpætʃiː/ ə-PA-chee),
  is free and open-source cross-platform web server software, released under the
  terms of Apache License 2.0. Apache is developed and maintained by an open
  community of developers under the auspices of the Apache Software Foundation.`,

  `Linux (/ˈlɪnəks/ (About this sound listen) LIN-əks)[9][10] is a name which broadly
  denotes a family of free and open-source software operating systems (OS) built
  around the Linux kernel. Typically, Linux is packaged in a form known as a
  Linux distribution (or distro for short) for both desktop and server use.
  The defining component of a Linux distribution is the Linux kernel,[11] an
  operating system kernel first released on September 17, 1991, by Linus Torvalds.`,

  `A software component catalogue application - designed to work with FOSSology.
  SW360 is a liferay portal application to maintain your projects / products and the
  software components within. It can send files to the open source license scanner
  FOSSology for checking the license conditions and maintain license information.`

];

const MOCK_CREATED_ON = [
  '2016-12-15',
  '2017-10-11',
  '2014-12-07',
  '2016-01-13',
];

const MOCK_CREATED_BY: ResolvedCreatedBy[] = [
  { email: 'dagobert@duck.de', href: 'selflink' },
  { email: 'info@duck.de', href: 'selflink' },
  { email: 'important@duck.de', href: 'selflink' },
  { email: 'tick@duck.de', href: 'selflink' }
];

const MOCK_RELEASES: ResolvedRelease[] = [
  { name: 'Angular 5.0.0', version: '5.0.0', href: 'selflink' },
  { name: 'Apache 2.0.1', version: '2.0.1', href: 'selflink' },
  { name: 'Linux Kernel 1.0.0', version: '1.0.0', href: 'selflink' },
  { name: 'SW360 5.0.0', version: '5.0.0', href: 'selflink' },
];

const MOCK_VENDORS = ['Vanilla', 'Tedious', 'Goolf', 'LinkWins'];

export const componentDataLayoutFactory = (amount: number)  => {
  const componentDataLayouts: ComponentDataLayout[] = [];
  for (let i = 0; i < amount; i++) {
    let c: ComponentDataLayout = {
      name: MOCK_NAMES[randomArraySelector(MOCK_NAMES.length)],
      description: MOCK_DESCRIPTIONS[randomArraySelector(MOCK_DESCRIPTIONS.length)],
      createdOn: MOCK_CREATED_ON[randomArraySelector(MOCK_CREATED_ON.length)],
      type: 'component', // always 'compnent'
      componentType: COMPONENT_TYPES[randomArraySelector(COMPONENT_TYPES.length)],
      createdBy: MOCK_CREATED_BY[randomArraySelector(MOCK_CREATED_BY.length)],
      vendors: MOCK_VENDORS,
      releases: MOCK_RELEASES
    }
    componentDataLayouts.push(c);
  }
  return componentDataLayouts;
}

const randomArraySelector = (arrayLength: number) => Math.floor(Math.random() * arrayLength);

export enum ClearingState {
  NEW_CLEARING = 'NEW_CLEARING',
  SENT_TO_FOSSOLOGY = 'SENT_TO_FOSSOLOGY',
  UNDER_CLEARING = 'UNDER_CLEARING',
  REPORT_AVAILABLE = 'REPORT_AVAILABLE',
  APPROVED = 'APPROVED'
}

export const CLEARING_STATES = [
  ClearingState.NEW_CLEARING,
  ClearingState.SENT_TO_FOSSOLOGY,
  ClearingState.UNDER_CLEARING,
  ClearingState.REPORT_AVAILABLE,
  ClearingState.APPROVED
];

export interface ReleaseDataLayout {
  name: string;
  version: string;
  clearingState: ClearingState;
  cpeId: string;
  releaseDate: string;
  createdOn: string;
  type: string; // always 'release'
  externalIds: ExternalIds;
  _embedded: ResolvedModerator[];
  // TODO: ???
}

interface ExternalIds {
  [externalId: string]: string;
}

interface EmbeddedModerators {
  // moderators:
}

interface ResolvedModerator {
  email: string;
  href: string;
}

interface ReleaseResponse {
  type: string;
  name: string;
  version: string;
  releaseDate: string;
  externalIds: ExternalIds;
  createdOn: string;
  clearingState: ClearingState;
  cpeId: string;
  _links: ReleaseLinks;
  _embedded: ReleaseEmbedded;
}

interface ReleaseLinks {
  'sw360:component': Link;
  self: Link;
  curies: Curie[];
}

interface Curie {
  href: string;
  name: string;
  templated: boolean;
}

interface Link {
  href: string;
}

interface ReleaseEmbedded {
  moderators: Moderator[];
}

interface Moderator {
  email: string;
  // _links:
  // TODO:
}

// TODO: clearing state parser
// TODO: release data parser

// 2.2.1 Listing users
// _embedded.sw360:users

interface UserResponse {
  _embedded: EmbeddedUser[];
  // _links: Links;
}

interface EmbeddedUsers {
  'sw360:users': EmbeddedUser[];
}

interface EmbeddedUser {
  email: string;
  userGroup: UserGroups;
}

interface Links {
  self?: SelfLink;
  curies?: Curie[];
}

interface SelfLink {
  href: string;
}




enum UserGroups {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CLEARING_ADMIN = 'CLEARING_ADMIN',
  ECC_ADMIN = 'ECC_ADMIN',
  SECURITY_ADMIN = 'SECURITY_ADMIN',
  SW360_ADMI = 'SW360_ADMI'
}

export const USER_GROUPS = [
  UserGroups.USER,
  UserGroups.ADMIN,
  UserGroups.CLEARING_ADMIN,
  UserGroups.ECC_ADMIN,
  UserGroups.SECURITY_ADMIN,
  UserGroups.SW360_ADMI
];

// // 2.3.1 Listing projects
// _embedded.sw360:projects
// // 2.3.2 Get a single project
// _embedded.createdBy
// _embedded.moderators

// // 2.4.1 Listing components
// _embedded.sw360:components
// // 2.4.2 Get a single component
// _embedded.createdBy
// _embedded.releases
// _embedded.moderators
// _embedded.vendors

// // 2.5.1 Listing releases
// _embedded.sw360:releases
// // 2.5.2. Get a single release
// _embedded.moderators

// // 2.6.1. Get a single attachment
// _embedded.createdBy
// _embedded.release

// // 2.7.1. Listing vendors
// _embedded.sw360:vendors

// // 2.8.1. Listing licenses
// _embedded.sw360:licenses


































































































