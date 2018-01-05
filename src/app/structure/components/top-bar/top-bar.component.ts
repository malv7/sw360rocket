import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as RouterActions from './../../../router/state/router.actions';
import { Subscription } from 'rxjs/Subscription';
import { RouteConfiguration } from '../../../router/state/router.models';

@Component({
  selector: 'sw-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  navigationElements: RouteConfiguration[] = [
    { title: 'Projects',        route: 'projects' },
    { title: 'Components',      route: 'components' },
    // { title: 'Licenses',        route: 'licenses' },
    // { title: 'ECC',             route: 'ecc' },
    // { title: 'Vulnerabilities', route: 'vulnerabilities' },
    // { title: 'About',           route: 'about' }
  ];
}
