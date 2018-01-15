import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ng
import { NgModule } from "@angular/core";
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {MyDatePickerModule} from 'mydatepicker';

// Shared
import { SharedModule } from '../shared/shared.module';

// Components
import { ReleaseDetailsComponent } from './components/release/details/release-details.component';
import { ReleaseComponent } from './components/release/release.component';
import { ReleaseCreateComponent } from "./components/release-create/release-create.component";


@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MyDatePickerModule
        
    ],
    declarations: [
        ReleaseDetailsComponent,
        ReleaseComponent,
        ReleaseCreateComponent
    ],
})
export class ReleaseModule { }