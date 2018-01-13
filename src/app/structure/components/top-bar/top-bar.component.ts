import { Component } from '@angular/core';
import { mainNavigationRoutes } from '../../../router/router.api';

@Component({
  selector: 'sw-top-bar',
  template: `
    <div class="menu">
	    <a *ngFor="let n of navigationElements"
	    	[routerLink]="n.route"
	    	routerLinkActive="active">
	    	{{ n.title }}
	    </a>
    </div>
  `,
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  navigationElements = mainNavigationRoutes;
}
