import { ReleaseTableComponent } from './../shared/tables/release-table/release-table.component';
import { RouterService } from "./services/router.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectRootComponent } from "../project/components/project-root/project-root.component";
import { NotImplementedYetComponent } from "../shared/components/not-implemented-yet/not-implemented-yet.component";
import { ComponentRootComponent } from "../component/components/component-root/component-root.component";
import { SingleComponentComponent } from "../component/components/single-component/single-component.component";
import { DetailComponent } from "../component/components/single-component/detail/detail.component";
import { ReleasesComponent } from "../component/components/single-component/releases/releases.component";
import { VulnerabilitiesComponent } from "../component/components/single-component/vulnerabilities/vulnerabilities.component";
import { RouterTestComponent } from "../the-lab/router-test-component/router-test.component";
import { RxjsComponent } from "../the-lab/rxjs.component";
import { ProjectDetailComponent } from "../project/components/project-detail/project-detail.component";
import { StoreModule } from "@ngrx/store";
import { routerReducer } from "./state/router.reducer";
import { CreateComponentComponent } from "../component/components/create-component/create-component.component";

const routes: Routes = [
  // Projects
  {
    path: 'projects',
    component: ProjectRootComponent,
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    children: [
      // { path: '', redirectTo: 'releases', pathMatch: 'full' },
      { path: 'releases', component: ReleasesComponent },
      { path: 'details', component: NotImplementedYetComponent }
    ]
  },
  // Components
  {
    path: 'components',
    component: ComponentRootComponent,
    // children: [
    //   { path: 'add', component: CreateComponentComponent }
    // ]
  },
  {
    path: 'components/add',
    component: CreateComponentComponent,
  },
  {
    path: 'components/:id',
    component: SingleComponentComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: DetailComponent },
      { path: 'releases', component: ReleaseTableComponent },
      { path: 'vulnerabilities', component: NotImplementedYetComponent },
      { path: 'attachments', component: NotImplementedYetComponent }
    ]
  },
  // Licenses
  {
    path: 'licenses',
    component: NotImplementedYetComponent
  },
  {
    path: 'licenses/:id',
    component: NotImplementedYetComponent
  },
  // ECC
  {
    path: 'ecc',
    component: NotImplementedYetComponent
  },
  // Vulnerabilities
  {
    path: 'vulnerabilities',
    component: NotImplementedYetComponent
  },
  // About
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
export class SwRouterModule {

}
