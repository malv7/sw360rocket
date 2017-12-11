import { Component, OnInit, Input } from '@angular/core';

interface LinkItem {
	name: string;
	routerLink: string;
}

export interface Tab {
  routerlink:string;
  title:string;
  classActive:string;
  classInactive:string;
}

@Component({
  selector: 'sw-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss']
})

export class TabNavigationComponent implements OnInit {

  @Input() tabs: Tab[]
  
	// @Input('LinkList') linkList: LinkItem[] = [];
  
  constructor() {
		// this.linkList.push({name: 'Summary', routerLink: 'router/linkA'});
		// this.linkList.push({name: 'Releases', routerLink: 'router/linkB'});
		// this.linkList.push({name: 'Vulnerabilities', routerLink: 'router/linkC'});
		// this.linkList.push({name: 'Attachments', routerLink: 'router/linkD'});
	}

  ngOnInit() {
		//this.tabs = [{routerlink: 'releases', title: 'Releases'}];
  }

}
