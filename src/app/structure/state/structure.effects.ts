import { toSegmentArray } from './../../router/services/router.service';
import { SW360Resources } from './../../resources/resources.api';
import { Actions, Effect } from '@ngrx/effects';
import { HttpService, RequestTypes } from './../../http/services/http.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state';
import * as ComponentActions from './../../component/state/component.actions';
import * as StructureActions from './structure.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class StructureEffects {

    @Effect({ dispatch: false })
    componentTitle = this.actions.ofType(ComponentActions.REDUCE_COMPONENT)
        .map((action: ComponentActions.ReduceComponent) => action.component.name)
        .map(componentName => this.evalUrl(componentName))

    constructor(
        private actions: Actions,
        private store: Store<State>,
        private router: Router
    ) { }

    evalUrl(title: string) {
        console.log(this.router.url);
        const route = toSegmentArray(this.router.url);
        console.log(route);
    }
}