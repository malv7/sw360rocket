import { RouteConfiguration } from './../../../router/state/router.models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import { ComponentDataLayout } from '../../state/component.models';
import { Subscription } from 'rxjs/Subscription';
import * as fromModel from './../../../state/model.reducer';
import * as StructureActions from './../../../structure/state/structure.actions';

@Component({
  selector: 'sw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {

	tabs: RouteConfiguration[] = [
		{ route: 'details', title: 'Details' },
		{ route: 'releases', title: 'Releases' },
    { route: 'attachments', title: 'Attachments' }
  ];

  titleSub: Subscription;
	constructor(private store: Store<fromRoot.State>) { }

	ngOnInit() {
    this.titleSub = this.store.select(fromModel.selectComponent).subscribe(component => {
      if(component.name) this.store.dispatch(new StructureActions.SetTitle(component.name));
    });
  }

  ngOnDestroy(): void {
    if(this.titleSub) this.titleSub.unsubscribe();
  }

}
