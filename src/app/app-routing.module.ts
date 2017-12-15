import { ProjectRootComponent } from './project/components/project-root/project-root.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { ComponentRootComponent } from './component/components/component-root/component-root.component';
import { SingleComponentComponent } from './component/components/single-component/single-component.component';
import { ReleasesComponent } from './component/components/single-component/releases/releases.component';
import { VulnerabilitiesComponent } from './component/components/single-component/vulnerabilities/vulnerabilities.component';
import { RouterTestComponent } from './the-lab/router-test-component/router-test.component';
import { RxjsComponent } from './the-lab/rxjs.component';
import { DetailComponent } from './component/components/single-component/detail/detail.component';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectRootComponent
  },
	{
		path: 'components',
		component: ComponentRootComponent
	},
	{
		path: 'component',
		component: SingleComponentComponent,
		children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: DetailComponent },
      { path: 'releases', component: ReleasesComponent },
			{ path: 'vulnerabilities', component: VulnerabilitiesComponent },
			{ path: 'attachments', component: DetailComponent }
    ]
  },
  {
    path: 'lab',
    component: RouterTestComponent
  },
  {
    path: 'rxjs',
    component: RxjsComponent
  },
  {
    path: '',
    component: ComponentRootComponent // TODO: Welcome page
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
