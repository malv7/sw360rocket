import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { SW360ComponentTypes } from './../../../resources/resources.api';
// ng
import { Observable } from 'rxjs/Observable';

//ng semantic ui
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';

// Store
import { Store } from '@ngrx/store';
import { State } from './../../../state';
import * as fromModel from './../../../state/model.reducer';
import * as RouterActions from './../../../router/state/router.actions';
//import * as fromUser from './../../state/user.reducer';
//import * as UserActions from './../../state/user.actions';

// Data
//import { EmbeddedSW360User } from './../../../state/models';

// Router
import { COMPONENTS, CREATE } from './../../../router/router.api';

// Table
import { TableService } from '../../../shared/tables/services/table.service';

export interface IContext {
	data: string;
}

@Component({
	selector: 'sw-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	@ViewChild('modalTemplate')
	public modalTemplate: ModalTemplate<IContext, string, string>

	@Output() onApproved = new EventEmitter<any[]>();

	users: Observable<any[]>;
	@Input() selectedUsers: any[];
	@Input() multiselect: boolean;
	@Input() buttonLabel: string;
	selectedUsersArray:any[];
	constructor(private store: Store<State>, private tableService: TableService, public modalService: SuiModalService) { }

	ngOnInit() {
		this.users = this.store.select(fromModel.selectUsers);
		this.users.subscribe(data => console.log("users", data));
		this.selectedUsersArray = this.selectedUsers;
	}

	approve(){
		console.log("hi");
		this.onApproved.emit(this.selectedUsersArray);

	}
	selectOne(user: any) {
		if(this.multiselect){
		const index = this.selectedUsers.indexOf(user, 0);
		(index > -1)
			? this.selectedUsers.splice(index, 1)
			: this.selectedUsers.push(user);
		} else {
			this.selectedUsers =[user];
		}
	}

	selectAll() {
		this.tableService.selectAll(this.users);
	}


	public open(dynamicContent: string = "Example") {
		const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

		config.closeResult = "closed!";
		config.context = { data: dynamicContent };

		let selectedUsersArray=this.selectedUsersArray;
		let eventEmitter = this.onApproved;
		this.modalService
			.open(config)
			.onApprove(result => {eventEmitter.emit(selectedUsersArray) })
			.onDeny(result => {});
	}

	// Actions
	add = () => console.log("Add user to list");

};
