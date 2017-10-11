import { NgModule } from '@angular/core';
// Import Routes and the RouterModule.
import { Routes, RouterModule } from '@angular/router';

// Then import all components you would like to route within this module.
import { MalvComponent } from './malv/malv.component';

// Define route objects and rules.
const routes: Routes = [
  
  // The "root" route.
  {
    path: '',
    component: MalvComponent
  }

  // define more routes here

];

@NgModule({
  // Import the RouterModule and activate the defined routes forRoot(),
  // since it is the "root" routing-module.
  // Feature routing modules can use forChild instead.
  imports: [ RouterModule.forRoot(routes) ] ,
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
