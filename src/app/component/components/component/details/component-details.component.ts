import { Component, OnInit } from '@angular/core';
import { selectComponent } from './../../../../state/model.reducer';
import { Store } from '@ngrx/store';
import { State } from './../../../../state';
import { Observable } from 'rxjs/Observable';
import { SW360Component } from '../../../../resources/resources.api';
import *  as fromComponent from './../../../state/component.reducer';

@Component({
  selector: 'sw-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit {
  
  component: Observable<SW360Component>;
	constructor(private store: Store<State>) { }
  
  ngOnInit() {
    this.component = this.store.select(fromComponent.selectComponent);
	}

}

