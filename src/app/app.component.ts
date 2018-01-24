import { AuthenticationService } from './user/services/authentication.service';
import { Component } from '@angular/core';
import { ModelService } from './state/models';
import { HttpService } from './http/services/http.service';
import { Store } from '@ngrx/store';
import { State } from './state';
import * as fromTable from './shared/tables/state/table.reducer';

@Component({
  selector: 'sw-root',
  template: `<sw-structure-root></sw-structure-root>`
})
export class AppComponent {
	constructor(
    private auth: AuthenticationService,
    private httpService: HttpService,
    // private models: ModelService,
    private store: Store<State>) { }
}
