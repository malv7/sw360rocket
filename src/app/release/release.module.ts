// ng
import { NgModule } from "@angular/core";

// Shared
import { SharedModule } from '../shared/shared.module';

// Components
import { ReleaseDetailsComponent } from './components/release/details/release-details.component';
import { ReleaseComponent } from './components/release/release.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        ReleaseDetailsComponent,
        ReleaseComponent
    ],
})
export class ReleaseModule { }