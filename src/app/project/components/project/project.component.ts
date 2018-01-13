import { Component } from "@angular/core";
import { projectRoutes } from '../../../router/router.api';

@Component({
  selector: 'sw-project-detail',
  template: `
    <div class="tab-navigation-wrapper">
      <sw-tab-navigation [tabs]="tabs"></sw-tab-navigation>
    </div>
    <div class="main-content" fxLayout="row">
      <div fxFlex>
        <router-outlet></router-outlet>
      </div>
      <sw-overview fxFlex="23em" fxHide.lt-lg="true"></sw-overview>
    </div>
  `
})
export class ProjectComponent {
  tabs = projectRoutes;
}
