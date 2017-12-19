import { Injectable } from "@angular/core";
import * as ModelActions from './model.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from './../reducers';
import * as fromModel from './model.reducer';

// Resources
enum SW360Resources {
  USERS = 'sw360:users',
  PROJECTS = 'sw360:projects',
  COMPONENTS = 'sw360:components',
  RELEASES = 'sw360:releases',
  ATTACHMENTS = 'sw360:attachments',
  VENDORS = 'sw360:vendors',
  LICENSES = 'sw360:licenses'
}

// Links
export interface Selflink {
  href: string;
}

export interface Links {
  self?: Selflink;
}

// Users
export const getUsers = () => {
  return {
    "_embedded": {
      "sw360:users": [{
        "email": "admin@sw360.org",
        "userGroup": "ADMIN",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn"
          }
        }
      }, {
        "email": "jane@sw360.org",
        "userGroup": "USER",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/amFuZUBzdzM2MC5vcmc="
          }
        }
      }]
    },
    "_links": {
      "curies": [{
        "href": "https://sw360.org/docs/html5/{rel}.html",
        "name": "sw360",
        "templated": true
      }]
    }
  };
};

export const getUser = () => {
  return {
    "type": "user",
    "email": "admin@sw360.org",
    "userGroup": "ADMIN",
    "department": "SW360 Administration",
    "fullName": "John Doe",
    "givenName": "John",
    "lastName": "Doe",
    "_links": {
      "self": {
        "href": "https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn"
      }
    }
  };
}

export enum UserGroups {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CLEARING_ADMIN = 'CLEARING_ADMIN',
  ECC_ADMIN = 'ECC_ADMIN',
  SECURITY_ADMIN = 'SECURITY_ADMIN',
  SW360_ADMIN = 'SW360_ADMIN'
}

export const USER_GROUPS = [
  UserGroups.USER,
  UserGroups.ADMIN,
  UserGroups.CLEARING_ADMIN,
  UserGroups.ECC_ADMIN,
  UserGroups.SECURITY_ADMIN,
  UserGroups.SW360_ADMIN
];

export interface EmbeddedUser {
  email: string;
  userGroup: UserGroups;
  _links: Links;

  // Extractions
  id: string;
  path: string;
}

export interface User extends EmbeddedUser {
  type: string;
  department: string;
  fullName: string;
  givenName: string;
  lastName: string;
  _links: Links;

  // Extractions
  id: string;
  path: string;
}

// Resources
export const getProjects = () => {
  return {
    "_embedded": {
      "sw360:projects": [{
        "name": "Emerald Web",
        "version": "1.0.2",
        "projectType": "PRODUCT",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/projects/376576"
          }
        }
      }, {
        "name": "Orange Web",
        "version": "2.0.1",
        "projectType": "PRODUCT",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/projects/376576"
          }
        }
      }]
    },
    "_links": {
      "curies": [{
        "href": "https://sw360.org/docs/html5/{rel}.html",
        "name": "sw360",
        "templated": true
      }]
    }
  };
}

export const getProject = () => {
  return {
    "type": "project",
    "name": "Emerald Web",
    "description": "Emerald Web provides a suite of components for Critical Infrastructures.",
    "version": "1.0.2",
    "externalIds": {
      "mainline-id-project": "515432"
    },
    "createdOn": "2016-12-15",
    "businessUnit": "sw360 AR",
    "projectType": "PRODUCT",
    "_links": {
      "self": {
        "href": "https://sw360.org/api/projects/376576"
      }
    },
    "_embedded": {
      "createdBy": {
        "email": "admin@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn"
          }
        }
      },
      "moderators": [{
        "email": "jane@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/amFuZUBzdzM2MC5vcmc="
          }
        }
      }, {
        "email": "admin@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn"
          }
        }
      }]
    }
  };
};

export enum ProjectTypes {
  CUSTOMER = 'CUSTOMER',
  INTERNAL = 'INTERNAL',
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
  INNER_SOURCE = 'INNER_SOURCE'
}

export const PROJECT_TYPES = [
  ProjectTypes.CUSTOMER,
  ProjectTypes.INTERNAL,
  ProjectTypes.PRODUCT,
  ProjectTypes.SERVICE,
  ProjectTypes.INNER_SOURCE
];

// Projects
export interface EmbeddedProject {
  name: string;
  version: string;
  projectType: string; // ProjectTypes
  _links: Links;

  // Extractions
  id?: string;
  path?: string;
}

export interface ExternalIds {
  [key: string]: string;
}

export interface Project extends EmbeddedProject {
  type: string // always project
  createdOn: string;
  description: string;
  businessUnit: string;
  externalIds: ExternalIds;
  _embedded: ProjectEmbeddings;
}

export interface ProjectEmbeddings {
  createdBy: EmbeddedCreatedBy;
  moderators: EmbeddedModerator[];
}

export interface EmbeddedCreatedBy {
  email: string;
  _links: Links;
}
export interface EmbeddedModerator {
  email: string;
  _links: Links;
}

export const getComponents = () => {
  return {
    "_embedded": {
      "sw360:components": [{
        "name": "Angular",
        "componentType": "OSS",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/components/17653524"
          }
        }
      }, {
        "name": "Spring Framework",
        "componentType": "OSS",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/components/678dstzd8"
          }
        }
      }]
    },
    "_links": {
      "curies": [{
        "href": "https://sw360.org/docs/html5/{rel}.html",
        "name": "sw360",
        "templated": true
      }]
    }
  };
};

export const getComponent = () => {
  return {
    "type": "component",
    "name": "Angular",
    "description": "Angular is a development platform for building mobile and desktop web applications.",
    "createdOn": "2016-12-15",
    "componentType": "OSS",
    "_links": {
      "self": {
        "href": "https://sw360.org/api/components/17653524"
      }
    },
    "_embedded": {
      "createdBy": {
        "email": "admin@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn"
          }
        }
      },
      "vendors": [null],
      "releases": [{
        "name": "Angular 2.3.0",
        "version": "2.3.0",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/releases/3765276512"
          }
        }
      }, {
        "name": "Angular 2.3.1",
        "version": "2.3.1",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/releases/3765276512"
          }
        }
      }],
      "moderators": [{
        "email": "john@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/am9obkBzdzM2MC5vcmc="
          }
        }
      }, {
        "email": "admin@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn"
          }
        }
      }]
    }
  };
};

export enum SW360ComponentTypes {
  INTERNAL = 'INTERNAL',
  OSS = 'OSS',
  COTS = 'COTS',
  FREESOFTWARE = 'FREESOFTWARE',
  INNER_SOURCE = 'INNER_SOURCE',
  SERVICE = 'SERVICE'
}

export const SW360_COMPONENT_TYPES = [
  SW360ComponentTypes.INTERNAL,
  SW360ComponentTypes.OSS,
  SW360ComponentTypes.COTS,
  SW360ComponentTypes.FREESOFTWARE,
  SW360ComponentTypes.INNER_SOURCE,
  SW360ComponentTypes.SERVICE
];

export interface EmbeddedSW360Component {
  name: string;
  componentType: SW360ComponentTypes;
  _links: Links

  // Extractions
  id?: string;
  path?: string;
}

export interface SW360Component extends EmbeddedSW360Component {
  description
  createdOn
  type: string; // component
  _embedded: SW360ComponentEmbeddings;
}

export interface SW360ComponentEmbeddings {
  createdBy: EmbeddedCreatedBy;
  releases: EmbeddedRelease[];
  moderators: EmbeddedModerator[];
  vendors: EmbeddedVendor[];
}

// TODO: POST
export interface CreateComponent {
  name: string;
  description: string;
  createdBy: string;
  componentType: SW360ComponentTypes; // ComponentTypes
}

export const getReleases = () => {
  return {
    "_embedded": {
      "sw360:releases": [{
        "name": "Angular 2.3.0",
        "version": "2.3.0",
        "externalIds": {
          "mainline-id-component": "1432"
        },
        "createdOn": "2016-12-18",
        "clearingState": "APPROVED",
        "cpeId": "cpe:/a:Google:Angular:2.3.0:",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/releases/3765276511"
          }
        }
      }, {
        "name": "Angular 2.3.1",
        "version": "2.3.1",
        "externalIds": {
          "mainline-id-component": "4876"
        },
        "createdOn": "2016-12-18",
        "clearingState": "APPROVED",
        "cpeId": "cpe:/a:Google:Angular:2.3.1:",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/releases/3765276512"
          }
        }
      }, {
        "name": "ZoneControle",
        "version": "1.4.0",
        "externalIds": {
          "mainline-id-component": "1432"
        },
        "createdOn": "2016-12-18",
        "clearingState": "APPROVED",
        "cpeId": "cpe:/a:Google:Angular:2.3.0:",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/releases/3735276421"
          }
        }
      }, {
        "name": "Angular 5.2.2",
        "version": "5.2.2",
        "externalIds": {
          "mainline-id-component": "1432"
        },
        "createdOn": "2016-12-18",
        "clearingState": "NEW",
        "cpeId": "cpe:/a:Google:Angular:2.3.0:",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/releases/3765326511"
          }
        }
      }, {
        "name": "Rxjs",
        "version": "4.1.1",
        "externalIds": {
          "mainline-id-component": "1432"
        },
        "createdOn": "2016-12-18",
        "clearingState": "SEND TO FOSSOLOGY",
        "cpeId": "cpe:/a:Google:Angular:2.3.0:",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/releases/37235276511"
          }
        }
      }]
    },
    "_links": {
      "curies": [{
        "href": "https://sw360.org/docs/html5/{rel}.html",
        "name": "sw360",
        "templated": true
      }]
    }
  };
};

export const getRelease = () => {
  return {
    "type": "release",
    "name": "Angular 2.3.0",
    "version": "2.3.0",
    "releaseDate": "2016-12-07",
    "externalIds": {
      "mainline-id-component": "1432"
    },
    "createdOn": "2016-12-18",
    "clearingState": "APPROVED",
    "cpeId": "cpe:/a:Google:Angular:2.3.0:",
    "_links": {
      "sw360:component": {
        "href": "https://sw360.org/api/components/17653524"
      },
      "self": {
        "href": "https://sw360.org/api/releases/3765276512"
      },
      "curies": [{
        "href": "https://sw360.org/docs/html5/{rel}.html",
        "name": "sw360",
        "templated": true
      }]
    },
    "_embedded": {
      "moderators": [{
        "email": "jane@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/amFuZUBzdzM2MC5vcmc="
          }
        }
      }, {
        "email": "admin@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn"
          }
        }
      }]
    }
  };
};

// TODOS: ClearingStates

// TODO:
export interface EmbeddedRelease {
  name: string;
  version: string;
  externalIds: ExternalIds;
  createdOn: string;
  clearingState: string // ClearingStates
  cpeId: string;
  _links: Links;

  // Extractions
  id?: string;
  path?: string;
}

export interface Release extends EmbeddedRelease {
  releaseDate: string;
  type: string; // release
  _embedded: ReleaseEmbeddings;
}

export interface ReleaseEmbeddings {
  moderators: EmbeddedModerator[];
}

export const getAttachment = () => {
  return {
    "filename": "spring-core-4.3.4.RELEASE.jar",
    "sha1": "da373e491d3863477568896089ee9457bc316783",
    "attachmentType": "BINARY_SELF",
    "createdTeam": "Clearing Team 1",
    "createdComment": "please check before Christmas :)",
    "createdOn": "2016-12-18",
    "checkedTeam": "Clearing Team 2",
    "checkedComment": "everything looks good",
    "checkedOn": "2016-12-18",
    "checkStatus": "ACCEPTED",
    "_links": {
      "sw360:release": {
        "href": "https://sw360.org/api/releases/874687"
      },
      "self": {
        "href": "https://sw360.org/api/attachments/76537653"
      },
      "curies": [{
        "href": "https://sw360.org/docs/html5/{rel}.html",
        "name": "sw360",
        "templated": true
      }]
    },
    "_embedded": {
      "createdBy": {
        "email": "admin@sw360.org",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn"
          }
        }
      },
      "release": {
        "name": "Spring Core 4.3.4",
        "version": "4.3.4",
        "clearingState": "APPROVED",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/releases/874687"
          }
        }
      }
    }
  };
};

export enum AttachmentTypes {
  DOCUMENT = 'DOCUMENT',
  SOURCE = 'SOURCE',
  DESIGN = 'DESIGN',
  REQUIREMENT = 'REQUIREMENT',
  CLEARING_REPORT = 'CLEARING_REPORT',
  COMPONENT_LICENSE_INFO_XML = 'COMPONENT_LICENSE_INFO_XML',
  COMPONENT_LICENSE_INFO_COMBINED = 'COMPONENT_LICENSE_INFO_COMBINED',
  SCAN_RESULT_REPORT = 'SCAN_RESULT_REPORT',
  SCAN_RESULT_REPORT_XML = 'SCAN_RESULT_REPORT_XML',
  SOURCE_SELF = 'SOURCE_SELF',
  BINARY = 'BINARY',
  BINARY_SELF = 'BINARY_SELF',
  DECISION_REPORT = 'DECISION_REPORT',
  LEGAL_EVALUATION = 'LEGAL_EVALUATION',
  LICENSE_AGREEMENT = 'LICENSE_AGREEMENT',
  SCREENSHOT = 'SCREENSHOT',
  OTHER = 'OTHER',
  README_OSS = 'README_OSS'
}

export const ATTACHMENT_TYPES = [
  AttachmentTypes.DOCUMENT,
  AttachmentTypes.SOURCE,
  AttachmentTypes.DESIGN,
  AttachmentTypes.REQUIREMENT,
  AttachmentTypes.CLEARING_REPORT,
  AttachmentTypes.COMPONENT_LICENSE_INFO_XML,
  AttachmentTypes.COMPONENT_LICENSE_INFO_COMBINED,
  AttachmentTypes.SCAN_RESULT_REPORT,
  AttachmentTypes.SCAN_RESULT_REPORT_XML,
  AttachmentTypes.SOURCE_SELF,
  AttachmentTypes.BINARY,
  AttachmentTypes.BINARY_SELF,
  AttachmentTypes.DECISION_REPORT,
  AttachmentTypes.LEGAL_EVALUATION,
  AttachmentTypes.LICENSE_AGREEMENT,
  AttachmentTypes.SCREENSHOT,
  AttachmentTypes.OTHER,
  AttachmentTypes.README_OSS
];

export interface Attachment {
  filename: string;
  sha1: string;
  attachmentType: string; // AttachmentTypes
  createdTeam: string;
  createdComment: string;
  createdOn: string;
  checkedTeam: string;
  checkedComment: string;
  checkedOn: string;
  checkStatus: string;
  _links: AttachmentLinks; // da muss jetzt release mit rein und nicht nur self
  _embedded: AttatchmentEmbeddings;

  // Extractions
  id?: string;
  path?: string;
}

export interface AttachmentEmbeddedRelease {
  name: string;
  version: string;
  clearingState: string;
  _links: Links;
}

export interface AttatchmentEmbeddings {
  createdBy: EmbeddedCreatedBy;
  release: AttachmentEmbeddedRelease;
}

export interface AttachmentLinks {
  // ??
  self: Selflink;
}

export const getVendors = () => {
  return {
    "_embedded": {
      "sw360:vendors": [{
        "fullName": "Google Inc.",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/vendors/876876776"
          }
        }
      }, {
        "fullName": "Pivotal Software, Inc.",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/vendors/987567468"
          }
        }
      }]
    },
    "_links": {
      "curies": [{
        "href": "https://sw360.org/docs/html5/{rel}.html",
        "name": "sw360",
        "templated": true
      }]
    }
  };
};

export const getVendor = () => {
  return {
    "type": "vendor",
    "url": "https://google.com",
    "shortName": "Google",
    "fullName": "Google Inc.",
    "_links": {
      "self": {
        "href": "https://sw360.org/api/vendors/876876776"
      }
    }
  };
};

export interface EmbeddedVendor {
  fullName: string
  _links: Links;

  // Extractions
  id?: string;
  path?: string;
}

export interface Vendor extends EmbeddedVendor {
  shortName: string;
  url: string;
  type: string; // vendor
}

export const getLicenses = () => {
  return {
    "_embedded": {
      "sw360:licenses": [{
        "fullName": "Apache License 2.0",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/licenses/apache20"
          }
        }
      }, {
        "fullName": "The MIT License (MIT)",
        "_links": {
          "self": {
            "href": "https://sw360.org/api/licenses/mit"
          }
        }
      }]
    },
    "_links": {
      "curies": [{
        "href": "https://sw360.org/docs/html5/{rel}.html",
        "name": "sw360",
        "templated": true
      }]
    }
  };
};

export const getLicense = () => {
  return {
    "type": "license",
    "text": "placeholder for the Apache 2.0 license text",
    "shortName": "Apache 2.0",
    "fullName": "Apache License 2.0",
    "_links": {
      "self": {
        "href": "https://sw360.org/api/licenses/apache20"
      }
    }
  };
};

export interface EmbeddedLicense {
  fullName: string;
  _links: Links;

  // Extractions
  id?: string;
  path?: string;
}

export interface License extends EmbeddedLicense {
  shortName: string;
  text: string;
  type: string; // license
}

@Injectable()
export class ModelService {

  constructor(private store: Store<fromRoot.State>) {

    // Users
    const usersResponse = getUsers();
    const embeddedUsers = (<EmbeddedUser[]>usersResponse._embedded[SW360Resources.USERS]);
    embeddedUsers.forEach(embeddedUser => {
      embeddedUser.id = extractId(embeddedUser._links.self.href);
      embeddedUser.path = extractPath(embeddedUser._links.self.href);
    });

    store.dispatch(new ModelActions.GetUsers(embeddedUsers));
    this.store.select(fromModel.selectUsers).subscribe(users => {
      // console.log(users);
      users.forEach(user => {
        // console.log(user.email);
        // console.log(user.userGroup);
        // console.log(user._links.self.href);
        // console.log(user.id);
        // console.log(user.path);
      });
    });

    // User
    const userResponse = getUser();
    const user = (<User>userResponse);
    user.id = extractId(user._links.self.href);
    user.path = extractPath(user._links.self.href);

    store.dispatch(new ModelActions.GetUser(user));
    user._links.self.href = 'murmelkiste';
    store.dispatch(new ModelActions.GetUser(user));
    // this.store.select(fromModel.selectUser).subscribe(user => console.log(user));
    // console.log('-----');
    // console.log('-----');
    // console.log('-----');
    // console.log('-----');
    // this.store.select(fromModel.selectUserMap).subscribe(userMap => console.log(userMap[user._links.self.href]));

    // Projects
    const projectsResponse = getProjects();
    const embeddedProjects = (<EmbeddedProject[]>projectsResponse._embedded[SW360Resources.PROJECTS]);
    patchIdPath(embeddedProjects);
    store.dispatch(new ModelActions.GetProjects(embeddedProjects));
    // store.select(fromModel.selectProjects).subscribe(x => console.log(x));

    // Project
    const projectResponse = getProject();
    const project = (<Project>projectResponse);
    patchIdPath([project]);
    store.dispatch(new ModelActions.GetProject(project));
    // store.select(fromModel.selectProject).subscribe(x => console.log(x));

    // Components
    const componentsResponse = getComponents();
    const embeddedComponents = (<EmbeddedSW360Component[]>componentsResponse._embedded[SW360Resources.COMPONENTS]);
    patchIdPath(embeddedComponents);
    store.dispatch(new ModelActions.GetComponents(embeddedComponents));
    // store.select(fromModel.selectComponents).subscribe(x => console.log(x));

    // Component
    const componentResponse = getComponent();
    const component = (<SW360Component>componentResponse);
    patchIdPath([component]);
    store.dispatch(new ModelActions.GetComponent(component));
    // store.select(fromModel.selectComponent).subscribe(x => console.log(x));

    // Releases
    const releasesResponse = getReleases();
    const embeddedReleases = (<EmbeddedRelease[]>releasesResponse._embedded[SW360Resources.RELEASES]);
    patchIdPath(embeddedReleases);
    store.dispatch(new ModelActions.GetReleases(embeddedReleases));
    // store.select(fromModel.selectReleases).subscribe(x => console.log(x));

    // Release
    const releaseResponse = getRelease();
    const release = (<Release>releaseResponse);
    patchIdPath([release]);
    store.dispatch(new ModelActions.GetRelease(release));
    // store.select(fromModel.selectRelease).subscribe(x => console.log(x));

    // Attachment
    const attachmentResponse = getAttachment();
    const attachment = (<Attachment>attachmentResponse);
    patchIdPath([attachment]);
    store.dispatch(new ModelActions.GetAttachment(attachment));
    // store.select(fromModel.selectAttachment).subscribe(x => console.log(x));

    // Vendors
    const vendorsResponse = getVendors();
    const embeddedVendors = (<EmbeddedVendor[]>vendorsResponse._embedded[SW360Resources.VENDORS]);
    patchIdPath(embeddedVendors);
    store.dispatch(new ModelActions.GetVendors(embeddedVendors));
    // store.select(fromModel.selectVendors).subscribe(x => console.log(x));

    // Vendor
    const vendorResponse = getVendor();
    const vendor = (<Vendor>vendorResponse);
    patchIdPath(embeddedVendors);
    store.dispatch(new ModelActions.GetVendor(vendor));
    // store.select(fromModel.selectVendor).subscribe(x => console.log(x));

    // Licenses
    const licensesResponse = getLicenses();
    const embeddedLicenses = (<EmbeddedLicense[]>licensesResponse._embedded[SW360Resources.LICENSES]);
    patchIdPath(embeddedLicenses);
    store.dispatch(new ModelActions.GetLicenses(embeddedLicenses));
    // store.select(fromModel.selectLicenses).subscribe(x => console.log(x));

    // License
    const licenseResponse = getLicense();
    const license = (<License>licenseResponse);
    patchIdPath([license]);
    store.dispatch(new ModelActions.GetLicense(license));
    // store.select(fromModel.selectLicense).subscribe(x => console.log(x));
  }

}

export type EmbeddedResource = EmbeddedUser | EmbeddedProject | Project | EmbeddedSW360Component | SW360Component | EmbeddedRelease | Attachment | EmbeddedVendor | Vendor | EmbeddedLicense | License;

const patchIdPath = (embeddedResources: EmbeddedResource[]) => {
  embeddedResources.forEach(embeddedResource => {
    embeddedResource.id = extractId(embeddedResource._links.self.href);
    embeddedResource.path = extractPath(embeddedResource._links.self.href);
  });
};

const extractId = (href: string) => {
  const segments = href.split('/');
  const id = segments[segments.length - 1];
  return id;
};

const extractPath = (href: string) => {
  const segments = href.split('/');
  const path = segments[segments.length - 2] + '/' + segments[segments.length - 1];
  return path;
};