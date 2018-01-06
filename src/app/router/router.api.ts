import { CurrentRouteData } from "./state/router.reducer";

/**
 * Possible routes
 */
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

export const emptyCurrentRouteData: CurrentRouteData = {
  showBreadcrumb: false,
  breadCrumbSegments: [],
  isList: false,
  listType: '',
  isDetail: false,
  detailType: '',
  feature: ''
};

// Returns true/false wheter the segment is a list/not
export const isRouteSegmentList = (routeSegment: string) =>
  Object.values(RouteLists).includes(routeSegment) ? true : false;
