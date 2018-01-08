import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as TableActions from './../../state/table/table.actions';
import * as fromRoot from './../../../reducers';
import * as fromTable from './../../state/table/table.reducer';
import { Pagination } from "./../../state/table/table.reducer";

@Component({
  selector: 'sw-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  pagination: Observable<Pagination>;
  constructor(private store: Store<fromRoot.State>) {
    this.pagination = this.store.select(fromTable.selectPagination);
  }

  nextPage(): void {
		this.store.dispatch(new TableActions.NextPage());
		this.pagination.subscribe(test => console.log(test.currentPage));
	}

  previousPage(): void {
		this.store.dispatch(new TableActions.PreviousPage());
		this.pagination.subscribe(test => console.log(test.currentPage));
  }
  
	setPage(pageNumber:number){
		this.store.dispatch(new TableActions.ChangePage(pageNumber));
		this.pagination.subscribe(test => console.log(test.currentPage));
	}

	setElementsPerPage(elementsPerPage:number){
		this.store.dispatch(new TableActions.SetSetElementsPerPage(elementsPerPage));
		this.pagination.subscribe(test => console.log(test.elementsPerPage));
	}

}