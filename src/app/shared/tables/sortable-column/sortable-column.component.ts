import { Subscription } from 'rxjs/Subscription';
import { TableService } from './../services/table.service';
import { Component, OnInit, Input, EventEmitter, OnDestroy, HostListener } from '@angular/core';

@Component({
    selector: '[sortable-column]',
    templateUrl: './sortable-column.component.html'
})
export class SortableColumnComponent implements OnInit {

    constructor(private tableService: TableService) { }

		@Input('sortable-column')
    columnName: string;

    @Input('sort-direction')
    sortDirection: string = '';

    private columnSortedSubscription: Subscription;

    @HostListener('click')
    sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.tableService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
    }

    ngOnInit() {
        // subscribe to sort changes so we can react when other columns are sorted
        this.columnSortedSubscription = this.tableService.columnSorted$.subscribe(event => {
            // reset this column's sort direction to hide the sort icons
            if (this.columnName != event.sortColumn) {
                this.sortDirection = '';
            }
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }
}
