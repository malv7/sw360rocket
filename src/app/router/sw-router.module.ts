// ng
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { routerReducer } from "./state/router.reducer";
import { RouterEffects } from "./state/router.effects";

// Component
import { ComponentComponent } from "../component/components/component/component.component";
import { ComponentDetailsComponent } from "../component/components/component/details/component-details.component";
import { ComponentListComponent } from './../component/components/component-list/component-list.component';
import { ComponentCreateComponent } from "../component/components/component-create/component-create.component";

// Project
import { ProjectComponent } from "../project/components/project/project.component";
import { ProjectDetailsComponent } from './../project/components/project/details/project-details.component';
import { ProjectListComponent } from './../project/components/project-list/project-list.component';

// Release
import { ReleaseDetailsComponent } from './../release/components/release/details/release-details.component';
import { ReleaseComponent } from './../release/components/release/release.component';
import { ReleaseCreateComponent } from "../release/components/release-create/release-create.component";
import { ReleaseListComponent } from "../release/components/release-list/release-list.component";

// Helpers
import { NotImplementedYetComponent } from "../shared/global/components/not-implemented-yet/not-implemented-yet.component";

// Router
import { RouterService } from "./services/router.service";
import {
  PROJECTS,
  COMPONENTS,
  RELEASES,
  VULNERABILITIES,
  ATTACHMENTS,
  LICENSES,
  VENDORS,
  USERS,
  ECC,
  DETAILS,
  HOME,
  ABOUT,
  CREATE,
  ID
} from "./router.api";

const releaseChildren = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'details', component: ReleaseDetailsComponent },
  { path: 'attachments', component: NotImplementedYetComponent },
  { path: 'vulnerabilities', component: NotImplementedYetComponent },
  { path: 'ecc', component: NotImplementedYetComponent }
];

const routes: Routes = [
  // Projects
  {
    path: 'projects/:id/releases/:id',
    component: ReleaseComponent,
    children: releaseChildren
  },
  {
    path: 'projects/:id',
    component: ProjectComponent,
    children: [
      { path: '', redirectTo: DETAILS, pathMatch: 'full' },
      { path: 'details', component: ProjectDetailsComponent },
      { path: 'attachments', component: NotImplementedYetComponent },
      { path: 'releases', component: ReleaseListComponent }
    ]
  },
  {
    path: 'projects',
    component: ProjectListComponent,
  },

  // Components
  {
    path: 'components/:id/releases/:id',
    component: ReleaseComponent,
    children: releaseChildren
  },
  {
    path: 'components/:id',
    component: ComponentComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ComponentDetailsComponent },
      { path: 'attachments', component: NotImplementedYetComponent },
      { path: 'releases/create', component: ReleaseCreateComponent },
      { path: 'releases', component: ReleaseListComponent }
    ]
  },
  {
    path: 'components/create',
    component: ComponentCreateComponent,
  },
  {
    path: 'components',
    component: ComponentListComponent,
  },

  // Other
  {
    path: '',
    component: NotImplementedYetComponent // TODO: Home
  }
  // TODO 404 not found
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([RouterEffects])
  ],
  exports: [RouterModule],
  providers: [
    RouterService
  ]
})
export class SwRouterModule { }