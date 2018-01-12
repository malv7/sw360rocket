import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Project } from "../../../../state/models";
import { Observable } from "rxjs/Observable";
import { State } from './../../../../state';
import * as fromModel from './../../../../state/model.reducer';

@Component({
    selector: 'sw-project-details',
    template: `{{ project | async | json }}`
})
export class ProjectDetailsComponent implements OnInit {

  project: Observable<Project>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.project = this.store.select(fromModel.selectProject);
  }
}