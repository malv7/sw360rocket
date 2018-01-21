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

	users: Observable<any[]>;
	@Input() selectedUsers: any[];
	@Input() multiselect: boolean;
	@Input() buttonLabel: string;

	@Output() onApproved: EventEmitter<any> = new EventEmitter();
	selectedUsersArray:any[] = [];

	constructor(private store: Store<State>, private tableService: TableService, public modalService: SuiModalService) { }

	ngOnInit() {
		this.users = this.store.select(fromModel.selectUsers);
		this.selectedUsers.forEach(element => this.selectedUsersArray.push(element));
	}

	approve(){
		this.onApproved.emit(this.selectedUsersArray);
	}
	selectOne(user: any) {
		if(this.multiselect){
		const index = this.selectedUsersArray.indexOf(user, 0);
		(index > -1)
			? this.selectedUsersArray.splice(index, 1)
			: this.selectedUsersArray.push(user);
		} else {
			this.selectedUsersArray =[user];
		}
	}

	selectAll() {
		//not used
	}


	public open() {
		const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

		this.modalService
			.open(config)
			.onApprove(result => {this.approve()})
			.onDeny(result => {});
	}
};
