import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { ComponentRootComponent } from './component/components/component-root/component-root.component';
import { SingleComponentComponent } from './component/components/single-component/single-component.component';

const routes: Routes = [
	{
		path: 'components',
		component: ComponentRootComponent
	},
	{
		path: 'components/component',
		component: SingleComponentComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
