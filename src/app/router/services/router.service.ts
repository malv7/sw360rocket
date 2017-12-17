import { Injectable } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RouterService {

  constructor() {
    // console.log("wo")

    const path = '/components/id/details';
    const x = path.split('/');

    const splits = uris.map(uri => uri.split('/'));
    const y = splits.map(split => split[split.length-2] + '/' + split[split.length-1]);
    // console.log(y);

  }  

  parseRoute(event: NavigationEnd) {
    
      let isList = false;
      let isDetail = false;

      const segments = event.urlAfterRedirects.split('/');
      segments.shift();

      if(segments.length === 1) {
        // it must be a main feature route
        // one of the lists or home, about, ....
      }

      if(segments.length === 2) {
        // it must be 
      }

      console.log(segments);



      if(!isList) {
        isDetail = this.isDetail(segments);
      }

  }

  isList(segment: string): boolean {
    return listRoutes.includes(segment) ? true : false;
  }

  isDetail(segments: string[]): boolean {

    const isLastList = this.isList(segments[segments.length - 1]);
    const isPenultimateList = this.isList(segments[segments.length - 2]);

    if(isLastList) {
      return false;
    }

    if(!isLastList) {
      if(isPenultimateList) {
        return true;
      }
    }

  }



}

interface RouteType {
  isList: boolean;

}


const listRoutes = [
  'components',
  'releases',
  'attachments',
  'projects',
  'users',
  'vendors',
  'licenses'
  // TODO: vulnerabilities?
];

const possibleRoutes = [
  '/components',
  '/components/id',
  '/components/id/details',
  '/components/id/releases',
  '/components/id/attachments',

  '/projects',
  '/projects/id',
  '/projects/id/details',
  '/projects/id/releases',
  '/projects/id/attachments',
];

const uris = [
'https://sw360.org/api/users/YWRtaW5Ac3czNjAub3Jn',
'https://sw360.org/api/projects/376576',
'https://sw360.org/api/components/17653524',
'https://sw360.org/api/releases/3765276512',
'https://sw360.org/api/attachments/76537653',
'https://sw360.org/api/vendors/987567468',
'https://sw360.org/api/licenses/apache20'
]