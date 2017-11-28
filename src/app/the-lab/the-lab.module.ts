import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MalvDataService } from './malv-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RxjsComponent } from './rxjs.component';
import { RouterTestComponent } from './router-test-component/router-test.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
		SharedModule,
    HttpClientModule,
    // RouterModule
	],
	providers: [ MalvDataService ],
  declarations: [ RxjsComponent, RouterTestComponent ],
  exports: []
})
export class TheLabModule { }
