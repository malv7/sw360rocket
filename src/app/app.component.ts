import { AuthenticationService } from './user/services/authentication.service';
import { Component } from '@angular/core';
import { MalvDataService } from './the-lab/malv-data.service';
import { ModelService } from './state/models';

@Component({
  selector: 'sw-root',
  template: `<sw-structure-root></sw-structure-root>`
})
export class AppComponent {
	// for test purposes only:
	constructor(
    auth: AuthenticationService,
    mds: MalvDataService,
    models: ModelService) { }
}
