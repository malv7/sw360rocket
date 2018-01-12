import { Component, Input } from "@angular/core";
import { EmbeddedProject } from "../../../../state/models";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromRoot from './../../../../reducers';
import * as fromModel from './../../../../state/model.reducer';

@Component({
  selector: 'sw-project-table-body',
  template: `
    <td class="cell-hover">{{ project.name }}</td>
    <td class="cell-hover">{{ project.version }}</td>
    <td class="cell-hover">{{ project.projectType }}</td>
  `
})
export class ProjectTableBodyComponent {
  @Input() project: EmbeddedProject;
  // TODO: propagate go
}