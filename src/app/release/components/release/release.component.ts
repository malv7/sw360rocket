import { Component } from "@angular/core";
import { releaseRoutes } from "../../../router/router.api";

@Component({
  selector: 'sw-release',
  template: `
	  <div class="tab-navigation-wrapper">
			<sw-tab-navigation [tabs]="tabs"></sw-tab-navigation>
		</div>
		<div class="main-content" fxLayout="row">
			<div fxFlex>
				<router-outlet></router-outlet>
			</div>
			<sw-overview fxFlex="23em" fxHide.lt-lg="true">
				<sw-release-overview></sw-release-overview>
				<sw-vulnerability-widget></sw-vulnerability-widget>
			</sw-overview>
		</div>
    `
})
export class ReleaseComponent {
  tabs = releaseRoutes;
}
