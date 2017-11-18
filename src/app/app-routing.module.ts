import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { ComponentListComponent } from './component/components/component-list/component-list.component';
import { ComponentComponent } from './component/components/component/component.component';

const routes: Routes = [
  {
    path: 'components',
    component: ComponentListComponent
	},
	{
		path: 'components/component',
		component: ComponentComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
