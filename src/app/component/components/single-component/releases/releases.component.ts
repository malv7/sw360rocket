import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ComponentDataLayout } from '../../../state/component.models';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'sw-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  components: Observable<ComponentDataLayout[]>;
  
  constructor(private store: Store<fromRoot.State>, public router: Router) { }

	ngOnInit() {
    this.components = this.store.select(fromRoot.selectComponents);
	}
}
