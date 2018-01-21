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
import { ReleaseOverviewComponent } from "./components/release-overview/release-overview.component";
import { VulnerabilityWidgetComponent } from './components/vulnerability-widget/vulnerability-widget.component';
import { ReleaseListComponent } from "./components/release-list/release-list.component";
import { EccComponent } from './components/release/ecc/ecc.component';
import { ClearingComponent } from './components/release/clearing/clearing.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { EccDetailsCreateComponent } from './components/release-create/ecc-details-create/ecc-details-create.component';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MyDatePickerModule, 
        BrowserModule
        
    ],
    declarations: [
        ReleaseDetailsComponent,
        ReleaseComponent,
				ReleaseCreateComponent,
				ReleaseOverviewComponent,
        VulnerabilityWidgetComponent,
        ReleaseListComponent,
        EccComponent,
        ClearingComponent,
        EccDetailsCreateComponent
    ],
})
export class ReleaseModule { }
