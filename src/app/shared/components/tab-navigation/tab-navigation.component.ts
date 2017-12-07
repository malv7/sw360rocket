import { Component, OnInit, Input } from '@angular/core';

export interface Tab{
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
  constructor() { }

  ngOnInit() {
		//this.tabs = [{routerlink: 'releases', title: 'Releases'}];
  }

}
