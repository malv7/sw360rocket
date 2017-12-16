import { Component, OnInit } from '@angular/core';
import { Tab } from '../../../shared/components/tab-navigation/tab-navigation.component'

@Component({
  selector: 'sw-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})

export class LeftBarComponent implements OnInit {


	tabs: Tab[] = [
		{ routerlink: 'details', title: 'Details' },
		{ routerlink: 'releases', title: 'Releases' },
		{ routerlink: 'vulnerabilities', title: 'Vulnerabilities' },
		{ routerlink: 'attachments', title: 'Attachments' }
	];

  constructor() { }

  ngOnInit() {
  }

}
