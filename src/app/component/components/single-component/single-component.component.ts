import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import { ComponentDataLayout } from '../../state/component.models';

@Component({
  selector: 'sw-single-component',
  templateUrl: './single-component.component.html',
  styleUrls: ['./single-component.component.scss']
})
export class SingleComponentComponent implements OnInit {



  components: Observable<ComponentDataLayout[]>;

  currentComponent: ComponentDataLayout;

	constructor(private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.components = this.store.select(fromRoot.selectComponents);
		this.components.subscribe(componentData => this.currentComponent=componentData[0])

		console.log(this.currentComponent);
	}

}
