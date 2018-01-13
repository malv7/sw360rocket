import { AuthenticationService } from './user/services/authentication.service';
import { Component } from '@angular/core';
import { ModelService } from './state/models';
import { HttpService } from './http/services/http.service';

@Component({
  selector: 'sw-root',
  template: `<sw-structure-root></sw-structure-root>`
})
export class AppComponent {
	constructor(
    // auth: AuthenticationService,
    private httpService: HttpService,
    private models: ModelService) { }
}
