//import { SW360ComponentTypes } from './../../resources/resources.api';
// ng
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Store
import { Store } from '@ngrx/store';
import { State } from './../../state';
import * as fromModel from './../../state/model.reducer';
import * as RouterActions from './../../router/state/router.actions';
//import * as fromAttachment from './../state/attachment.reducer';
//import * as AttachmentActions from './../state/attachment.actions';

// Data
//import { SW360Attachment } from './../../state/models';

// Router
//import { COMPONENTS, CREATE } from './../../router/router.api';

// Table
import { TableService } from '../../shared/tables/services/table.service';
import { Links } from '../../state/models';


export interface SW360Attachment {
	filename: string,
	sha1: string,
	attachmentType: string,
	createdTeam: string,
	createdComment: string,
	createdOn: string,
	checkedTeam: string,
	checkedComment: string,
	checkedOn: string,
	checkStatus: string,
	_links: Links;
}

const DUMMY_SW360Attachments: SW360Attachment[] = [{
	filename: "spring-core-4.3.4.RELEASE.jar",
	sha1: "da373e491d3863477568896089ee9457bc316783",
	attachmentType: "BINARY_SELF",
	createdTeam: "Clearing Team 1",
	createdComment: "please check before Christmas :)",
	createdOn: "2016-12-18",
	checkedTeam: "Clearing Team 2",
	checkedComment: "everything looks good",
	checkedOn: "2016-12-18",
	checkStatus: "ACCEPTED",
	_links: {
		self: {href:"selfLinkA"}
	}
},
{
	filename: "description.pdf",
	sha1: "da3sd491d3863477568896089ee9457bc316783",
	attachmentType: "DOCUMENT",
	createdTeam: "Clearing Team 2",
	createdComment: "please check",
	createdOn: "2016-12-11",
	checkedTeam: "Clearing Team 1",
	checkedComment: "please rework",
	checkedOn: "2016-12-18",
	checkStatus: "DECLINED",
	_links: {
		self: {href:"selfLinkB"}
	}
},
{
	filename: "licence.pdf",
	sha1: "da3sd491d3863477568896089ee9457bc316783",
	attachmentType: "LICENCE",
	createdTeam: "Clearing Team 3",
	createdComment: "please check",
	createdOn: "2016-12-11",
	checkedTeam: "Legal Team",
	checkedComment: "",
	checkedOn: "2016-12-18",
	checkStatus: "PENDING",
	_links: {
		self: {href:"selfLinkC"}
	}
}]

@Component({
	selector: 'sw-attachments-table',
	templateUrl: './attachments-table.component.html',
	styleUrls: ['./attachments-table.component.scss']
})
export class AttachmentsTableComponent implements OnInit {

	attachments: Observable<SW360Attachment[]>;
	constructor(private store: Store<State>, private tableService: TableService) { }

	ngOnInit() {
		this.attachments = Observable.of(DUMMY_SW360Attachments);
		//this.attachments = this.store.select(fromModel.selectAttachment);
	}

	go(attachment: any) {
		/*	this.tableService.go(component);
			this.store.dispatch(new ComponentActions.ReduceComponent({
				name: component.name,
				componentType: SW360ComponentTypes.OSS,
				description: '',
				createdOn: '',
				type: 'component',
				_links: component._links,
				_embedded: {
					createdBy: {
					email: '',
					_links: {
						self: {
						href: ''
						}
					}
					},
					releases: [],
					moderators: [],
					vendors: [],
				}
			}))*/
	}

	selectOne(attachment: SW360Attachment) {
		this.tableService.selectOne(attachment);
	}

	selectAll() {
		this.tableService.selectAll(this.attachments);
	}

	// Actions
	create = () => console.log("AttachmentListComponent create action"); //this.store.dispatch(new RouterActions.Go({ path: [COMPONENTS + '/' + CREATE] }));
	clone = () => console.log("AttachmentListComponent clone action");
	delete = () => console.log("AttachmentListComponent delete action");

};
