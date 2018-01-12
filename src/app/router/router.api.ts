import { RouteData } from "./state/router.reducer";

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
export const CREATE = '/create';
export const ID = '/:id';

export enum RouteLists {
  projects = 'projects',
  components = 'components',
  releases = 'releases',
  vulnerabilities = 'vulnerabilities',
  attachmetns = 'attachments',
  licenes = 'licenses',
  vendors = 'vendors',
  users = 'users',
  ecc = 'ecc'
}

export const emptyCurrentRouteData: RouteData = {
  showBreadcrumb: false,
  breadCrumbSegments: [],
  ressourceType: '',
  ressourceContext: ''
};

// Returns true/false wheter the segment is a list/not
export const isRouteSegmentList = (routeSegment: string) =>
  Object.values(RouteLists).includes(routeSegment) ? true : false;
