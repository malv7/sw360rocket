import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs/Subscription";
import { Project } from "../../../../state/models";
import { Observable } from "rxjs/Observable";
import * as fromRoot from './../../../../reducers';
import * as fromModel from './../../../../state/model.reducer';
import * as StructureActions from './../../../../structure/state/structure.actions';

@Component({
    selector: 'sw-project-details',
    template: `this are project details`
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  project: Observable<Project>;
  titleSub: Subscription;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.project = this.store.select(fromModel.selectProject);
    this.titleSub = this.project.subscribe(project => {
      if(project.name) this.store.dispatch(new StructureActions.SetTitle(project.name));
    });
  }

  ngOnDestroy() {
    if(this.titleSub) this.titleSub.unsubscribe();
  }
}