import { Component } from "@angular/core";
import { projectRoutes } from '../../../router/router.api';

@Component({
  selector: 'sw-project-detail',
  template: `<sw-generic-content [tabs]="tabs"></sw-generic-content>`
})
export class ProjectComponent {
  tabs = projectRoutes;
}
