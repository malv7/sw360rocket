import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ComponentDataLayout } from "../../../component/state/component.models";
import { Observable } from "rxjs/Observable";
import * as fromRoot from './../../../reducers';
import { Go } from './../../../router/state/router.actions';
import { EmbeddedProject } from "../../state/project.models";
import * as ProjectActions from './../../state/project.actions';
import * as StructureActions from './../../../structure/state/structure.actions';

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

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new StructureActions.SetTitle('Projects'));
    this.store.dispatch(new ProjectActions.GetMockedProjects());
    this.projects = this.store.select(fromRoot.selectProjects);
  }

  selectAll() {
    if(this.areAllSelected) {
    }

    if(!this.areAllSelected) {
      const ids: string[] = [];
      this.projects.take(1).subscribe(all => all.forEach(one => ids.push(one.version)));
    }
  }

  selectOne(name: string) {
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