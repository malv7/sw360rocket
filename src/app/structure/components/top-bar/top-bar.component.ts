import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as RouterActions from './../../../router/state/router.actions';
import { Subscription } from 'rxjs/Subscription';

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
    // { title: 'ECC',             route: 'ecc' },
    // { title: 'Vulnerabilities', route: 'vulnerabilities' },
    { title: 'About',           route: 'about' }
  ];

  featureSub: Subscription;
  feature: string = '';

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.featureSub = this.store.select(fromRoot.selectCurrentRouteData)
      .map(currentRouteData => currentRouteData.feature)
      .subscribe(feature => this.feature = feature);
  }

  ngOnDestroy() {
    if(this.featureSub) this.featureSub.unsubscribe();
  }

  go(route: string) {
    this.store.dispatch(new RouterActions.Go({
      path: [`${route}`]
    }))
  }

}
