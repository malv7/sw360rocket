import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as TableActions from './../../../tables/state/table.actions';
import { State } from './../../../../state';
import * as fromTable from './../../../tables/state/table.reducer';
import { Pagination } from "./../../../tables/state/table.reducer";
import { Subscription } from "rxjs/Subscription";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'sw-pagination',
  templateUrl: './pagination.component.html',
  styles: [`
    #elementsPerPageInput { width: 6em; margin-right: 0.5em; }
  `]
})
export class PaginationComponent implements OnInit {

  readonly RANGE = 2;
  paginationSub: Subscription;
  pagination: Pagination;
  currentButtons: number[];
  lastPage: number;
  elementsPerPage: number = 10;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new TableActions.SetSetElementsPerPage(this.elementsPerPage)); // TODO: init here?
    this.paginationSub = this.store.select(fromTable.selectPagination).subscribe(paginationData => {
      this.pagination = paginationData;
      this.lastPage = Math.ceil(paginationData.totalElementsAmount / paginationData.elementsPerPage);
      this.updateCurrentButtons();
    });
  }

  updateCurrentButtons(): void {

    // TODO: update amount of page numbers depending on
    // elementsPerPage and totalElementsAmount

    const currentButtonsArray: number[] = [];

    if (this.pagination.currentPage <= this.RANGE) {
      for (let i = 1; i <= 1 + 2 * this.RANGE; i++) {
        if(i<=this.lastPage) currentButtonsArray.push(i);
      }
    } else if (this.pagination.currentPage >= this.lastPage - this.RANGE) {
      for (let i = this.lastPage - 2 * this.RANGE; i <= this.lastPage; i++) {
        if(i>0) currentButtonsArray.push(i);
      }
    } else {
      for (let i = -this.RANGE; i <= this.RANGE; i++) {
        currentButtonsArray.push(i + this.pagination.currentPage);
      }
    }
    this.currentButtons = currentButtonsArray;
  }

  setPage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.lastPage)
      this.store.dispatch(new TableActions.SetPage(pageNumber));
  }

  setElementsPerPage() {
    this.store.select(fromTable.selectPagination)
      .take(1)
      .map(pagination => pagination.elementsPerPage)
      .subscribe(elementsPerPage => {
        // elements per page cant get negative
        if (this.elementsPerPage < 1) {
          this.elementsPerPage = elementsPerPage;
        } else {
          // do not dispatch when new elementsPerPage is same as elementsPerPage in store
          if (this.elementsPerPage !== elementsPerPage) {
            this.store.dispatch(new TableActions.SetSetElementsPerPage(this.elementsPerPage));
          }
        }
      });
  }

  nextPage(): void {
    this.setPage(this.pagination.currentPage + 1);
  }

  previousPage(): void {
    this.setPage(this.pagination.currentPage - 1);
  }

  goToLastPage(): void {
    this.setPage(this.lastPage);
  }

  firstPage(): void {
    this.setPage(1);
  }

  ngOnDestroy(): void {
    if (this.paginationSub) this.paginationSub.unsubscribe();
  }

}
