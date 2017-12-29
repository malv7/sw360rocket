import { TableService } from './../services/table.service';
import { Directive, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

  constructor(private tableService: TableService) {}

    @Output()
    sorted = new EventEmitter();

    private columnSortedSubscription: Subscription;

    ngOnInit() {
        this.columnSortedSubscription = this.tableService.columnSorted$.subscribe(event => {
            this.sorted.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }
}
