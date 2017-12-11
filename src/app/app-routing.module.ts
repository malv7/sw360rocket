import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { ComponentRootComponent } from './component/components/component-root/component-root.component';
import { SingleComponentComponent } from './component/components/single-component/single-component.component';
import { SummaryComponent } from './component/components/single-component/summary/summary.component';
import { ReleasesComponent } from './component/components/single-component/releases/releases.component';
import { VulnerabilitiesComponent } from './component/components/single-component/vulnerabilities/vulnerabilities.component';
import { RouterTestComponent } from './the-lab/router-test-component/router-test.component';
import { RxjsComponent } from './the-lab/rxjs.component';

const routes: Routes = [
	{
		path: 'components',
		component: ComponentRootComponent
	},
	{
		path: 'component',
		component: SingleComponentComponent,
		children: [
      { path: '', component: SummaryComponent},
      { path: 'releases', component: ReleasesComponent },
			{ path: 'vulnerabilities', component: VulnerabilitiesComponent },
			{ path: 'attachments', component: SummaryComponent}
    ]
  },
  {
    path: 'lab',
    component: RouterTestComponent
  },
  {
    path: 'rxjs',
    component: RxjsComponent
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
