import { Component } from '@angular/core';
import { MalvDataService } from './the-lab/malv-data.service';

@Component({
  selector: 'sw-root',
  template: `<sw-structure-root></sw-structure-root>`
})
export class AppComponent {
	// for test purposes only:
	constructor(mds: MalvDataService) { }
}
