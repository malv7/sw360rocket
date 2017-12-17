import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as RouterActions from './../../../router/state/router.actions';

@Component({
  selector: 'sw-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  go() {
    this.store.dispatch(new RouterActions.Go({
      path: ['']
    }));
  }
}
