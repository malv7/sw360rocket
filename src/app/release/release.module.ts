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
				ReleaseCreateComponent,
				ReleaseOverviewComponent,
        VulnerabilityWidgetComponent,
        ReleaseListComponent
    ],
})
export class ReleaseModule { }
