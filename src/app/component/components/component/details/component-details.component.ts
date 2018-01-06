import { SW360Component } from './../../../../state/models';
import { selectComponent } from './../../../../state/model.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers';
import * as fromModel from './../../../../state/model.reducer';
import { Router, Routes } from '@angular/router';
import * as RouterActions from './../../../../router/state/router.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as StructureActions from './../../../../structure/state/structure.actions';

@Component({
  selector: 'sw-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit, OnDestroy {
  
  component: Observable<SW360Component>;
  titleSub: Subscription;
	constructor(private store: Store<fromRoot.State>, public router: Router) { }
  
  ngOnInit() {
    this.component = this.store.select(fromModel.selectComponent);
    this.titleSub = this.component.subscribe(component => {
      if(component.name) this.store.dispatch(new StructureActions.SetTitle(component.name));
    });
	}
  
  ngOnDestroy(): void {
    if(this.titleSub) this.titleSub.unsubscribe();
  }
}

