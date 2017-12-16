import { Injectable } from "@angular/core";
import { Event, NavigationEnd } from "@angular/router";

@Injectable()
export class RouterService {

  parseRoute(event: Event) {
    console.log(event);
    
    if(event instanceof NavigationEnd) {
      // console.log("navigation event");
      // console.log(event);
    }
    
    
    // event
    //   .filter(event => event instanceof NavigationEnd)
    //   .map((event: NavigationEnd) => {
    //     // console.log(event);
    //     // console.log(event.url);
    //     // console.log(event.urlAfterRedirects);
    //   });
  }

}