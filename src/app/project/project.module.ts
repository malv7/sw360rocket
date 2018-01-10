// ng
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

// Shared
import { SharedModule } from './../shared/shared.module';

// Store
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './state/project.reducer';

// Components
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailsComponent } from './components/project/details/project-details.component';
import { NiceStateWidgetComponent } from './components/nice-state-widget/nice-state-widget.component';


@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        StoreModule.forFeature('project', projectReducer)
    ],
    declarations: [
        ProjectListComponent,
        ProjectComponent,
        ProjectDetailsComponent,
        NiceStateWidgetComponent
    ],
    exports: [
        ProjectListComponent
    ],
})
export class ProjectModule { }