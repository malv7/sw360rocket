import * as fromComponent from './../component/state/component.reducer';

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
    fullName: string
    _links: Links;
    shortName: string;
    url: string;
    type: string; // vendor
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

export interface SW360Release {
    name: string;
    version: string;
    externalIds: ExternalIds;
    createdOn: string;
    clearingState: SW360ReleaseClearingStates;
    cpeId: string;
    _links: Links;
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

export interface SW360Component {
    name: string;
    componentType: SW360ComponentTypes;
    description: string;
    createdOn: string;
    type: string; // component
    _links: Links;
    _embedded: SW360ComponentEmbedded;
}

export interface CreateSW360Component {
    name: string;
    description: string;
    createdBy: string;
    componentType: SW360ComponentTypes;
}