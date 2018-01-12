import { RouteConfiguration } from './../../../../router/state/router.models';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss']
})

export class TabNavigationComponent {
  @Input() tabs: RouteConfiguration[];
}