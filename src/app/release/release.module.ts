// ng
import { NgModule } from "@angular/core";

// Shared
import { SharedModule } from '../shared/shared.module';

// Components
import { ReleaseDetailsComponent } from './components/release/details/release-details.component';
import { ReleaseComponent } from './components/release/release.component';
import { ReleaseCreateComponent } from "./components/release-create/release-create.component";
import { ReleaseOverviewComponent } from "./components/release-overview/release-overview.component";
import { VulnerabilityWidgetComponent } from './components/vulnerability-widget/vulnerability-widget.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        ReleaseDetailsComponent,
        ReleaseComponent,
				ReleaseCreateComponent,
				ReleaseOverviewComponent,
				VulnerabilityWidgetComponent
    ],
})
export class ReleaseModule { }
