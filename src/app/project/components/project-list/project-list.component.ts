import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ComponentDataLayout } from "../../../component/state/component.models";
import { Observable } from "rxjs/Observable";
import * as fromRoot from './../../../reducers';
import * as ListSelectActions from './../../../shared/state/list-select/list-select.actions';
import { SelectListService } from "../../services/select-list.service";
import { Go } from './../../../router/state/router.actions';
import { EmbeddedProject } from "../../state/project.models";
import * as ProjectActions from './../../state/project.actions';

@Component({
  selector: 'sw-project-list',
  templateUrl: './project-list.component.html',
  styles: [`
    .hover { cursor: pointer; }
    .name { min-width: 180px; }
    .version { min-width: 100px; }
  `]
})
export class ProjectListComponent {

  areAllSelected: boolean = false;

  projects: Observable<EmbeddedProject[]>;

  constructor(private store: Store<fromRoot.State>, private selectListService: SelectListService) {
    this.store.dispatch(new ProjectActions.GetMockedProjects());
    this.projects = this.store.select(fromRoot.selectProjects);
  }

  selectAll() {
    if(this.areAllSelected) {
      this.store.dispatch(new ListSelectActions.Clear());
    }

    if(!this.areAllSelected) {
      const ids: string[] = [];
      this.projects.take(1).subscribe(all => all.forEach(one => ids.push(one.version)));
      this.store.dispatch(new ListSelectActions.AddMany(ids));
    }
  }

  selectOne(name: string) {
    this.store.dispatch(new ListSelectActions.ToggleOne(name));
  }

  go(id: string) {
    this.store.dispatch(new Go({
      path: ['/projects', id]
    }));
  }

}

// Actions
// Clear selected elements
// Add an array of selected elements
// Toggle selected elemen