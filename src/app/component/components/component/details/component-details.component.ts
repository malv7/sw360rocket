import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { selectComponent } from './../../../../state/model.reducer';
import { Store } from '@ngrx/store';
import { State } from './../../../../state';
import { Observable } from 'rxjs/Observable';
import { SW360Component, SW360Vendor } from '../../../../resources/resources.api';
import *  as fromComponent from './../../../state/component.reducer';

@Component({
  selector: 'sw-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit, OnDestroy {

  component: SW360Component;
  vendors: SW360Vendor[] = [];
  componentSub: Subscription;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.componentSub = this.store.select(fromComponent.selectComponent)
      .subscribe(component => {
        this.component = component;
        console.log(this.component)
        this.vendors = (this.component && this.component._embedded && this.component._embedded.vendors)
          ? this.component._embedded.vendors
          : [];
      });
  }

  ngOnDestroy() {
    if (this.componentSub) this.componentSub.unsubscribe();
  }

}

