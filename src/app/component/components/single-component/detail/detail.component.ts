import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers';
import { ComponentDataLayout, ResolvedRelease } from '../../../state/component.models';
import { Router, Routes } from '@angular/router';
import * as RouterActions from './../../../../router/state/router.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sw-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  components: Observable<ComponentDataLayout[]>;
	currentComponent: ComponentDataLayout;
  constructor(private store: Store<fromRoot.State>, public router: Router) { }
  

  ngOnInit() {
    this.components = this.store.select(fromRoot.selectComponents);
		this.components.subscribe(componentData => {
      this.currentComponent=componentData[0];
      console.log(this.currentComponent);
    } )
  }

}
