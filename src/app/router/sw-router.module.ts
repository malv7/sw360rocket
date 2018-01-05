// ng
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Store
import { StoreModule } from "@ngrx/store";
import { routerReducer } from "./state/router.reducer";

// Component
import { ComponentComponent } from "../component/components/component/component.component";
import { ComponentDetailsComponent } from "../component/components/component/details/component-details.component";
import { ComponentListComponent } from './../component/components/component-list/component-list.component';
import { CreateComponentComponent } from "../component/components/create-component/create-component.component";

// Project
import { ProjectComponent } from "../project/components/project/project.component";
import { ProjectDetailsComponent } from './../project/components/project/details/project-details.component';
import { ProjectListComponent } from './../project/components/project-list/project-list.component';

// Release
import { ReleaseDetailsComponent } from './../release/components/release/details/release-details.component';
import { ReleaseComponent } from './../release/components/release/release.component';
import { ReleaseTableComponent } from './../shared/tables/release-table/release-table.component';

import { RouterService } from "./services/router.service";
import { NotImplementedYetComponent } from "../shared/components/not-implemented-yet/not-implemented-yet.component";

const routes: Routes = [
  {
    path: 'releases/:id',
    component: ReleaseComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ReleaseDetailsComponent },
      { path: 'attachments', component: NotImplementedYetComponent },
      { path: 'vulnerabilities', component: NotImplementedYetComponent },
      { path: 'ecc', component: NotImplementedYetComponent }
    ]
  },
  {
    path: 'projects',
    component: ProjectListComponent,
  },
  {
    path: 'projects/:id',
    component: ProjectComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ProjectDetailsComponent },
      { path: 'releases', component: ReleaseTableComponent },
      { path: 'attachments', component: NotImplementedYetComponent }
    ]
  },
  {
    path: 'components',
    component: ComponentListComponent,
  },
  {
    path: 'components/add',
    component: CreateComponentComponent,
  },
  {
    path: 'components/:id',
    component: ComponentComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ComponentDetailsComponent },
      { path: 'releases', component: ReleaseTableComponent },
      { path: 'vulnerabilities', component: NotImplementedYetComponent },
      { path: 'attachments', component: NotImplementedYetComponent }
    ]
  },
  {
    path: 'licenses',
    component: NotImplementedYetComponent
  },
  {
    path: 'licenses/:id',
    component: NotImplementedYetComponent
  },
  {
    path: 'ecc',
    component: NotImplementedYetComponent
  },
  {
    path: 'vulnerabilities',
    component: NotImplementedYetComponent
  },
  {
    path: 'about',
    component: NotImplementedYetComponent
  },
  {
    path: '',
    component: NotImplementedYetComponent // TODO: Welcome page
  }
  // TODO 404 not found
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forFeature('customRouter', routerReducer)
  ],
	exports: [ RouterModule ],
  providers: [
    RouterService
  ]
})
export class SwRouterModule { }