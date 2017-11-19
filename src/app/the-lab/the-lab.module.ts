import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MalvDataService } from './malv-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
		SharedModule,
		HttpClientModule
	],
	providers: [ MalvDataService ],
  declarations: []
})
export class TheLabModule { }
