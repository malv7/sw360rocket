import { ReduceReleases } from './../../release/state/release.actions';
import { SW360Resources } from './../../resources/resources.api';
import { Actions, Effect } from '@ngrx/effects';
import { HttpService, RequestTypes } from './../../http/services/http.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state';
import * as ComponentActions from './component.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { SW360Component } from '../../resources/resources.api';
import * as ReleaseActions from './../../release/state/release.actions';
import * as StructureActions from './../../structure/state/structure.actions';
import { ReleaseContext } from '../../release/state/release.reducer';

@Injectable()
export class ComponentEffects {

    componentsUri = 'http://localhost:8080/resource/api/components';

    @Effect({ dispatch: false })
    query = this.actions.ofType(ComponentActions.QUERY)
        .map(() => this.httpService.get(this.componentsUri, RequestTypes.componentList));

    @Effect()
    querySuccess = this.actions.ofType(ComponentActions.QUERY_SUCCESS)
        .map((action: ComponentActions.QuerySuccess) => action.response)
        .map(response => (<SW360Component[]>response._embedded[SW360Resources.components]))
        .map(components => new ComponentActions.ReduceComponents(components));

    @Effect({ dispatch: false })
    get = this.actions.ofType(ComponentActions.GET)
        .map((action: ComponentActions.Get) => action.href)
        .map(href => this.httpService.get(href, RequestTypes.component))

    @Effect({ dispatch: false })
    getSuccess = this.actions.ofType(ComponentActions.GET_SUCCESS)
        .map((action: ComponentActions.GetSuccess) => action.response)
        .map(response => <SW360Component> response)
        .do(component => this.store.dispatch(new ReleaseActions.ReduceReleases(component._embedded.releases, ReleaseContext.components)))
        .do(component => this.store.dispatch(new StructureActions.SetTitle(component.name)))
        .do(component => this.store.dispatch(new ComponentActions.ReduceComponent(component)))

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private httpService: HttpService
    ) { }
}