import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers';
import { Store } from '@ngrx/store';
import * as TableActions from './table.actions';
import * as fromTable from './table.reducer';

@Injectable()
export class TableEffects {

  @Effect()
  changePage$ = this.actions$.ofType(TableActions.CHANGE_PAGE)
    .map((action: TableActions.ChangePage) => action.pageNumber)
    .map(pageNumber => {
      if(this.evaluatePageNumber(pageNumber))
        return new TableActions.SetPage(pageNumber);
    })
    // .do(pageNumber => null /* network */ );

  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>
  ) { }

  evaluatePageNumber(pageNumber: number) {
    this.store.select(fromTable.selectPagination).subscribe(pagination => {
      let maxPage = Math.ceil(pagination.totalElementsAmount / pagination.elementsPerPage);
      if (pageNumber > 0 && pageNumber < maxPage) 
        return true; // pagination.currentPage = pageNumber;
    });
  }

}