import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import { ComponentDataLayout, AttachmentDataLayout } from '../../state/component.models';
import { Router, Routes } from '@angular/router';
import * as RouterActions from './../../../router/state/router.actions';

interface Checked{
[key:string]:string;
}

@Component({
	selector: 'sw-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  checked: Checked = {};

  components: Observable<ComponentDataLayout[]>;
	attachments: Observable<AttachmentDataLayout[]>;
  constructor(private store: Store<fromRoot.State>, public router: Router) { }

	ngOnInit() {
		this.components = this.store.select(fromRoot.selectComponents);
		this.attachments = this.store.select(fromRoot.selectAttachments);
		let data=[];
		this.attachments.subscribe(d=>console.log(d));
		this.checked['Hallo']='test';
		delete this.checked['Hallo'];
	}

  goToComponent(component: ComponentDataLayout) {
    this.store.dispatch(new RouterActions.Go({
      path: ['/component'],
    }));
  }

	all(){
		console.log('all')
	}

	checkComponent(component: ComponentDataLayout){
	// 	if(!this.checked.includes(component)){
	// 	this.checked.push(component);
	// }else {

	// 	this.checked.filter(item => item !== component)
	// }
		console.log( this.checked);
	}



}
