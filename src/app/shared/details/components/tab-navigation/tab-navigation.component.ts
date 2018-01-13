import { Component, Input } from '@angular/core';
import { RouteConfiguration } from '../../../../router/router.api';

@Component({
  selector: 'sw-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss']
})

export class TabNavigationComponent {
  @Input() tabs: RouteConfiguration[];
}