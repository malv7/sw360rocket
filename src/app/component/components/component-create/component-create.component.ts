import { FormValidationService } from './form-validation.service';
import { COMPONENT_TYPES, ComponentTypes } from './../../state/component.models';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { State } from './../../../state';
import * as RouterActions from './../../../router/state/router.actions';
import * as StructureActions from './../../../structure/state/structure.actions';
import * as ComponentActions from './../../state/component.actions';
import { SW360ComponentTypes } from '../../../resources/resources.api';

//Interface data for input Fields
export interface NewComponent {
	name: string;
	createdBy?: string;
	categories: string;
	componentType?: string;
	hompageURL?: string;
	blogURL?: string;
	wikiURL?: string;
	mailingListURL?: string;
	shortDescription?: string;
	authorName?: string;
	ownerAccountingUnit?: string;
	ownerBillingGroup?: string;
	Moderators?: string[];
}

//constants for FormControl Input Values
const NAME: string = 'name';
const CREATED_BY: string = 'createdBy';
const CATEGORIES: string = 'categories';
const COMPONENTTYPE: string = 'componentType';
const HOMEPAGEURL: string = 'homepageURL';
const BLOGURL: string = 'blogURL';
const WIKIURL: string = 'wikiURL';
const MAILINGLISTURL: string = 'mailingListURL';
const SHORTDESCRIPTION: string = 'shortDescription';
const AUTHORNAME: string = 'authorName';
const OWNERACCOUNTINGUNIT: string = 'ownerAccountingUnit';
const OWNERBILLINGGROUP: string = 'ownerBillingGroup';
const MODERATORS: string = 'moderators';

@Component({
	selector: 'sw-create-component',
	templateUrl: './component-create.component.html',
	styleUrls: ['./component-create.component.scss']
})

export class ComponentCreateComponent implements OnInit {

	selectedModerators:any[]=[{email:'malv@sw360.de'},{email:'tarek@sw360.de'},{email:'lino@sw360.de'},{email:'michi@sw360.de'}];
	selectedBillingGroupOwner:any={email:'billingGroupOwner@sw360.de'};
	componentTypes: string[];
	projectForm: FormGroup;
	newComponent: NewComponent;
	employePopUp: boolean;
	testbool: boolean;

	categoryArray: string[] = [];
	categoriesValid: boolean = false;

	formValid: boolean = false;

	constructor(
		public formValidationService: FormValidationService,
		private store: Store<State>) {
			// this.store.dispatch(new ComponentActions.Create({
			// 	componentType: SW360ComponentTypes.COTS,
			// 	createdBy: "admin@sw360.org",
			// 	description: "descriptioni",
			// 	name: "teeeest"
			// }));
		}

	ngOnInit() {
		this.testbool = true;
		//get values for DropDown componentTypes
		this.componentTypes = COMPONENT_TYPES;

		this.employePopUp = false;

		//create Formcontrol for imput fields
		this.projectForm = new FormGroup({
			[NAME]: new FormControl(null, Validators.required),
			[CREATED_BY]: new FormControl(),
			[CATEGORIES]: new FormControl(null),
			[COMPONENTTYPE]: new FormControl(this.componentTypes[0]),
			[HOMEPAGEURL]: new FormControl(null, CustomValidators.url),
			[BLOGURL]: new FormControl(null, CustomValidators.url),
			[WIKIURL]: new FormControl(null, CustomValidators.url),
			[MAILINGLISTURL]: new FormControl(null, CustomValidators.url),
			[SHORTDESCRIPTION]: new FormControl(),
			[AUTHORNAME]: new FormControl(),
			[OWNERACCOUNTINGUNIT]: new FormControl(),
			[OWNERBILLINGGROUP]: new FormControl(),
			[MODERATORS]: new FormControl(),
		});

		this.projectForm.statusChanges.subscribe(() => this.evaluateForm());
	}

	evaluateForm() {
		if (this.projectForm.status === 'VALID') {
			this.formValid = this.categoriesValid ? true : false;
		} else {
			this.formValid = false;
		}
	}

	addCategory() {
		const c = this.projectForm.get(CATEGORIES).value;
		if (c && !this.categoryArray.includes(c)) this.categoryArray.push(c);
		this.projectForm.patchValue({ [CATEGORIES]: '' });
		this.evaluateCategory();
	}

	removeCategory(category: string) {
		this.categoryArray = this.categoryArray.filter(c => category !== c);
		this.evaluateCategory();
	}

	evaluateCategory() {
		this.categoriesValid = this.categoryArray.length < 1 ? false : true;
		this.evaluateForm();
	}

	routeBack() {
		this.store.dispatch(new RouterActions.Back());
	}

	onApprovedModerators(selectedUsers: any[]) {
		this.selectedModerators = selectedUsers;
	}

	onApprovedBillingGroupOwner(selectedUsers: any[]) {
		this.selectedBillingGroupOwner = selectedUsers[0];
	}

	//getter for FormControl
	get name() { return this.projectForm.get(NAME); }
	get categories() { return this.projectForm.get(CATEGORIES); }
	get homepageURL() { return this.projectForm.get(HOMEPAGEURL); }
	get blogURL() { return this.projectForm.get(BLOGURL); }
	get wikiURL() { return this.projectForm.get(WIKIURL); }
	get mailingListURL() { return this.projectForm.get(MAILINGLISTURL); }
	get shortDescription() { return this.projectForm.get(SHORTDESCRIPTION); }
	get componentType() { return this.projectForm.get(COMPONENTTYPE); }

	//called by click on submit button
	private submit() {
		const name = this.projectForm.get(NAME).value;
		// const createdBy = this.projectForm.get(CREATED_BY).value;
		const categories = this.projectForm.get(CATEGORIES).value;
		const componentType = this.projectForm.get(COMPONENTTYPE).value;
		const hompageURL = this.projectForm.get(HOMEPAGEURL).value;
		const blogURL = this.projectForm.get(BLOGURL).value;
		const wikiURL = this.projectForm.get(WIKIURL).value;
		const mailingListURL = this.projectForm.get(MAILINGLISTURL).value;
		const shortDescription = this.projectForm.get(SHORTDESCRIPTION).value;
		const authorName = this.projectForm.get(AUTHORNAME).value;
		const ownerAccountingUnit = this.projectForm.get(OWNERACCOUNTINGUNIT).value;
		const ownerBillingGroup = this.projectForm.get(OWNERBILLINGGROUP).value;
		const Moderators = this.projectForm.get(MODERATORS).value;

		console.log(this.newComponent);
		this.store.dispatch(new ComponentActions.Create({
			componentType: componentType,
			createdBy: "admin@sw360.org",
			description: shortDescription,
			name: name
		}));
	}

}
