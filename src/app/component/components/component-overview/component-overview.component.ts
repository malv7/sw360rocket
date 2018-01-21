import { Component, OnInit, OnDestroy } from '@angular/core';
import *  as fromComponent from './../../state/component.reducer';
import { SW360Component } from '../../../resources/resources.api';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { State } from '../../../state';

@Component({
  selector: 'sw-component-overview',
  templateUrl: './component-overview.component.html',
  styleUrls: ['./component-overview.component.scss']
})
export class ComponentOverviewComponent implements OnInit, OnDestroy {

  component: SW360Component;
  componentSub: Subscription;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.componentSub = this.store.select(fromComponent.selectComponent)
      .subscribe(component => {
        this.component = component;
      });
  }

  ngOnDestroy(): void {
    if (this.componentSub) this.componentSub.unsubscribe();
  }

}
