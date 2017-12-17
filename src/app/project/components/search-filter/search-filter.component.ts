import { Component } from "@angular/core";

@Component({
  selector: 'sw-search-filter',
  template: `
  <div class="ui icon input">
    <input type="text" placeholder="Filter components...">
    <i class="search icon"></i>
  </div>
  `,
  styles: [`
    :host {
      flex: 1 1 auto;
    }
    .input {
      width: 100%;
    }
  `]
})
export class SearchFilterComponent {

}