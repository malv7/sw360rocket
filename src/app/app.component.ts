import { AuthenticationService } from './user/services/authentication.service';
import { Component } from '@angular/core';
import { ModelService } from './state/models';

@Component({
  selector: 'sw-root',
  template: `<sw-structure-root></sw-structure-root>`
})
export class AppComponent {
	constructor(
    // auth: AuthenticationService,
    models: ModelService) { }
}
