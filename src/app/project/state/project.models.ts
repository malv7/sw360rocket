import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

const projectTypes = [
  'CUSTOMER',
  'INTERNAL',
  'PRODUCT',
  'SERVICE', 
  'INNER_SOURCE'
]

export interface EmbeddedProject {
  name: string;
  version: string;
  projectType: string;
  _links: Links;
}

interface Project {
  id: string;
  type: string; //project
  name: string;
  // description: string;
  // version: string;
  // createdOn: string;
  // projectType: string;
  // businessUnit: string;
  // externalIds: ExternalIds;
  // _embedded: any;
}

interface EmbeddedCreatedBy {
  email: string;
}

interface Links {
  self?: Self;
}

interface Self {
  href: string;
}

interface ExternalIds {
  [key: string]: string;
}

const EMBEDDED_PROJECTS: EmbeddedProject[] = [
  {
    name: 'productus1',
    version: 'v1',
    projectType: 'PRODUCT',
    _links: {
      self: {
        href: 'https://sw360.org/api/projects/376576'
      }
    }
  },
  {
    name: 'Produkteros2',
    version: 'v2',
    projectType: 'PRODUCT',
    _links: {
      self: {
        href: 'https://sw360.org/api/projects/376576'
      }
    }
  },
];

export const getEmbeddedProducts = () => EMBEDDED_PROJECTS;