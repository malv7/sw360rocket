import { RouteConfiguration } from './../../../router/state/router.models';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import * as RouterActions from './../../../router/state/router.actions';
import * as StructureActions from './../../../structure/state/structure.actions';
import { Subscription } from 'rxjs/Subscription';
import * as fromModel from './../../../state/model.reducer';

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
export class ReleaseComponent implements OnInit, OnDestroy {

    tabs: RouteConfiguration[] = [
        { route: 'details', title: 'Details' },
        { route: 'vulnerabilities', title: 'Vulnerabilities' },
        { route: 'ecc', title: 'ECC' },
        { route: 'attachments', title: 'Attachments' },
    ];

    titleSub: Subscription;
    constructor(private store: Store<fromRoot.State>) { }

    ngOnInit() {
      this.titleSub = this.store.select(fromModel.selectRelease).subscribe(release => {
        if(release.name) this.store.dispatch(new StructureActions.SetTitle(release.name));
      });
    }

    ngOnDestroy() {
      if(this.titleSub) this.titleSub.unsubscribe();
    }
}