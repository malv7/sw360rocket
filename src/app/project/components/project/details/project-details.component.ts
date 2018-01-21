import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { State } from './../../../../state';
import * as fromProject from './../../../state/project.reducer';
import { SW360Project } from "../../../../resources/resources.api";

@Component({
    selector: 'sw-project-details',
    template: `{{ project | async | json }}`
})
export class ProjectDetailsComponent implements OnInit {

  project: Observable<SW360Project>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.project = this.store.select(fromProject.selectProject);
    this.project.subscribe(x => console.log(x))
  }
}