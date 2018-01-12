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

// exists in context of project and component
const releases = {
  path: RELEASES,
  component: NotImplementedYetComponent,
  children: [
    { path: '', redirectTo: DETAILS, pathMatch: 'full' },
    { path: DETAILS, component: ReleaseDetailsComponent },
    { path: ATTACHMENTS, component: NotImplementedYetComponent },
    { path: VULNERABILITIES, component: NotImplementedYetComponent },
    { path: ECC, component: NotImplementedYetComponent }
  ]
};

const routes: Routes = [
  {
    path: PROJECTS,
    component: ProjectListComponent,
  },
  {
    path: PROJECTS + ID,
    component: ProjectComponent,
    children: [
      { path: '', redirectTo: DETAILS, pathMatch: 'full' },
      { path: DETAILS, component: ProjectDetailsComponent },
      { path: ATTACHMENTS, component: NotImplementedYetComponent },
      { path: RELEASES + CREATE, component: ReleaseCreateComponent },
      releases
    ]
  },
  {
    path: COMPONENTS,
    component: ComponentListComponent,
  },
  {
    path: COMPONENTS + CREATE,
    component: ComponentCreateComponent,
  },
  {
    path: COMPONENTS + ID,
    component: ComponentComponent,
    children: [
      { path: '', redirectTo: DETAILS, pathMatch: 'full' },
      { path: DETAILS, component: ComponentDetailsComponent },
      { path: ATTACHMENTS, component: NotImplementedYetComponent },
      { path: RELEASES + CREATE, component: ReleaseCreateComponent },
      releases
    ]
  },
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