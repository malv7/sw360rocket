import { Component, OnInit } from '@angular/core';
import { componentRoutes } from "../../../router/router.api";

@Component({
  selector: 'sw-component',
	template: `
		<sw-generic-content [tabs]="tabs">
			<!-- Define Sidebar Components -->
			<sw-component-overview class="widget"></sw-component-overview>
			<sw-releases-widget class="widget"></sw-releases-widget>
		</sw-generic-content>
	`
})
export class ComponentComponent {
	tabs = componentRoutes;
}
