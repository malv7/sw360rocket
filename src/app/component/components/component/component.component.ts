import { Component, OnInit } from '@angular/core';
import { componentRoutes } from '../../../router/router.api';

@Component({
  selector: 'sw-component',
  template: `
    <div class="tab-navigation-wrapper">
	    <sw-tab-navigation [tabs]="tabs"></sw-tab-navigation>
    </div>
    <div class="main-content" fxLayout="row">
      <div fxFlex>
        <router-outlet></router-outlet>
      </div>
      <sw-overview fxFlex="23em" fxHide.lt-lg="true">
		    <sw-component-overview></sw-component-overview>
		    <sw-releases-widget></sw-releases-widget>
	    </sw-overview>
    </div>
`
})
export class ComponentComponent {
  tabs = componentRoutes;
}
