import * as fromComponent from './../component/state/component.reducer';

// Resources
////////////

export enum SW360Resources {
    users = 'sw360:users',
    projects = 'sw360:projects',
    components = 'sw360:components',
    releases = 'sw360:releases',
    attachments = 'sw360:attachments',
    vendors = 'sw360:vendors',
    licenses = 'sw360:licenses'
}

// Links
////////

export interface Selflink {
    href: string;
}

export interface Links {
    self?: Selflink;
    // TODO: other links?
}

export interface CreatedBy {
    email: string;
    _links: Links;
}
export interface Moderator {
    email: string;
    _links: Links;
}

export interface ExternalIds {
    [key: string]: string;
}

// Vendors
//////////

export interface SW360Vendor {
    type: string; // vendor
    fullName: string
    shortName: string;
    url: string;
    _links: Links;
}

// Releases
///////////

export enum SW360ReleaseClearingStates {
    NEW_CLEARING = 'NEW_CLEARING,',
    SENT_TO_FOSSOLOGY = 'SENT_TO_FOSSOLOGY,',
    UNDER_CLEARING = 'UNDER_CLEARING,',
    REPORT_AVAILABLE = 'REPORT_AVAILABLE,',
    APPROVED = 'APPROVED,'
}

export interface SW360Release extends SW360Resource {
    name: string;
    version: string;
    externalIds: ExternalIds;
    createdOn: string;
    clearingState: SW360ReleaseClearingStates;
    cpeId: string;
    // _links: Links;
}

// Components
/////////////

export enum SW360ComponentTypes {
    INTERNAL = 'INTERNAL',
    OSS = 'OSS',
    COTS = 'COTS',
    FREESOFTWARE = 'FREESOFTWARE',
    INNER_SOURCE = 'INNER_SOURCE',
    SERVICE = 'SERVICE'
}

export interface SW360ComponentEmbedded {
    createdBy: CreatedBy;
    releases: SW360Release[];
    moderators: Moderator[];
    vendors: SW360Vendor[];
}

export interface SW360Component extends SW360Resource {
    name?: string;
    componentType?: string;
    description?: string;
    createdOn?: string;
    type?: string; // component
    // _links?: Links;
    _embedded?: SW360ComponentEmbedded;
}

export interface CreateSW360Component {
    name: string;
    description: string;
    createdBy: string;
    componentType: SW360ComponentTypes;
}

// Projects
///////////

export enum SW360ProjectTypes {
    CUSTOMER = 'CUSTOMER',
    INTERNAL = 'INTERNAL',
    PRODUCT = 'PRODUCT',
    SERVICE = 'SERVICE',
    INNER_SOURCE = 'INNER_SOURCE'
  }

export interface SW360Project extends SW360Resource {
    name: string;
    version: string;
    projectType: SW360ProjectTypes; // ProjectTypes
    type: string // always project
    createdOn: string;
    description: string;
    businessUnit: string;
    externalIds: ExternalIds;
    _embedded: SW360ProjectEmbedded;
    // _links: Links;
}

export interface SW360ProjectEmbedded {
    createdBy: CreatedBy;
    moderators: Moderator[];
    containedReleases: SW360Release[];
}
export interface SW360Resource {
    _links: Links;
}