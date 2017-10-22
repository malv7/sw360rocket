import { Component } from '@angular/core';

// The "root" app component has the only purpose to provide a router-outlet.
// Doing this allows to swap the landing page with a single change in the routing-module.
@Component({
  selector: 'app-root',
  // Lookout for the "root" routing module to find out what gets routed into this router-outlet.
  template: `
    yo
  `
})
export class AppComponent { 

}
