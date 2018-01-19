import { Component } from "@angular/core";
import { releaseRoutes } from "../../../router/router.api";

@Component({
	selector: 'sw-release',
	template: `
		<sw-generic-content [tabs]="tabs">
			<!-- Define Sidebar Components -->
			<sw-release-overview></sw-release-overview>
			<sw-vulnerability-widget></sw-vulnerability-widget>
		</sw-generic-content>
	`
})
export class ReleaseComponent {
  tabs = releaseRoutes;
}
