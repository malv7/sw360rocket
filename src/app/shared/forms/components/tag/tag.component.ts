import { EventEmitter } from 'events';
import { Component, Input, Output } from "@angular/core";

@Component({
    selector: 'sw-tag',
    template: `
        <div class="ui label sw-form-tag" [ngStyle]="{ 'margin-bottom': '0.5em' }">
            {{ name }}
            <i class="delete icon" (click)="deleteClick($event)"></i>
        </div>
    `,
    styles: [``]
}) export class TagComponent {
    @Input() name: string;
    @Output() delete: EventEmitter = new EventEmitter();
    deleteClick(event: any) { this.delete.emit(event); }
}