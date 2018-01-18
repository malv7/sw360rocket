import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
	constructor(private store: Store<State>, private tableService: TableService, public modalService: SuiModalService) { }

	ngOnInit() {
		this.users = this.store.select(fromModel.selectUsers);
		this.users.subscribe(data => console.log("users", data));
	}

	selectOne(user: any) {
		this.tableService.selectOne(user);
	}

	selectAll() {
		this.tableService.selectAll(this.users);
	}


	public open(dynamicContent: string = "Example") {
		const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

		config.closeResult = "closed!";
		config.context = { data: dynamicContent };

		this.modalService
			.open(config)
			.onApprove(result => { console.log("approved", result);/* approve callback */ })
			.onDeny(result => { /* deny callback */ });
	}

	// Actions
	add = () => console.log("Add user to list");

};
