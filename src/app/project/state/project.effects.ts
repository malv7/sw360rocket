import { ReleaseContext } from './../../release/state/release.reducer';
import { SW360Resources } from './../../resources/resources.api';
import { Actions, Effect } from '@ngrx/effects';
import { HttpService, RequestTypes } from './../../http/services/http.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state';
import * as ProjectActions from './project.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { SW360Project } from '../../resources/resources.api';
import * as ReleaseActions from './../../release/state/release.actions';
import * as StructureActions from './../../structure/state/structure.actions';

@Injectable()
export class ProjectEffects {

    projectsUri = 'http://localhost:8080/resource/api/projects';

    @Effect({ dispatch: false })
    query = this.actions.ofType(ProjectActions.QUERY)
        .map(() => this.httpService.get(this.projectsUri, RequestTypes.projectList));

    @Effect()
    querySuccess = this.actions.ofType(ProjectActions.QUERY_SUCCESS)
        .map((action: ProjectActions.QuerySuccess) => action.response)
        .map(response => (<SW360Project[]>response._embedded[SW360Resources.projects]))
        .map(projects => new ProjectActions.ReduceProjects(projects));

    @Effect({ dispatch: false })
    get = this.actions.ofType(ProjectActions.GET)
        .map((action: ProjectActions.Get) => action.href)
        .map(href => this.httpService.get(href, RequestTypes.project))

    @Effect({ dispatch: false })
    getSuccess = this.actions.ofType(ProjectActions.GET_SUCCESS)
        .map((action: ProjectActions.GetSuccess) => action.response)
        .map(response => <SW360Project> response)
        .do(project => this.store.dispatch(new ReleaseActions.ReduceReleases(project._embedded.containedReleases, ReleaseContext.projects)))
        .do(project => this.store.dispatch(new StructureActions.SetTitle(project.name)))
        .do(project => this.store.dispatch(new ProjectActions.ReduceProject(project)))

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private httpService: HttpService
    ) { }
}