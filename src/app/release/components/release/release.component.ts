import { RouteConfiguration } from './../../../router/state/router.models';
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import * as RouterActions from './../../../router/state/router.actions';

@Component({
    selector: 'sw-release',
    template: `
        <!-- the whole template is a clone from single-component -->
        <div class="height-100" fxLayout="row" fxLayoutGap="1em">
            <!-- content -->
            <div class="content" fxLayout="column" fxFlex="1 1 auto" fxLayoutGap="1em">
                <sw-tab-navigation [tabs]="tabs"></sw-tab-navigation>
                <div class="height-100" fxLayout="row">
                <div fxFlex>
                    <router-outlet></router-outlet>
                </div>
                <!-- infobar -->
                <sw-overview fxFlex="23em" fxHide.lt-md="true"></sw-overview>
                </div>
            </div>
        </div>
    `
})
export class ReleaseComponent {

    tabs: RouteConfiguration[] = [
        { route: 'details', title: 'Details' },
        { route: 'vulnerabilities', title: 'Vulnerabilities' },
        { route: 'ecc', title: 'ECC' },
        { route: 'attachments', title: 'Attachments' },
    ];

    constructor(private store: Store<fromRoot.State>) { }
}