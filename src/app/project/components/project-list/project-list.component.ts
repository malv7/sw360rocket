import { SW360Project } from './../../../resources/resources.api';
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ComponentDataLayout } from "../../../component/state/component.models";
import { Observable } from "rxjs/Observable";
import { State } from './../../../state';
import { Go } from './../../../router/state/router.actions';
import * as ProjectActions from './../../state/project.actions';
import * as StructureActions from './../../../structure/state/structure.actions';
import * as fromProject from './../../state/project.reducer';
import * as fromRelease from './../../../release/state/release.reducer';
import * as RouterActions from './../../../router/state/router.actions';

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

  projects: Observable<SW360Project[]>;

  constructor(private store: Store<State>) {
    this.projects = this.store.select(fromProject.selectProjects);
    this.projects.subscribe(x => console.log("projects in list", x))
  }

  go(project: SW360Project) {
		this.store.dispatch(new RouterActions.GoSelfLink(project._links.self.href));
	}

}

// Actions
// Clear selected elements
// Add an array of selected elements
// Toggle selected elemen