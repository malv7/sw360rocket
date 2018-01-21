import { SW360Component, SW360Release } from './../../../resources/resources.api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { State } from './../../../state';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import *  as fromComponent from './../../state/component.reducer';
import * as RouterActions from './../../../router/state/router.actions';
import { toSegmentArray } from '../../../router/services/router.service';

@Component({
  selector: 'sw-releases-widget',
  templateUrl: './releases-widget.component.html',
  styleUrls: ['./releases-widget.component.scss']
})
export class ReleasesWidgetComponent implements OnInit, OnDestroy {
  
    releases: SW360Release[];
    component: SW360Component;
    componentSub: Subscription;
    constructor(private store: Store<State>) { }
  
    ngOnInit() {
      this.componentSub = this.store.select(fromComponent.selectComponent)
        .subscribe(component => {
          this.component = component;
          this.releases = (this.component && this.component._embedded && this.component._embedded.releases)
            ? this.component._embedded.releases
            : [];

            
        });
    }
  
    ngOnDestroy(): void {
      if (this.componentSub) this.componentSub.unsubscribe();
    }
    
  }
