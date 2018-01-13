import { Component, OnInit } from '@angular/core';
import { SW360Component } from './../../../../state/models';
import { selectComponent } from './../../../../state/model.reducer';
import { Store } from '@ngrx/store';
import { State } from './../../../../state';
import * as fromModel from './../../../../state/model.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sw-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit {
  
  component: Observable<SW360Component>;
	constructor(private store: Store<State>) { }
  
  ngOnInit() {
    this.component = this.store.select(fromModel.selectComponent);
	}

}

