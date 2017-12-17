import { ProjectRootComponent } from './components/project-root/project-root.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { ProjectListComponent } from './components/project-list/project-list.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectListService } from './services/select-list.service';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './state/project.reducer';

@NgModule({
    imports: [
        SharedModule,
        FormsModule, 
        StoreModule.forFeature('project', projectReducer)
    ],
    declarations: [
        ProjectRootComponent,
        ProjectListComponent,
        SearchFilterComponent,
        ActionButtonsComponent,
        ProjectDetailComponent
    ],
    exports: [
      ProjectListComponent
    ],
    providers: [SelectListService]
})
export class ProjectModule { }