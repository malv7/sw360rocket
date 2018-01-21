// First class segments
export const PROJECTS = 'projects';
export const COMPONENTS = 'components';
export const RELEASES = 'releases';
export const VULNERABILITIES = 'vulnerabilities';
export const ATTACHMENTS = 'attachments';
export const LICENSES = 'licenses';
export const VENDORS = 'vendors';
export const USERS = 'users';
export const ECC = 'ecc';
export const DETAILS = 'details';
export const HOME = 'home';
export const ABOUT = 'about';

// Secondary class segments
export const CREATE = 'create';
export const ID = ':id';

export enum UrlSegments {
  projects = 'projects',
  components = 'components',
  releases = 'releases',
  vulnerabilities = 'vulnerabilities',
  attachments = 'attachments',
  licenses = 'licenses',
  vendors = 'vendors',
  users = 'users',
  ecc = 'ecc',
  create = 'create',
  details = 'details'
}

export enum ActiveFeatures {
  isComponents,
  isComponent,
  isProjects,
  isProject,
  isReleases,
  isRelease,
  isVulnerabilities,
  isVulnerability,
  // isEccs
  isUsers,
  isUser,
  isVendors,
  isVendor,
  isLicenses,
  isLicense,
  isAttachments,
  isAttachment
}

export interface ReleaseContextRoute {
  type: string;
  id: string;
}

export interface RouteConfiguration {
  title: string;
  route: string;
}

// Returns true/false wheter the segment is a list/not
export const isRouteSegmentList = (routeSegment: string) =>
  Object.values(UrlSegments).includes(routeSegment) ? true : false;

export const mainNavigationRoutes: RouteConfiguration[] = [
  { title: 'Projects', route: 'projects' },
	{ title: 'Components', route: 'components' },
  // { title: 'Licenses',        route: 'licenses' },
  // { title: 'ECC',             route: 'ecc' },
  // { title: 'Vulnerabilities', route: 'vulnerabilities' },
  // { title: 'About',           route: 'about' }
];

export const componentRoutes: RouteConfiguration[] = [
  { route: 'details', title: 'Details' },
  { route: 'releases', title: 'Releases' },
  { route: 'attachments', title: 'Attachments' }
];

export const projectRoutes: RouteConfiguration[] = [
  { route: 'details', title: 'Details' },
  { route: 'releases', title: 'Releases' },
  { route: 'attachments', title: 'Attachments' }
];

export const releaseRoutes: RouteConfiguration[] = [
  { route: 'details', title: 'Details' },
  { route: 'vulnerabilities', title: 'Vulnerabilities' },
  { route: 'ecc', title: 'ECC' },
  { route: 'clearing', title: 'Clearing' },
  { route: 'attachments', title: 'Attachments' },
];
