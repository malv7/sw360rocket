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

export interface User {
  type: string;
  email: string;
  userGroup: string;
  department: string;
  fullName: string;
  givenName: string;
  lastName: string;
  _links: Links;

  // Extractions
  id: string;
  path: string;
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
      console.log(users);
      users.forEach(user => {
        console.log(user.email);
        console.log(user.userGroup);
        console.log(user._links.self.href);
        console.log(user.id);
        console.log(user.path);
      });
    });
    
    // User
    const userResponse = getUser();
    const user = (<User> userResponse);
    user.id = extractId(user._links.self.href);
    user.path = extractPath(user._links.self.href);

    store.dispatch(new ModelActions.GetUser(user));
    user._links.self.href = 'murmelkiste';
    store.dispatch(new ModelActions.GetUser(user));
    this.store.select(fromModel.selectUser).subscribe(user => console.log(user));
    console.log('-----');
    console.log('-----');
    console.log('-----');
    console.log('-----');
    this.store.select(fromModel.selectUserMap).subscribe(userMap => console.log(userMap[user._links.self.href]));
  }

    

}






























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