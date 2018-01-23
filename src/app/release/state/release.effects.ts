import { SW360Resources } from './../../resources/resources.api';
import { Actions, Effect } from '@ngrx/effects';
import { HttpService, RequestTypes } from './../../http/services/http.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state';
import * as ReleaseActions from './release.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { SW360Release } from '../../resources/resources.api';
import * as StructureActions from './../../structure/state/structure.actions';

@Injectable()
export class ReleaseEffects {

    // releasesUri = 'http://localhost:8080/resource/api/releases';

    // @Effect({ dispatch: false })
    // query = this.actions.ofType(ReleaseActions.QUERY)
    //     .map(() => this.httpService.get(this.releasesUri, RequestTypes.releaseList));

    // @Effect()
    // querySuccess = this.actions.ofType(ReleaseActions.QUERY_SUCCESS)
    //     .map((action: ReleaseActions.QuerySuccess) => action.response)
    //     .map(response => (<SW360Release[]>response._embedded[SW360Resources.releases]))
    //     .map(releases => new ReleaseActions.ReduceReleases(releases));

    @Effect({ dispatch: false })
    get = this.actions.ofType(ReleaseActions.GET)
        .map((action: ReleaseActions.Get) => action.href)
        .map(href => this.httpService.get(href, RequestTypes.release))

    @Effect({ dispatch: false })
    getSuccess = this.actions.ofType(ReleaseActions.GET_SUCCESS)
        .map((action: ReleaseActions.GetSuccess) => action.response)
        .map(response => <SW360Release> response)
        .do(release => this.store.dispatch(new ReleaseActions.ReduceRelease(release)))
        .do(release => this.store.dispatch(new StructureActions.SetTitle(release.name)))

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private httpService: HttpService
    ) { }
}