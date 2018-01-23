// ng
import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";

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

//Attachments
import { AttachmentsTableComponent } from './../shared/attachments-table/attachments-table.component';

// Helpers
import { NotImplementedYetComponent } from "../shared/global/components/not-implemented-yet/not-implemented-yet.component";

// Router
import { RouterService } from "./services/router.service";
import { EccComponent } from "../release/components/release/ecc/ecc.component";
import { ClearingComponent } from "../release/components/release/clearing/clearing.component";

const releaseChildren: Route[] = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'details', component: ReleaseDetailsComponent },
  { path: 'attachments', component: AttachmentsTableComponent },
  { path: 'vulnerabilities', component: NotImplementedYetComponent },
  { path: 'ecc', component: EccComponent },
  { path: 'clearing', component: ClearingComponent }
];

const attachments: Route = { path: 'attachments', component: AttachmentsTableComponent };
const releases: Route = { path: 'releases', component: ReleaseListComponent };
const detailRedirect: Route = { path: '', redirectTo: 'details', pathMatch: 'full' };

const routes: Routes = [
  // Projects
  {
    path: 'release/create',
    component: ReleaseCreateComponent
  },
  {
    path: 'projects/:id/releases/:id',
    component: ReleaseComponent,
    children: releaseChildren
  },
  {
    path: 'projects/:id',
    component: ProjectComponent,
    children: [
      detailRedirect,
      { path: 'details', component: ProjectDetailsComponent },
      attachments,
      releases
    ]
  },
  {
    path: 'projects',
    component: ProjectListComponent,
  },

  // Components
  {
    path: 'components/:id/releases/create',
    component: ComponentComponent,
    children: [
      { path: '', component: ReleaseCreateComponent },
    ]
  },
  {
    path: 'components/:id/releases/:id',
    component: ReleaseComponent,
    children: releaseChildren
  },
  {
    path: 'components/create',
    component: ComponentCreateComponent,
  },
  {
    path: 'components/:id',
    component: ComponentComponent,
    children: [
      detailRedirect,
      { path: 'details', component: ComponentDetailsComponent },
      attachments,
      releases
    ]
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
  providers: [RouterService]
})
export class SwRouterModule { }
