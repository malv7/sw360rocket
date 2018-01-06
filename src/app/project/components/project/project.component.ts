import { RouteConfiguration } from './../../../router/state/router.models';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../reducers';
import * as RouterActions from './../../../router/state/router.actions';
import * as StructureActions from './../../../structure/state/structure.actions';
import { Subscription } from 'rxjs/Subscription';
import * as fromModel from './../../../state/model.reducer';

@Component({
  selector: 'sw-project-detail',
  template: `
    <!-- the whole template is a clone from single-component -->
    <div class="tab-navigation-wrapper">
		<sw-tab-navigation [tabs]="tabs"></sw-tab-navigation>
		</div>
		<!-- content -->
		<div class="main-content" fxLayout="row">
			<div fxFlex>
				<router-outlet></router-outlet>
			</div>
			<!-- infobar -->
			<sw-overview fxFlex="23em" fxHide.lt-lg="true"></sw-overview>
		</div>
  `
})
export class ProjectComponent implements OnInit, OnDestroy {

  tabs: RouteConfiguration[] = [
		{ route: 'details', title: 'Details' },
		{ route: 'releases', title: 'Releases' },
    { route: 'attachments', title: 'Attachments' }
  ];

  titleSub: Subscription;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.titleSub = this.store.select(fromModel.selectProject).subscribe(project => {
      if(project.name) this.store.dispatch(new StructureActions.SetTitle(project.name));
    });
  }

  ngOnDestroy() {
    if(this.titleSub) this.titleSub.unsubscribe();
  }
}
