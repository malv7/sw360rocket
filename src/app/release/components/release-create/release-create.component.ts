import { RouterStateUrl } from './../../../app.module';
import { FormValidationService } from './../../../component/components/component-create/form-validation.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MyDatePickerModule } from 'mydatepicker';

import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import * as RouterActions from './../../../router/state/router.actions';
import * as StructureActions from './../../../structure/state/structure.actions';
import { CustomValidator } from 'ng2-semantic-ui/dist';
import { State } from '../../../state';
import { IMyDpOptions, IMyInputFieldChanged } from 'mydatepicker';
import { ChangeDetectorRef } from '@angular/core';

//Interface data for input Fields
export interface NewRelease {
  name: string;
  version: string;
  cpeID: string;
  programmingLanguagesArray: string[];
  operatingSystemsArray: string[];
  releaseDate: string;
  downloadURL: string;
  releaseMainlineState: string;
}

const NAME: string = 'name';
const VERSION: string = 'version';
const CPEID: string = 'cpeID';
const PROGRAMMINGLANGUAGES: string = 'programmingLanguages';
const OPERATINGSYSTEMS: string = 'operatingSystems';
const RELEASEDATE: string = 'releaseDate';
const DOWNLOADURL: string = 'downloadURL';
const RELEASEMAINLINESTATE = 'releaseMainlineState';

@Component({
  selector: 'sw-release-create',
  templateUrl: './release-create.component.html',
  styleUrls: ['./release-create.component.scss']
})

export class ReleaseCreateComponent implements OnInit {

  programmingLanguages: string;
  operatingSystems: string;
  newReleae: NewRelease;
  projectForm: FormGroup;
  formValid: boolean;
  programmingLanguagesArray: string[] = [];
  operatingSystemsArray: string[] = [];
  releaseMainlineState: string[] = [];
  dateValid: boolean;

  constructor(
    public formValidationService: FormValidationService,
    private store: Store<State>,
    private cdRef:ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.formValid = false;
    this.releaseMainlineState = ['release', 'mainline', 'state', '?'];
    this.dateValid = false;

    //Form Validation
    this.projectForm = new FormGroup({

      [NAME]: new FormControl(null, Validators.required),
      [VERSION]: new FormControl(null, Validators.required),
      [CPEID]: new FormControl(null, Validators.required),
      [OPERATINGSYSTEMS]: new FormControl(),
      [PROGRAMMINGLANGUAGES]: new FormControl(),
      [DOWNLOADURL]: new FormControl(null, CustomValidators.url),
      [RELEASEMAINLINESTATE]: new FormControl(),
      [RELEASEDATE]: new FormControl()
    });

    this.projectForm.statusChanges.subscribe(() => this.evaluateForm());
  }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };

  onInputFieldChanged(event: IMyInputFieldChanged) {
    if (event.valid || event.value == '') {
      this.dateValid = true;
    }
    else {
      this.dateValid = false;
    }
    this.cdRef.detectChanges();
  }

  get name() { return this.projectForm.get(NAME); }
  get version() { return this.projectForm.get(VERSION); }
  get cpeID() { return this.projectForm.get(CPEID); }
  get downloadURL() { return this.projectForm.get(DOWNLOADURL) }
  get releaseDate() { return this.projectForm.get(RELEASEDATE) }

  addProgrammingLanguages() {
    const c = this.projectForm.get(PROGRAMMINGLANGUAGES).value;
    if (c && !this.programmingLanguagesArray.includes(c)) this.programmingLanguagesArray.push(c);
    this.projectForm.patchValue({ [PROGRAMMINGLANGUAGES]: '' });
  }

  removeProgrammingLanguages(programmingLanguage: string) {
    this.programmingLanguagesArray = this.programmingLanguagesArray.filter(c => programmingLanguage !== c);
  }

  addOperatingSystems() {
    const c = this.projectForm.get(OPERATINGSYSTEMS).value;
    if (c && !this.operatingSystemsArray.includes(c)) this.operatingSystemsArray.push(c);
    this.projectForm.patchValue({ [OPERATINGSYSTEMS]: '' });
  }

  removeOperatingSystems(operatingSystem: string) {
    this.operatingSystemsArray = this.operatingSystemsArray.filter(c => operatingSystem !== c);
  }

  evaluateForm() {
    if (this.projectForm.status === 'VALID' && this.dateValid) {
      this.formValid = true;
    }
    else {
      this.formValid = false;
    }
    console.log(this.formValid);
  }


  routeBack() {
    this.store.dispatch(new RouterActions.Back());
  }

  submit() {
    this.newReleae = {
      name: this.projectForm.get(NAME).value,
      //createdBy: this.projectForm.get(CREATED_BY).value,
      version: this.projectForm.get(VERSION).value,
      cpeID: this.projectForm.get(CPEID).value,
      programmingLanguagesArray: this.programmingLanguagesArray,
      operatingSystemsArray: this.operatingSystemsArray,
      releaseDate: this.projectForm.get(RELEASEDATE).value,
      downloadURL: this.projectForm.get(DOWNLOADURL).value,
      releaseMainlineState: this.projectForm.get(RELEASEMAINLINESTATE).value,
    }
    console.log(this.newReleae);
  }
} 
