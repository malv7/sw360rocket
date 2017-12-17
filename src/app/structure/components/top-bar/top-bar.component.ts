import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as RouterActions from './../../../router/state/router.actions';

interface NavigationElement {
  title: string;
  route: string;
}

@Component({
  selector: 'sw-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  navigationElements: NavigationElement[] = [
    { title: 'Projects',        route: 'projects' },
    { title: 'Components',      route: 'components' },
    { title: 'Licenses',        route: 'licenses' },
    { title: 'ECC',             route: 'ecc' },
    { title: 'Vulnerabilities', route: 'vulnerabilities' },
    { title: 'About',           route: 'about' }
  ];

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  go(route: string) {
    this.store.dispatch(new RouterActions.Go({
      path: [`${route}`]
    }))
  }

}
