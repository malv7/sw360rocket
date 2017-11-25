import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from '../../../../../node_modules/ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class RenderCreatorInNgSmartTableComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
		console.log(this.value);
    this.renderValue = [this.value.email, this.value.href].join(', ');
  }

}
