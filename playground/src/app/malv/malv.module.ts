// Use the NgModule decorator function to decorate your module's class.
import { NgModule } from '@angular/core';

// Almost every module which has declared components needs the CommonModule
// It provides all basic directives like *ngIf, *ngFor, ...
import { CommonModule } from '@angular/common';

// The malv component, which is the "root" component of the MalvModule.
import { MalvComponent } from './malv.component';
import { MalvDataService } from './malv-data.service';

@NgModule({ // <-- NgModule decorator function

  // You can import other modules by putting them into the imports array.
  imports: [
    CommonModule
  ],

  // Every component declared in the declarations array is accessible 
  // throughout this module (as well as all modules which import this module).
  declarations: [
    MalvComponent
  ],

  // exports components to make them accessable by modules which import this module.
  exports: [
    // Since the MalvComponent is the "root" component of this module and uses all other
    // malv related components inside it, it is the only component of this module which is exported 
    // to be used by other modules components or the router.
    MalvComponent
  ],

  // providers is much like exports for components (and directives) but for services. 
  // If you want to provide a service to this module, as well as other modules 
  // (which must import this module) do it with the providers array.
  providers: [
    MalvDataService
  ]

})
export class MalvModule { }
// The modules class itself doesn't implement anything. Its all about its decorator function,
// which constructs an angular module which now can be imported elsewhere in the application.
