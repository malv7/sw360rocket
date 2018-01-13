import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // TODO: if a detail has been resolved fine
    // set active element of the corresponding feature type
    // check current route if it is that feature
    // if so, set main title to name or whatever
    
    // Observable.interval(1000)
      // .subscribe(() => console.log(this.router.url));
  }
}