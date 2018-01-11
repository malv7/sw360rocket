import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as TableActions from './../../state/table/table.actions';
import * as fromRoot from './../../../reducers';
import * as fromTable from './../../state/table/table.reducer';
import { Pagination } from "./../../state/table/table.reducer";
import { Subscription } from "rxjs/Subscription";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
	selector: 'sw-pagination',
	templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

	readonly RANGE = 2;
	paginationSub: Subscription;
	pagination: Pagination;
	currentButtons: number[];
	lastPage: number;
	elementsPerPage:number = 10;

	constructor(private store: Store<fromRoot.State>) {
	}

	ngOnInit() {
		//this.setElementsPerPage(this.elementsPerPage);//TODO: Set default here?
		this.paginationSub = this.store.select(fromTable.selectPagination).subscribe(paginationData => {
			this.pagination = paginationData;
			this.lastPage = Math.ceil(paginationData.totalElementsAmount / paginationData.elementsPerPage);
			this.updateCurrentButtons();
		});
	}

	updateCurrentButtons(): void {
		const currentButtonsArray: number[] = [];

		if (this.pagination.currentPage <= this.RANGE) {
			for (let i = 1; i <= 1 + 2 * this.RANGE; i++) currentButtonsArray.push(i);
		} else if (this.pagination.currentPage >= this.lastPage - this.RANGE) {
			for (let i = this.lastPage - 2 * this.RANGE; i <= this.lastPage; i++) currentButtonsArray.push(i);
		} else {
			for (let i = -this.RANGE; i <= this.RANGE; i++)
				currentButtonsArray.push(i + this.pagination.currentPage);
		}
		this.currentButtons = currentButtonsArray;
	}

	setPage(pageNumber: number) {
		if (pageNumber > 0 && pageNumber <= this.lastPage) {
			this.store.dispatch(new TableActions.SetPage(pageNumber));
		}
	}

	setElementsPerPage(elementsPerPage: number) {
		if(elementsPerPage<1) {

		} else {
			this.store.dispatch(new TableActions.SetSetElementsPerPage(elementsPerPage));
		}
		console.log("test",this.pagination.elementsPerPage);
	}

	nextPage():void{
		this.setPage(this.pagination.currentPage+1);
	}

	previousPage():void{
		this.setPage(this.pagination.currentPage-1);
	}

	goToLastPage():void{
		this.setPage(this.lastPage);
	}

	firstPage():void{
		this.setPage(1);
	}

	evaluateElementsPerPageInput():void{
	}
	ngOnDestroy(): void {
		if (this.paginationSub) this.paginationSub.unsubscribe();
	}

}
